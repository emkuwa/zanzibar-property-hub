-- Review and apply to Zanzicore with a database administrator before enabling referrals.
-- Isolated tables: existing central_leads and other portals are unchanged.
begin;
create table if not exists public.zi_developer_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique check (email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  active boolean not null default false,
  agreement_reference text,
  agreement_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  check (not active or (nullif(trim(agreement_reference),'') is not null and agreement_confirmed_at is not null))
);
create table if not exists public.zi_referral_leads (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  reference text not null unique default ('ZI-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))),
  fingerprint text not null,
  payload jsonb not null check (payload->>'consent' = 'true'),
  consent_version text not null,
  consent_text text not null,
  consented_at timestamptz not null default now(),
  withdrawn_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.zi_referral_deliveries (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.zi_referral_leads(id) on delete cascade,
  partner_id uuid not null references public.zi_developer_partners(id),
  recipient_email text not null,
  partner_name text not null,
  status text not null default 'pending' check (status in ('pending','sending','sent','cancelled','needs_review')),
  attempts int not null default 0,
  first_attempt_at timestamptz,
  next_attempt_at timestamptz not null default now(),
  lease_token uuid,
  leased_at timestamptz,
  provider_id text,
  error_code text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  unique(lead_id,partner_id)
);
create index if not exists zi_delivery_pending_idx on public.zi_referral_deliveries(next_attempt_at) where status in ('pending','sending');
create table if not exists public.zi_referral_rate_limits (
  rate_key text primary key,
  requests int not null,
  expires_at timestamptz not null default (now()+interval '2 hours')
);
alter table public.zi_developer_partners enable row level security;
alter table public.zi_referral_leads enable row level security;
alter table public.zi_referral_deliveries enable row level security;
alter table public.zi_referral_rate_limits enable row level security;
revoke all on public.zi_developer_partners, public.zi_referral_leads, public.zi_referral_deliveries, public.zi_referral_rate_limits from public, anon, authenticated;
grant select,insert,update,delete on public.zi_developer_partners, public.zi_referral_leads, public.zi_referral_deliveries, public.zi_referral_rate_limits to service_role;

create or replace function public.zi_register_referral(p_request_id uuid,p_fingerprint text,p_rate_key text,p_payload jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v_lead public.zi_referral_leads; v_count int; v_requests int;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_request_id::text,0));
  select * into v_lead from public.zi_referral_leads where request_id=p_request_id;
  if found then
    if v_lead.fingerprint <> p_fingerprint then raise exception 'request_conflict'; end if;
    select count(*) into v_count from public.zi_referral_deliveries where lead_id=v_lead.id;
    return jsonb_build_object('reference',v_lead.reference,'lead_id',v_lead.id,'deliveries',v_count,'duplicate',true);
  end if;
  if p_payload->>'consent' is distinct from 'true' or p_payload->>'consentVersion' is distinct from 'developer-network-2026-11-07' or nullif(p_payload->>'consentText','') is null then raise exception 'consent_required'; end if;
  delete from public.zi_referral_rate_limits where expires_at < now();
  insert into public.zi_referral_rate_limits(rate_key,requests) values(p_rate_key,1)
  on conflict(rate_key) do update set requests=public.zi_referral_rate_limits.requests+1 returning requests into v_requests;
  if v_requests>5 then raise exception 'rate_limited'; end if;
  insert into public.zi_referral_leads(request_id,fingerprint,payload,consent_version,consent_text)
  values(p_request_id,p_fingerprint,p_payload,p_payload->>'consentVersion',p_payload->>'consentText') returning * into v_lead;
  insert into public.zi_referral_deliveries(lead_id,partner_id,recipient_email,partner_name)
  select v_lead.id,id,email,name from public.zi_developer_partners
  where active and agreement_confirmed_at is not null and nullif(trim(agreement_reference),'') is not null;
  get diagnostics v_count = row_count;
  return jsonb_build_object('reference',v_lead.reference,'lead_id',v_lead.id,'deliveries',v_count,'duplicate',false);
end $$;
revoke all on function public.zi_register_referral(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.zi_register_referral(uuid,text,text,jsonb) to service_role;

create or replace function public.zi_claim_deliveries(p_limit int default 20)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v_rows jsonb;
begin
  -- Stop sharing if consent was withdrawn or the partner is no longer active.
  update public.zi_referral_deliveries d set status='cancelled',lease_token=null,leased_at=null
  from public.zi_referral_leads l,public.zi_developer_partners p
  where d.lead_id=l.id and d.partner_id=p.id and d.status in ('pending','sending')
    and (l.withdrawn_at is not null or not p.active);
  -- Provider idempotency expires after 24h: uncertain older sends need review, never an automatic resend.
  update public.zi_referral_deliveries set status='needs_review',lease_token=null,leased_at=null
  where status in ('pending','sending') and (attempts>=5 or first_attempt_at < now()-interval '23 hours');
  with candidates as (
    select d.id from public.zi_referral_deliveries d
    where (d.status='pending' and d.next_attempt_at<=now())
       or (d.status='sending' and d.leased_at<now()-interval '5 minutes')
    order by d.created_at for update skip locked limit greatest(1,least(p_limit,20))
  ), claimed as (
    update public.zi_referral_deliveries d set status='sending',lease_token=gen_random_uuid(),leased_at=now(),
      attempts=attempts+1,first_attempt_at=coalesce(first_attempt_at,now())
    from candidates c where d.id=c.id returning d.*
  ) select coalesce(jsonb_agg(jsonb_build_object('id',d.id,'lease_token',d.lease_token,
    'reference',l.reference,'recipient_email',d.recipient_email,'partner_name',d.partner_name,'payload',l.payload)),'[]'::jsonb)
    into v_rows from claimed d join public.zi_referral_leads l on l.id=d.lead_id;
  return v_rows;
end $$;
revoke all on function public.zi_claim_deliveries(int) from public,anon,authenticated;
grant execute on function public.zi_claim_deliveries(int) to service_role;
commit;
