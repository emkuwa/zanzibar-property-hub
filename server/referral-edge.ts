import { fetchWithTimeout } from "../src/lib/fetch-timeout.js";
import type { ReferralInput } from "../src/lib/referral-contract.js";
import { StoreError, type Registration } from "./referral-store.js";

// Optional cross-runtime global. Declaration only; emits no runtime code.
declare const Deno: { env: { get(name: string): string | undefined } } | undefined;

// These credentials are loaded from environment variables at runtime.
// Set server-only SUPABASE_EDGE_URL and SUPABASE_EDGE_ANON_KEY in your .env
// (or in Vercel / hosting environment settings) — never hardcode them here.
const EDGE_URL =
  (typeof process !== "undefined" && process.env?.SUPABASE_EDGE_URL) ||
  (typeof Deno !== "undefined" && (Deno as any).env?.get("SUPABASE_EDGE_URL")) ||
  "";
const ANON_KEY =
  (typeof process !== "undefined" && process.env?.SUPABASE_EDGE_ANON_KEY) ||
  (typeof Deno !== "undefined" && (Deno as any).env?.get("SUPABASE_EDGE_ANON_KEY")) ||
  "";

export async function registerThroughEdge(input: ReferralInput, ip: string, fetcher = fetch): Promise<Registration> {
 if (!EDGE_URL || !ANON_KEY) throw new StoreError(503, "Edge referral storage is not configured.");
 const response=await fetchWithTimeout(EDGE_URL,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ANON_KEY}`,apikey:ANON_KEY},body:JSON.stringify({input,ip})},15000,fetcher);
 if(!response.ok)throw new StoreError([400,409,429].includes(response.status)?response.status:503,"Referral storage unavailable.");
 const data=await response.json();
 if(typeof data.reference!=="string"||typeof data.lead_id!=="string")throw new StoreError(503,"Invalid storage response.");
 return data;
}
