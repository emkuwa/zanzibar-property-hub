/**
 * Base URL for backend API.
 *
 * Production default is "" (same origin) so requests go to HTTPS on the Vercel host
 * (e.g. /api/investor → api/investor.ts). Never use http:// from https:// pages — browsers block mixed content.
 *
 * Override with VITE_API_BASE_URL when using a dedicated API domain, e.g. https://api.zanziinvest.com
 */
const DEFAULT_DEV_API = "http://127.0.0.1:5051";

export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? DEFAULT_DEV_API : "");
