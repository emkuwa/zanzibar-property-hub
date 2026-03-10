/**
 * Base URL for backend API.
 * Development: local Flask server (run server-api locally).
 * Production: live server.
 */
export const API_BASE =
  import.meta.env.DEV ? "http://127.0.0.1:5051" : "http://104.248.41.165:5051";
