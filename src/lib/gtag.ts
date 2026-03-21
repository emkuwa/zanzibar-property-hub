/** GA4 – same ID as index.html gtag config */
export const GA_MEASUREMENT_ID = "G-6H99SDKXN5";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire page_view for SPA route changes (initial load included). */
export function gaPageView(path: string, title?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}
