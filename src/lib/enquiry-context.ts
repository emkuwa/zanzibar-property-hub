import type { ReferralInput } from "./referral-contract";

type EnquiryContext = {
  label: string;
  propertyType?: ReferralInput["propertyType"];
  area?: ReferralInput["area"];
};
/** Reviewed defaults only: comparison and budget guides deliberately make no choice. */
export const ENQUIRY_CONTEXTS: Record<string, EnquiryContext> = {
  "/guides/zanzibar-apartments": { label: "Zanzibar apartments guide", propertyType: "Apartment" },
  "/guides/zanzibar-villas": { label: "Zanzibar villas guide", propertyType: "Villa" },
  "/areas/paje": { label: "Paje property guide", area: "Paje / Jambiani" },
  "/areas/jambiani": { label: "Jambiani property guide", area: "Paje / Jambiani" },
  "/areas/nungwi": { label: "Nungwi property guide", area: "Nungwi / Kendwa" },
  "/areas/kendwa": { label: "Kendwa property guide", area: "Nungwi / Kendwa" },
  "/areas/fumba": { label: "Fumba property guide", area: "Fumba / west coast" },
  "/areas/matemwe": { label: "Matemwe property guide", area: "Matemwe / Kiwengwa" },
};
export function enquiryLinkFor(path: string): string {
  return Object.prototype.hasOwnProperty.call(ENQUIRY_CONTEXTS, path)
    ? `/?from=${encodeURIComponent(path)}#enquiry`
    : "/#enquiry";
}
export function enquiryContext(search: string) {
  const path = new URLSearchParams(search).get("from");
  if (!path || !Object.prototype.hasOwnProperty.call(ENQUIRY_CONTEXTS, path)) return undefined;
  return { ...ENQUIRY_CONTEXTS[path], path };
}
