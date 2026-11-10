import { fetchWithTimeout } from "../src/lib/fetch-timeout.js";
import { dbRequest, type Env } from "./referral-store.js";

type Notice = { id: string; lease_token: string; reference: string; created_at: string; payload: Record<string, string> };
export function ownerMessage(n: Notice) {
  const p = n.payload;
  return {
    subject: `New ZanziInvest lead — ${n.reference}`,
    text: `New ZanziInvest property request\nReference: ${n.reference}\nSubmitted: ${n.created_at}\n\n` +
      `Name: ${p.fullName}\nEmail: ${p.email}\nWhatsApp: ${p.whatsapp}\nChat: https://wa.me/${p.whatsapp.replace(/\D/g, "")}\n\n` +
      `Budget: ${p.budget}\nProperty: ${p.propertyType}\nArea: ${p.area}\nPurchase timeline: ${p.timeline}\n\n` +
      `This lead has been saved. Developer delivery is tracked separately.`,
    reply_to: p.email,
  };
}

/** Separate owner-only outbox: no developer needs to be active. */
export async function dispatchOwnerNotifications(env: Env, fetcher = fetch) {
  if (!env.RESEND_API_KEY || !env.REFERRAL_FROM_EMAIL) return { configured: false, sent: 0, failed: 0 };
  const notices: Notice[] = await dbRequest(env, "rpc/zi_claim_owner_notifications", {
    method: "POST", body: JSON.stringify({ p_limit: 1 }),
  }, fetcher);
  let sent = 0, failed = 0;
  for (const n of notices) {
    let status = "pending", providerId: string | null = null, errorCode: string | null = null;
    try {
      const response = await fetchWithTimeout("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `zi-owner/${n.id}` },
        body: JSON.stringify({ from: env.REFERRAL_FROM_EMAIL, to: ["info@zanzibaba.com"], ...ownerMessage(n) }),
      }, 5000, fetcher);
      const result = await response.json().catch(() => ({}));
      if (response.ok && typeof result.id === "string") { status = "sent"; providerId = result.id; sent++; }
      else { errorCode = `provider_${response.status}`; failed++; }
    } catch { errorCode = "provider_unavailable"; failed++; }
    await dbRequest(env, `zi_owner_notifications?id=eq.${n.id}&lease_token=eq.${n.lease_token}`, {
      method: "PATCH", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status, provider_id: providerId, error_code: errorCode, lease_token: null, leased_at: null,
        next_attempt_at: new Date(Date.now() + 300000).toISOString(), sent_at: status === "sent" ? new Date().toISOString() : null }),
    }, fetcher);
  }
  return { configured: true, sent, failed };
}
