/**
 * Base URL for backend API.
 * Set VITE_API_BASE_URL in .env or Vercel for production (e.g. https://api.zanziinvest.com or http://104.248.41.165:5051).
 */
const DEFAULT_DEV_API = "http://127.0.0.1:5051";
const DEFAULT_PROD_API = "http://104.248.41.165:5051";

export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? DEFAULT_DEV_API : DEFAULT_PROD_API);
