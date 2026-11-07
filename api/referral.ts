import { registerThroughEdge } from "../server/referral-edge.js";
import { referralSchema } from "../src/lib/referral-contract.js";
import {
  registerReferral,
  StoreError,
  type Env,
} from "../server/referral-store.js";
import { dispatchReferrals } from "../server/referral-dispatch.js";

export type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};
export type ApiResponse = {
  status(code: number): ApiResponse;
  json(body: unknown): unknown;
  setHeader(name: string, value: string): unknown;
};
const header = (req: ApiRequest, key: string) => String(req.headers[key] || "");
export function createReferralHandler(env: Env = process.env, fetcher = fetch) {
  return async (req: ApiRequest, res: ApiResponse) => {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ success: false });
    }
    const origins = new Set([
      "https://zanziinvest.com",
      "https://www.zanziinvest.com",
      ...(env.REFERRAL_ALLOWED_ORIGINS || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    ]);
    if (header(req, "origin") && !origins.has(header(req, "origin")))
      return res.status(403).json({ success: false });
    if (!header(req, "content-type").includes("application/json"))
      return res.status(415).json({ success: false });
    try {
      const raw =
        typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body || {});
      if (raw.length > 12_000) return res.status(413).json({ success: false });
      const parsed = referralSchema.safeParse(JSON.parse(raw));
      if (!parsed.success)
        return res.status(400).json({
          success: false,
          message: "Check the form fields and developer contact consent.",
        });
      const ip =
        header(req, "x-vercel-forwarded-for") ||
        header(req, "x-forwarded-for").split(",")[0].trim() ||
        "unknown";
      const registration = env.SUPABASE_SERVICE_ROLE_KEY
        ? await registerReferral(parsed.data, ip, env, fetcher)
        : await registerThroughEdge(parsed.data, ip, fetcher);
      // Registration atomically saves the lead, consent and one delivery per eligible developer.
      // Network/provider failures leave deliveries pending; they never erase the saved lead.
      try {
        await dispatchReferrals(env, fetcher);
      } catch {
        /* The protected dispatcher retries the durable queue. */
      }
      return res.status(registration.duplicate ? 200 : 201).json({
        success: true,
        reference: registration.reference,
        distributionStatus:
          registration.deliveries > 0 ? "queued" : "awaiting_partners",
      });
    } catch (error) {
      if (error instanceof SyntaxError)
        return res.status(400).json({ success: false });
      return res.status(error instanceof StoreError ? error.status : 503).json({
        success: false,
        message: "We could not confirm your enquiry. Please try again.",
      });
    }
  };
}
export default createReferralHandler();
