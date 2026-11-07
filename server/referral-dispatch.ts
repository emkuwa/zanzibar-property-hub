import { fetchWithTimeout } from "../src/lib/fetch-timeout.js";
import { dbRequest, type Env } from "./referral-store.js";

type Delivery = {
  id: string;
  lease_token: string;
  reference: string;
  recipient_email: string;
  partner_name: string;
  payload: {
    fullName: string;
    email: string;
    whatsapp: string;
    budget: string;
    propertyType: string;
    area: string;
    timeline: string;
  };
};

export async function dispatchReferrals(env: Env, fetcher = fetch) {
  // Missing sender credentials leaves the durable queue untouched.
  if (!env.RESEND_API_KEY || !env.REFERRAL_FROM_EMAIL)
    return { sent: 0, failed: 0, configured: false };
  const deliveries: Delivery[] = await dbRequest(
    env,
    "rpc/zi_claim_deliveries",
    { method: "POST", body: JSON.stringify({ p_limit: 2 }) },
    fetcher,
  );
  let sent = 0,
    failed = 0;
  await Promise.all(
    deliveries.map(async (d) => {
      const p = d.payload;
      const text =
        `New ZanziInvest referral — ${d.reference}\n\n` +
        `Developer: ${d.partner_name}\nIntroduced by: Zanzibaba Company Limited\n\n` +
        `Name: ${p.fullName}\nEmail: ${p.email}\nWhatsApp: ${p.whatsapp}\n` +
        `Budget: ${p.budget}\nProperty: ${p.propertyType}\nArea: ${p.area}\nTimeline: ${p.timeline}\n\n` +
        `The customer consented to contact from all participating partner developers. Please contact them directly about their enquiry.\n` +
        `Record reference ${d.reference} in your CRM and report any pre-existing relationship promptly.\n` +
        `Referral commission follows your agreement with Zanzibaba; this email does not establish new commercial terms.\n` +
        `Please confirm receipt and report reservation/purchase progress to info@zanzibaba.com using this reference.\n` +
        `Respect any request to stop contact; do not share this customer's details with unrelated third parties.`;
      let status = "pending",
        providerId: string | null = null,
        errorCode: string | null = null;
      try {
        const response = await fetchWithTimeout(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
              "Idempotency-Key": `zi-referral/${d.id}`,
            },
            body: JSON.stringify({
              from: env.REFERRAL_FROM_EMAIL,
              to: [d.recipient_email],
              reply_to: "info@zanzibaba.com",
              subject: `Zanzibaba property referral ${d.reference}`,
              text,
            }),
          },
          8_000,
          fetcher,
        );
        const result = await response.json().catch(() => ({}));
        if (response.ok && typeof result.id === "string") {
          status = "sent";
          providerId = result.id;
          sent++;
        } else {
          errorCode = `provider_${response.status}`;
          failed++;
        }
      } catch {
        errorCode = "provider_unavailable";
        failed++;
      }
      // A failed acknowledgement retains the lease; retry uses the same provider idempotency key.
      await dbRequest(
        env,
        `zi_referral_deliveries?id=eq.${d.id}&lease_token=eq.${d.lease_token}`,
        {
          method: "PATCH",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({
            status,
            provider_id: providerId,
            error_code: errorCode,
            lease_token: null,
            leased_at: null,
            next_attempt_at: new Date(Date.now() + 5 * 60_000).toISOString(),
            sent_at: status === "sent" ? new Date().toISOString() : null,
          }),
        },
        fetcher,
      );
    }),
  );
  return { sent, failed, configured: true };
}
