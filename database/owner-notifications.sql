-- Existing production owner outbox; bootstrap after referral-setup.sql.
begin;
create table if not exists public.zi_owner_notifications (
 id uuid primary key default gen_random_uuid(),
 lead_id uuid not null unique references public.zi_referral_leads(id) on delete cascade,
 status text not null default 'pending' check(status in ('pending','sending','sent','needs_review')),
 attempts integer not null default 0,
 first_attempt_at timestamptz,
 next_attempt_at timestamptz not null default now(),
 lease_token uuid, leased_at timestamptz, provider_id text, error_code text, sent_at timestamptz,
 created_at timestamptz not null default now()
);
alter table public.zi_owner_notifications enable row level security;
revoke all on public.zi_owner_notifications from public,anon,authenticated;
grant select,insert,update,delete on public.zi_owner_notifications to service_role;
create index if not exists zi_owner_pending_idx on public.zi_owner_notifications(next_attempt_at) where status in ('pending','sending');
CREATE OR REPLACE FUNCTION public.zi_claim_owner_notifications(p_limit integer DEFAULT 2)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare v_rows jsonb;
begin
  update public.zi_owner_notifications set status='needs_review',lease_token=null,leased_at=null
  where status in ('pending','sending') and (attempts>=5 or first_attempt_at<now()-interval '23 hours');
  with candidates as (
    select id from public.zi_owner_notifications
    where (status='pending' and next_attempt_at<=now()) or (status='sending' and leased_at<now()-interval '5 minutes')
    order by created_at for update skip locked limit greatest(1,least(p_limit,2))
  ), claimed as (
    update public.zi_owner_notifications n set status='sending', attempts=attempts+1,
      first_attempt_at=coalesce(first_attempt_at,now()),lease_token=gen_random_uuid(),leased_at=now()
    from candidates c where n.id=c.id returning n.*
  ) select coalesce(jsonb_agg(jsonb_build_object('id',n.id,'lease_token',n.lease_token,
    'reference',l.reference,'created_at',l.created_at,'payload',l.payload)),'[]'::jsonb)
    into v_rows from claimed n join public.zi_referral_leads l on l.id=n.lead_id;
  return v_rows;
end $function$;
CREATE OR REPLACE FUNCTION public.zi_queue_owner_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin
  insert into public.zi_owner_notifications(lead_id) values(new.id) on conflict(lead_id) do nothing;
  return new;
end $function$;
revoke all on function public.zi_claim_owner_notifications(integer) from public,anon,authenticated;
grant execute on function public.zi_claim_owner_notifications(integer) to service_role;
revoke all on function public.zi_queue_owner_notification() from public,anon,authenticated;
grant execute on function public.zi_queue_owner_notification() to service_role;
drop trigger if exists zi_queue_owner_notification on public.zi_referral_leads;
create trigger zi_queue_owner_notification after insert on public.zi_referral_leads for each row execute function public.zi_queue_owner_notification();
commit;

