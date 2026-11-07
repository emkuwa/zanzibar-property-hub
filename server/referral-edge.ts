import { fetchWithTimeout } from "../src/lib/fetch-timeout.js";
import type { ReferralInput } from "../src/lib/referral-contract.js";
import { StoreError, type Registration } from "./referral-store.js";

// This legacy anon key is a public gateway credential, never a service-role key.
// The isolated function holds its own server-only database credentials.
const URL = "https://qmnpwinlvewbnjbruril.supabase.co/functions/v1/zanziinvest-referral";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbnB3aW5sdmV3Ym5qYnJ1cmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDI4OTksImV4cCI6MjA5NDQxODg5OX0.TqDNfrPAr0bx6RcWuAAZ0RLQ-zL5eaZrhrMbz7yOIm8";
export async function registerThroughEdge(input: ReferralInput, ip: string, fetcher = fetch): Promise<Registration> {
 const response=await fetchWithTimeout(URL,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ANON_KEY}`,apikey:ANON_KEY},body:JSON.stringify({input,ip})},15000,fetcher);
 if(!response.ok)throw new StoreError([400,409,429].includes(response.status)?response.status:503,"Referral storage unavailable.");
 const data=await response.json();
 if(typeof data.reference!=="string"||typeof data.lead_id!=="string")throw new StoreError(503,"Invalid storage response.");
 return data;
}

