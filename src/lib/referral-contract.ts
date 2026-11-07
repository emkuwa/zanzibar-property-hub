import { z } from "zod";

export const CONSENT_VERSION = "developer-network-2026-11-07";
export const CONSENT_TEXT =
  "I agree that ZanziInvest by Zanzibaba may share my enquiry and contact details with all participating partner developers, who may contact me directly by WhatsApp, phone or email about property opportunities. I understand that several developers may contact me.";
export const BUDGETS = [
  "Under $50,000",
  "$50,000–$100,000",
  "$100,000–$150,000",
  "$150,000–$250,000",
  "$250,000–$500,000",
  "$500,000+",
  "Not decided",
] as const;
export const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Land",
  "Hotel / resort",
  "Open to options",
] as const;
export const TIMELINES = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Exploring options",
] as const;
export const AREAS = [
  "Paje / Jambiani",
  "Nungwi / Kendwa",
  "Fumba / west coast",
  "Matemwe / Kiwengwa",
  "Any area",
] as const;
export const referralSchema = z
  .object({
    requestId: z.string().uuid(),
    fullName: z.string().trim().min(2, "Enter your full name.").max(120),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(254)
      .transform((s) => s.toLowerCase()),
    whatsapp: z
      .string()
      .trim()
      .regex(
        /^\+[1-9][\d ()-]{6,24}$/,
        "Include your country code, for example +255…",
      )
      .refine(
        (s) =>
          s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 15,
        "Enter a valid international number.",
      ),
    budget: z.enum(BUDGETS),
    propertyType: z.enum(PROPERTY_TYPES),
    area: z.enum(AREAS),
    timeline: z.enum(TIMELINES),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "Please agree to developer contact before submitting.",
      }),
    }),
    consentVersion: z.literal(CONSENT_VERSION),
    website: z.string().max(0),
    attribution: z
      .object({
        source: z.string().max(120).optional(),
        medium: z.string().max(120).optional(),
        campaign: z.string().max(120).optional(),
      })
      .optional(),
  })
  .strict();
export type ReferralInput = z.infer<typeof referralSchema>;
