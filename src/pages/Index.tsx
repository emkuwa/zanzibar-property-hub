import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Landmark,
  MapPin,
  Send,
  Waves,
} from "lucide-react";
import ReferralForm from "@/components/referral/ReferralForm";
import hero from "@/assets/hero-zanzibar.jpg";
import "@/components/referral/referral.css";

const questions = [
  [
    "What happens after I submit?",
    "Zanzibaba records your enquiry and referral reference. Your details are shared with participating partner developers, who handle property information, viewings, negotiations and purchase discussions directly. You may receive several calls, WhatsApp messages or emails.",
  ],
  [
    "Will I be connected to just one developer?",
    "No. This is a shared enquiry to our participating developer network. Your preferences help each developer decide which options to offer; they do not restrict your enquiry to a single developer.",
  ],
  [
    "Why are project names not shown here?",
    "This page collects your property brief. Developers provide current project names, brochures, pricing and availability directly after the referral. There is no public project directory on this page.",
  ],
  [
    "Does submitting reserve a property?",
    "No. An enquiry creates no reservation, purchase commitment or promise of availability. Confirm unit details, costs, payment terms and legal documentation directly before proceeding.",
  ],
  [
    "How does Zanzibaba earn from this service?",
    "Zanzibaba may receive a referral commission from the developer under its agreement with that developer. Ask the developer to confirm all charges and the full purchase terms in writing.",
  ],
  [
    "Can I stop further contact?",
    "Yes. Ask each developer who contacts you to stop, and email info@zanzibaba.com to request that Zanzibaba stop further sharing of your enquiry. Include your referral reference if you have it.",
  ],
];

