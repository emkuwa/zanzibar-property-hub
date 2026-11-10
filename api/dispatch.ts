import { dispatchOwnerNotifications } from "../server/owner-notifications.js";
import { timingSafeEqual } from "node:crypto";
import { dispatchReferrals } from "../server/referral-dispatch.js";
import type { ApiRequest, ApiResponse } from "./referral.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST" && req.method !== "GET")
    return res.status(405).json({ success: false });
  const expected = process.env.CRON_SECRET;
  const actual = String(req.headers.authorization || "");
  const token = `Bearer ${expected || ""}`;
  const supplied = Buffer.from(actual);
  const required = Buffer.from(token);
  if (
    !expected ||
    supplied.length !== required.length ||
    !timingSafeEqual(supplied, required)
  )
    return res.status(401).json({ success: false });
  try {
    const owner = await dispatchOwnerNotifications(process.env);
    const partners = await dispatchReferrals(process.env);
    return res.status(200).json({ owner, partners });
  } catch {
    return res.status(503).json({ success: false });
  }
}
