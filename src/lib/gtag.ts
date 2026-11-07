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
  const engine = currentAiReferral();
  window.gtag("event", "page_view", {
    ...(engine ? { ai_referral_engine: engine } : {}),
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

/** Recognised referral evidence only; Google/Bing origin alone cannot identify AI. */
export function aiReferralEngine(referrer: string): string | undefined {
  try {
    const { hostname, pathname } = new URL(referrer);
    const host = hostname.toLowerCase().replace(/^www\./, "");
    const engines: Record<string, string> = {
      "chatgpt.com": "chatgpt", "chat.openai.com": "chatgpt", "perplexity.ai": "perplexity",
      "claude.ai": "claude", "gemini.google.com": "gemini", "copilot.microsoft.com": "copilot",
    };
    return engines[host] || (host === "bing.com" && /^\/copilot(?:\/|$)/.test(pathname) ? "copilot" : undefined);
  } catch { return undefined; }
}
export function currentAiReferral(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return aiReferralEngine(document.referrer);
}
