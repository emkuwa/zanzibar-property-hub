import { fetchWithTimeout } from "../src/lib/fetch-timeout.js";
import { createHash, createHmac } from "node:crypto";
import type { ReferralInput } from "../src/lib/referral-contract.js";
import { CONSENT_TEXT } from "../src/lib/referral-contract.js";

export type Env = Record<string, string | undefined>;
export type Registration = {
  reference: string;
  lead_id: string;
  deliveries: number;
  duplicate: boolean;
};
export class StoreError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function databaseConfig(env: Env) {
  const url = env.SUPABASE_URL?.replace(/\/$/, "");
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url?.startsWith("https://") || !key || key.startsWith("sb_publishable_"))
    throw new StoreError(503, "Referral storage is not configured.");
  return { url, key };
}
export async function dbRequest(
  env: Env,
  path: string,
  init: RequestInit = {},
  fetcher = fetch,
) {
  const { url, key } = databaseConfig(env);
  const response = await fetchWithTimeout(
    `${url}/rest/v1/${path}`,
    {
      ...init,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    },
    8_000,
    fetcher,
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (error.message === "request_conflict")
      throw new StoreError(409, "Request changed.");
    if (error.message === "rate_limited")
      throw new StoreError(429, "Too many requests. Please try later.");
    throw new StoreError(503, "Referral storage is unavailable.");
  }
  return response.status === 204 ? null : response.json();
}
export async function registerReferral(
  input: ReferralInput,
  ip: string,
  env: Env,
  fetcher = fetch,
): Promise<Registration> {
  const { key } = databaseConfig(env);
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex");
  // An hourly hash avoids storing raw IP addresses in the referral tables.
  const hour = new Date().toISOString().slice(0, 13);
  const rateKey = createHmac("sha256", env.REFERRAL_RATE_LIMIT_SALT || key)
    .update(`${hour}:${ip}`)
    .digest("hex");
  return dbRequest(
    env,
    "rpc/zi_register_referral",
    {
      method: "POST",
      body: JSON.stringify({
        p_request_id: input.requestId,
        p_fingerprint: fingerprint,
        p_rate_key: rateKey,
        p_payload: {
          ...input,
          consentText: CONSENT_TEXT,
          sourcePortal: "zanziinvest.com",
        },
      }),
    },
    fetcher,
  );
}
