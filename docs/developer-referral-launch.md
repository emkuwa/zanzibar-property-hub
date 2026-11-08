# ZanziInvest developer enquiry launch

The homepage is a single public referral landing page. It does not show individual projects, developer names, brochures, precise project locations or a calculator. Single-segment legacy property URLs redirect to the enquiry section. The existing dashboard route is retained; it is not a new referral dashboard.

## Before production activation

1. Apply `database/referral-setup.sql` to the intended Zanzicore database after review. It creates isolated tables and server-only RPCs, with RLS enabled and no anon/authenticated grants. It does not change existing central leads or other portals. Verify the functions with rolled-back synthetic data before enabling real recipients.
2. Configure **server-only** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `REFERRAL_FROM_EMAIL` (a verified sending domain), `CRON_SECRET` and preferably `REFERRAL_RATE_LIMIT_SALT`. Never use `VITE_` prefixes for these values. Set `REFERRAL_ALLOWED_ORIGINS` to exact preview URLs only when testing previews.
3. Obtain the owner's confirmed developer names and sales emails. Add one row per partner in `zi_developer_partners`, initially inactive. Enable each only after recording the agreed commission arrangement in `agreement_reference` and `agreement_confirmed_at`. No partner addresses are seeded or scraped. All active partners receive each new consented lead, regardless of property preferences.
4. Schedule authenticated `GET /api/dispatch` at least every five minutes with `Authorization: Bearer <CRON_SECRET>` using the chosen scheduler. The submit handler attempts an immediate dispatch of up to two deliveries to limit provider bursts; the scheduler drains remaining batches and retries failures. Schedule more frequently if the network grows, within the sending provider limits. No production scheduler has been created by this change.
5. Confirm delivery with an owner-controlled test recipient before activating actual developers. Test consent, saved reference, separate messages per recipient, failure/retry and duplicate submission. Do not use real customer data for testing.
6. Publish only when storage, sender, partners and scheduling are ready. The form returns 503 when storage is missing and never claims a failed save succeeded. No live messages were sent during implementation.

## Storage and delivery semantics

- The database atomically saves the lead, exact consent text/version, server timestamp and a snapshot delivery for each active agreed partner. A stable UUID request key deduplicates retries; changing a payload with the same key returns 409.
- No active partners: the enquiry is saved with `awaiting_partners`; it is not reported as emailed. Operators must resolve enquiries without delivery rows before launch. New partners are not silently added to historic leads.
- Delivery statuses are `pending`, `sending`, `sent`, `cancelled`, `needs_review`. `sent` means the email provider accepted it, not that a developer read it or a purchase occurred. This phase does not implement developer acknowledgements, reservations, sales or commission payment tracking.
- Each developer gets a separate email with the same Zanzibaba reference, the customer's consented brief, and a reminder of existing commission terms. No CC/BCC disclosure of the partner network.
- Failed sends stay pending with a five-minute retry delay. Row leases prevent concurrent workers from claiming the same delivery. Stable provider idempotency keys cover ambiguous acknowledgements; uncertain sends older than 23h or five attempts require review rather than risking duplicate delivery outside the provider's 24h window.
- Withdraw sharing consent by setting the lead's `withdrawn_at`; disable a partner with `active=false`. Pending deliveries are cancelled at the next claim. A message already accepted by the provider cannot be recalled. A concurrent in-flight send may complete.
- The server stores an hourly HMAC rate-limit key, not a raw IP address, and limits new requests to five per hour per key. The form also has a honeypot. These are abuse controls, not identity verification; add a managed bot challenge if abuse is observed.
- Contact data is not included in GA4 events. Only anonymous `referral_submit_started` and confirmed `generate_lead` events are emitted. GA4 consent/cookie policy remains a separate site configuration; the checkbox authorises developer contact, not unrelated marketing.

## Operational checks

Use the Supabase table editor to review `zi_referral_leads` and `zi_referral_deliveries` until a dedicated admin dashboard is added. The previous embedded dashboard is not wired to these isolated tables. Record retention/deletion policy and partner terms before the public launch. Provider secrets and developer email addresses must remain server-side.

## Production capture activation — 7 November 2026

The isolated schema has now been applied to Zanzicore and the JWT-protected `zanziinvest-referral` Edge Function is active. When direct server database credentials are absent, the Vercel intake uses that function, whose service-role credentials stay inside Supabase. Existing `central-lead-intake` and other portals are unchanged. `node scripts/package-referral-edge.mjs` reproduces its uploaded file bundle from canonical shared code.

A synthetic submission and repeat returned the same reference with 201 then 200 and zero developer deliveries; test data was removed after verification. No developers are active yet. Enquiries can be saved, but developer email distribution remains disabled pending confirmed partner emails/agreements, sender credentials and scheduling. The confirmation explicitly states when an enquiry has not yet been sent to a developer.