export default function Index() {
  return (
    <div className="referral-landing">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="referral-header">
        <div className="landing-container header-inner">
          <a
            href="/"
            className="wordmark"
            aria-label="ZanziInvest by Zanzibaba home"
          >
            Zanzi<span>Invest</span>
            <small>BY ZANZIBABA</small>
          </a>
          <nav aria-label="Main navigation">
            <a className="desktop-link" href="#how-it-works">
              How it works
            </a>
            <a className="desktop-link" href="#questions">
              Questions
            </a>
            <a className="header-cta" href="#enquiry">
              Find my options <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="landing-hero" aria-labelledby="hero-title">
          <img
            className="landing-hero-image"
            src={hero}
            alt="Coastal villas beside the Indian Ocean"
            fetchPriority="high"
          />
          <div className="landing-container hero-content">
            <p className="eyebrow light">
              <MapPin size={14} aria-hidden="true" /> Zanzibar, Tanzania
            </p>
            <h1 id="hero-title">
              Your Zanzibar property.
              <br />
              <em>More possibilities.</em>
              <br />
              One enquiry.
            </h1>
            <p className="hero-description">
              Tell us your budget and what you're looking for. Receive property
              offers directly from Zanzibaba's partner developers—without
              searching project by project.
            </p>
            <a className="primary-button" href="#enquiry">
              Receive property offers <ArrowUpRight aria-hidden="true" />
            </a>
            <p className="hero-note">
              Apartments · Villas · Land · Hospitality
            </p>
          </div>
          <div className="hero-bottom">
            <span>ZANZIBAR PROPERTY ENQUIRIES</span>
            <a href="#how-it-works">
              A simpler way to explore{" "}
              <ChevronDown size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
        <div
          className="benefit-bar landing-container"
          aria-label="Service at a glance"
        >
          <span>
            <Check aria-hidden="true" /> One enquiry form
          </span>
          <span>
            <Check aria-hidden="true" /> Multiple developer contacts
          </span>
          <span>
            <Check aria-hidden="true" /> No purchase commitment
          </span>
        </div>
        <section
          id="how-it-works"
          className="landing-section landing-container"
          aria-labelledby="how-heading"
        >
          <div className="section-heading">
            <p className="eyebrow">From interest to introduction</p>
            <h2 id="how-heading">
              Let the opportunities
              <br />
              <em>come to you.</em>
            </h2>
            <p>
              Share your brief once. Our partner developers take the
              conversation forward directly, so you can compare their options on
              your own terms.
            </p>
          </div>
          <div className="steps-grid">
            {[
              [
                "01",
                Send,
                "Tell us your brief",
                "Choose a property type, budget, area and purchase timeline. Add your contact details and agree to developer contact.",
              ],
              [
                "02",
                Building2,
                "Reach our developer network",
                "Your enquiry is recorded with a Zanzibaba reference and shared with all participating partner developers.",
              ],
              [
                "03",
                Waves,
                "Explore offers directly",
                "Developers contact you with their available options. Discuss brochures, viewings and purchase terms directly with them.",
              ],
            ].map(([n, Icon, title, detail]) => {
              const StepIcon = Icon as typeof Send;
              return (
                <article key={n as string} className="step-card">
                  <div className="step-top">
                    <StepIcon aria-hidden="true" />
                    <span>{n as string}</span>
                  </div>
                  <h3>{title as string}</h3>
                  <p>{detail as string}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className="property-band" aria-labelledby="property-heading">
          <div className="landing-container property-band-inner">
            <div>
              <p className="eyebrow light">A brief built around you</p>
              <h2 id="property-heading">
                A home. An investment.
                <br />
                <em>Your next chapter.</em>
              </h2>
            </div>
            <div className="property-types">
              {["Apartments", "Villas", "Land", "Hotels & resorts"].map(
                (v, i) => (
                  <span key={v}>
                    <Landmark size={18} aria-hidden="true" />
                    {v}
                    <small>0{i + 1}</small>
                  </span>
                ),
              )}
              <p>
                Options depend on each developer's current inventory. Prices and
                availability are confirmed directly.
              </p>
            </div>
          </div>
        </section>
        <section
          id="enquiry"
          className="landing-section enquiry-section landing-container"
          aria-labelledby="enquiry-heading"
        >
          <div className="enquiry-copy">
            <p className="eyebrow">One brief. A wider view.</p>
            <h2 id="enquiry-heading">
              Start with
              <br />
              <em>what matters to you.</em>
            </h2>
            <p>
              You don't need to choose a project today. Tell the network what
              you're looking for and let developers introduce their options.
            </p>
            <ul>
              <li>
                <Check aria-hidden="true" /> Budget and location preferences
              </li>
              <li>
                <Check aria-hidden="true" /> Direct developer conversations
              </li>
              <li>
                <Check aria-hidden="true" /> A recorded Zanzibaba referral
              </li>
            </ul>
            <div className="expectation-note">
              <strong>What to expect</strong>
              <p>
                Your enquiry goes to multiple participating developers. They may
                each contact you by WhatsApp, phone or email. Offers are subject
                to their availability and terms.
              </p>
            </div>
          </div>
          <ReferralForm />
        </section>
        <section
          id="questions"
          className="landing-section faq-section landing-container"
          aria-labelledby="faq-heading"
        >
          <div className="section-heading">
            <p className="eyebrow">Before you enquire</p>
            <h2 id="faq-heading">
              A few things
              <br />
              <em>to know.</em>
            </h2>
          </div>
          <div className="faq-list">
            {questions.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown aria-hidden="true" size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="privacy"
          className="privacy-section landing-container"
          aria-labelledby="privacy-heading"
        >
          <p className="eyebrow">Your information</p>
          <h2 id="privacy-heading">Clear consent. Direct contact.</h2>
          <p>
            ZanziInvest is operated by Zanzibaba Company Limited, Zanzibar. We
            collect your name, email, WhatsApp number and property preferences
            to record and share your enquiry with participating partner
            developers. We also record your consent version, submission time and
            referral reference. If you arrive through a campaign link, its
            campaign identifiers may be recorded.
          </p>
          <p>
            By selecting the consent checkbox, you authorise sharing with all
            participating developers for property follow-up. They receive your
            brief and contact details, not a payment authorisation. Do not
            submit banking information, identity documents or other sensitive
            documents through this form.
          </p>
          <p>
            To request access, correction, deletion or an end to further
            sharing, contact{" "}
            <a href="mailto:info@zanzibaba.com">info@zanzibaba.com</a>.
            Developers who have already received your details may hold their own
            records; you can request that they stop contacting you directly.
          </p>
        </section>
      </main>
      <footer className="landing-footer">
        <div className="landing-container">
          <a href="/" className="wordmark">
            Zanzi<span>Invest</span>
            <small>BY ZANZIBABA</small>
          </a>
          <p>
            A property introduction service by Zanzibaba Company Limited.
            <br />
            Zanzibar, Tanzania
          </p>
          <a href="mailto:info@zanzibaba.com">
            info@zanzibaba.com <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="landing-container footer-bottom">
          <span>© {new Date().getFullYear()} Zanzibaba Company Limited</span>
          <a href="#privacy">Privacy & contact preferences</a>
        </div>
      </footer>
    </div>
  );
}
