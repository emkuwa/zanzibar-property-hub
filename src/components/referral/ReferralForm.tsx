import { currentAiReferral } from "@/lib/gtag";
import { fetchWithTimeout } from "@/lib/fetch-timeout";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Info, Loader2 } from "lucide-react";
import {
  AREAS,
  BUDGETS,
  CONSENT_TEXT,
  CONSENT_VERSION,
  PROPERTY_TYPES,
  TIMELINES,
  referralSchema,
} from "@/lib/referral-contract";

export default function ReferralForm({
  onSubmitted,
}: { onSubmitted?: () => void } = {}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [awaitingPartners, setAwaitingPartners] = useState(false);
  const requestId = useRef<string>();
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(event.currentTarget);
    requestId.current ??= crypto.randomUUID();
    const params = new URLSearchParams(window.location.search);
    const parsed = referralSchema.safeParse({
      requestId: requestId.current,
      fullName: form.get("fullName"),
      email: form.get("email"),
      whatsapp: form.get("whatsapp"),
      budget: form.get("budget"),
      propertyType: form.get("propertyType"),
      area: form.get("area"),
      timeline: form.get("timeline"),
      consent: form.get("consent") === "on",
      consentVersion: CONSENT_VERSION,
      website: form.get("website") || "",
      attribution: {
        source: params.get("utm_source")?.slice(0, 120) || undefined,
        medium: params.get("utm_medium")?.slice(0, 120) || undefined,
        campaign: params.get("utm_campaign")?.slice(0, 120) || undefined,
      },
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError("");
    setBusy(true);
    inFlight.current = true;
    window.gtag?.("event", "referral_submit_started", {
      form_name: "developer_network",
    });
    try {
      const response = await fetchWithTimeout(
        "/api/referral",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        },
        25_000,
      );
      const data = await response.json();
      if (
        !response.ok ||
        data.success !== true ||
        typeof data.reference !== "string"
      ) {
        if (response.status === 409) requestId.current = undefined;
        throw new Error(
          response.status === 409
            ? "Your enquiry changed. Please submit again."
            : "We could not save your enquiry. Please try again.",
        );
      }
      setAwaitingPartners(data.distributionStatus === "awaiting_partners");
      setReference(data.reference);
      onSubmitted?.();
      // No names, email addresses, phone numbers or reference IDs go to analytics.
      window.gtag?.("event", "generate_lead", {
        ...(currentAiReferral() ? { ai_referral_engine: currentAiReferral() } : {}),
        form_name: "developer_network",
        method: "referral_form",
      });
    } catch (err) {
      setError(
        err instanceof Error && err.message.startsWith("Your enquiry changed")
          ? err.message
          : "We could not confirm your submission. Please retry; your reference prevents duplicate referrals.",
      );
    } finally {
      setBusy(false);
      inFlight.current = false;
    }
  }

  if (reference)
    return (
      <div className="referral-success" role="status" tabIndex={-1}>
        <span className="success-mark">
          <Check aria-hidden="true" />
        </span>
        <p className="eyebrow">Enquiry received</p>
        <div className="gold-rule" aria-hidden="true" />
        <h2>
          Your next chapter
          <br />
          starts here.
        </h2>
        <p>
          {awaitingPartners
            ? "Your enquiry has been recorded with Zanzibaba. Developer introductions are being prepared; your enquiry has not been sent to a developer yet."
            : "Your enquiry has been recorded with Zanzibaba. Participating developers may contact you directly with their property options."}
        </p>
        <div className="reference-box">
          <span>Your referral reference</span>
          <strong>{reference}</strong>
        </div>
        <div className="success-contact-note">
          <Info aria-hidden="true" />
          <span>
            {awaitingPartners
              ? "Your reference is saved with Zanzibaba."
              : "You may hear from more than one developer."}
          </span>
        </div>
        <a className="back-home-link" href="#home">
          Back to home
        </a>
        <p className="small-note">
          Keep this reference and mention ZanziInvest when speaking with
          developers. Your enquiry does not reserve a property or commit you to
          a purchase.
        </p>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      onChange={() => {
        if (!inFlight.current) requestId.current = undefined;
      }}
      className="referral-form"
      aria-label="Property enquiry"
      aria-busy={busy}
    >
      <div className="form-heading">
        <span className="eyebrow">Your next chapter starts here</span>
        <h2>What are you looking for?</h2>
        <p>One enquiry. Property options from our developer network.</p>
      </div>
      <fieldset disabled={busy}>
        <legend className="sr-only">
          Your property preferences and contact details
        </legend>
        <div className="form-grid">
          <label>
            Property type
            <select name="propertyType" required defaultValue="">
              <option value="" disabled>
                Select property type
              </option>
              {PROPERTY_TYPES.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Budget in USD
            <select name="budget" required defaultValue="">
              <option value="" disabled>
                Select your budget
              </option>
              {BUDGETS.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Preferred area
            <select name="area" required defaultValue="Any area">
              {AREAS.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Purchase timeline
            <select name="timeline" required defaultValue="">
              <option value="" disabled>
                Select your timeline
              </option>
              {TIMELINES.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label className="full-width">
            Full name
            <input
              name="fullName"
              autoComplete="name"
              required
              minLength={2}
              maxLength={120}
              placeholder="Your full name"
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
          </label>
          <label>
            WhatsApp number
            <input
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={25}
              placeholder="+255 …"
              aria-describedby="phone-help"
            />
          </label>
        </div>
        <p id="phone-help" className="field-help">
          Include your country code so developers can reach you.
        </p>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent-label">
          <input
            name="consent"
            type="checkbox"
            required
            aria-describedby="privacy-note"
          />
          <span>{CONSENT_TEXT}</span>
        </label>
        <p id="privacy-note" className="field-help">
          Read <a href="#privacy">how your information is used</a>. This is an
          enquiry, not a reservation.
        </p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="primary-button submit-button" type="submit">
          {busy ? (
            <>
              <Loader2 className="spin" aria-hidden="true" /> Sending your
              enquiry…
            </>
          ) : (
            <>
              Receive property offers <ArrowUpRight aria-hidden="true" />
            </>
          )}
        </button>
      </fieldset>
    </form>
  );
}
