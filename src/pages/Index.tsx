import { trackEnquiryEntry } from "@/lib/gtag";
import { HOME_QUESTIONS as questions } from "@/content/business";
import BrandFacts from "@/components/seo/BrandFacts";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileText,
  Mail,
  Menu,
  Share2,
  X,
} from "lucide-react";
import ReferralForm from "@/components/referral/ReferralForm";
import hero from "@/assets/zanziinvest-hero.webp";
import "@/components/referral/referral.css";
import "@/components/seo/seo.css";

const steps = [
  {
    Icon: FileText,
    title: "Tell us what you need",
    detail:
      "Tell us your property type, budget, preferred area and purchase timeline.",
  },
  {
    Icon: Share2,
    title: "Send your preferences",
    detail:
      "Send your property preferences to ZanziInvest.",
  },
  {
    Icon: Mail,
    title: "Explore your property options",
    detail:
      "Review property options and discuss viewings and next steps.",
  },
];

function PrivacyNotice() {
  return (
    <section
      id="privacy"
      className="privacy-section landing-container"
      aria-labelledby="privacy-heading"
    >
      <p className="eyebrow">Your information</p>
      <h2 id="privacy-heading">Privacy & contact</h2>
      <details className="service-details"><summary>How your details are used</summary>
      <p>
        ZanziInvest is operated by Zanzibaba Company Limited, Zanzibar. We
        collect your name, email, WhatsApp number and property preferences to
        record your preferences and share your details with participating partner developers. We
        record your consent text and version, submission time and referral
        reference. Campaign identifiers may be recorded when you arrive through
        a campaign link.
      </p>
      <p>
        Selecting the consent checkbox authorises sharing with all participating
        developers for property follow-up. Several developers may contact you by
        WhatsApp, phone or email. This is not a payment authorisation. Do not
        submit banking information, identity documents or other sensitive
        documents through this form.
      </p>
      <p>
        For access, correction, deletion or an end to further sharing, email{" "}
        <a href="mailto:info@zanzibaba.com">info@zanzibaba.com</a>. Developers
        who already received your details may keep their own records; you can
        also request that they stop contacting you directly.
      </p>
      </details>
    </section>
  );
}
export default function Index() {
  const [screen, setScreen] = useState<"home" | "enquiry">(() =>
    typeof window !== "undefined" && window.location.hash === "#enquiry"
      ? "enquiry"
      : "home",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    function navigate() {
      const hash = window.location.hash;
      setMenuOpen(false);
      if (hash === "#enquiry") {
        setScreen("enquiry");
        window.scrollTo(0, 0);
      } else if (!hash || hash === "#home") {
        setScreen("home");
        setSubmitted(false);
        window.scrollTo(0, 0);
      }
      // Privacy links stay in the current screen, preserving an unfinished form.
    }
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  return (
    <div
      className={`referral-landing ${screen === "enquiry" ? "enquiry-view" : "home-view"} ${submitted ? "success-view" : ""}`}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="referral-header">
        <div className="landing-container header-inner">
          <a
            href="#home"
            className="wordmark"
            aria-label="ZanziInvest by Zanzibaba home"
          >
            ZanziInvest<small>BY ZANZIBABA</small>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#enquiry">Find my property options</a>
            <a href="/guides">Guides</a>
            <a href="#privacy">Privacy</a>
          </nav>
          <button
            type="button"
            className="menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {menuOpen ? (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            onClick={() => setMenuOpen(false)}
          >
            <a href="#home">Home</a>
            <a href="#enquiry">Find my property options</a>
            <a href="/guides">Property guides</a>
            <a href="#privacy">Privacy & contact</a>
          </nav>
        ) : null}
      </header>
      <main id="main">
        {screen === "home" ? (
          <>
            <section className="landing-hero" aria-labelledby="hero-title">
              <img
                className="landing-hero-image"
                src={hero}
                alt="Palm-lined white sand beach beside turquoise ocean"
                loading="eager"
                width={1086}
                height={1448}
              />
              <div className="landing-container hero-content">
                <h1 id="hero-title">
                  <span>Own a Piece of Paradise</span>
                  <span>in Zanzibar.</span>
                </h1>
                <div className="gold-rule" aria-hidden="true" />
                <p className="hero-description">
                  Discover villas and apartments for your island home, holiday escape or next investment. Talk to us to find your place.
                </p>
                <a className="primary-button hero-button" href="#enquiry" onClick={() => trackEnquiryEntry("hero")}>
                  Find my property options <ArrowRight aria-hidden="true" />
                </a>
                <p className="hero-reassurance">Your island home starts with a conversation.</p>
              </div>
            </section>
            <section
              id="how-it-works"
              className="how-section landing-container"
              aria-labelledby="how-heading"
            >
              <h2 id="how-heading">How it works</h2>
              <div className="steps-grid">
                {steps.map(({ Icon, title, detail }) => (
                  <article key={title} className="step-card">
                    <span className="step-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <div className="step-copy">
                      <h3>{title}</h3>
                      <p>{detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section
              id="questions"
              className="faq-section landing-container"
              aria-labelledby="faq-heading"
            >
              <p className="eyebrow">Before you get started</p>
              <h2 id="faq-heading">A few things to know.</h2>
              <div className="faq-list">
                {questions.slice(0, 3).map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
              <a className="primary-button closing-button" href="#enquiry" onClick={() => trackEnquiryEntry("faq")}>
                Find my property options <ArrowRight aria-hidden="true" />
              </a>
            </section>
          </>
        ) : (
          <section
            className="enquiry-screen"
            aria-label={
              submitted ? "Preferences confirmation" : "Property preferences form"
            }
          >
            {!submitted ? (
              <>
                <a href="#home" className="back-link">
                  <ArrowLeft size={20} aria-hidden="true" /> Back
                </a>
                <h1>
                  Tell us what you’re
                  <br />
                  looking for.
                </h1>
                <div className="gold-rule" aria-hidden="true" />
              </>
            ) : null}
            <ReferralForm
              onSubmitted={() => {
                setSubmitted(true);
                window.scrollTo(0, 0);
              }}
            />
          </section>
        )}
        {screen === "home" ? (
          <section
            className="seo-discovery landing-container"
            aria-labelledby="guides-heading"
          >
            <p className="eyebrow">Explore before you choose</p>
            <h2 id="guides-heading">Explore Zanzibar property guides</h2>
            <div className="seo-discovery-grid">
              <a href="/areas/paje">Paje property guide →</a>
              <a href="/areas/fumba">Fumba property guide →</a>
              <a href="/guides/zanzibar-apartments">Compare apartments →</a>
              <a href="/guides/zanzibar-property-costs">
                Plan your full buying budget →
              </a>
              <a href="/guides/zanzibar-property-payment-plans">
                Compare payment plans →
              </a>
              <a href="/blog/paje-vs-fumba">Paje vs Fumba →</a>
            </div>
            <p>
              <a href="/areas">All area guides</a>
              <a href="/guides">All buying guides</a>
              <a href="/blog">Property insights</a>
            </p>
          </section>
        ) : null}
        <BrandFacts />
        <PrivacyNotice />
      </main>
      <footer className="landing-footer">
        <div className="landing-container footer-inner">
          <a href="#home" className="wordmark">
            ZanziInvest<small>BY ZANZIBABA</small>
          </a>
          <p>
            Your Zanzibar property connection.
            <br />
            Operated by Zanzibaba Company Limited.
            <br />
            Zanzibar, Tanzania
          </p>
          <a href="mailto:info@zanzibaba.com">info@zanzibaba.com</a>
        </div>
        <div className="landing-container footer-bottom">
          <span>© {new Date().getFullYear()} Zanzibaba Company Limited</span>
          <a href="#privacy">Privacy & contact preferences</a>
        </div>
      </footer>
    </div>
  );
}
