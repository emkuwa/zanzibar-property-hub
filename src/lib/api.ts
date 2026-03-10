/**
 * Base URL for backend API.
 *
 * - Development: local Flask server
 * - Production: HTTPS API at api.zanziinvest.com (configurable via env)
 */
const DEFAULT_DEV_API = "http://127.0.0.1:5051";

export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? DEFAULT_DEV_API : "https://api.zanziinvest.com");
