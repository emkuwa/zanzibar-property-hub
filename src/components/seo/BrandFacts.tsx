import { BUSINESS, HOME_QUESTIONS, REVIEWED } from "@/content/business";
export default function BrandFacts() {
  return <section className="landing-container privacy-section" aria-label="Service information">
    <details className="service-details"><summary>About ZanziInvest and service details</summary><div data-answer-section="landing">
    <h2 id="brand-facts-heading">About ZanziInvest</h2>
    <p>ZanziInvest by Zanzibaba is operated by Zanzibaba Company Limited. Share your property preferences and consent to introductions to participating developers; this does not reserve a property.</p>
    <div className="seo-table-wrap"><table><caption>ZanziInvest service facts</caption><tbody>
      <tr><th scope="row">Operator</th><td>{BUSINESS.name}</td></tr>
      <tr><th scope="row">Service area</th><td>{BUSINESS.area}</td></tr>
      <tr><th scope="row">Your preferences and contacts</th><td>Property type, budget, preferred area, timeline, name, email and WhatsApp number, plus sharing consent.</td></tr>
      <tr><th scope="row">After submission</th><td>Your preferences are saved with a reference. Sharing depends on participating developers being available; a saved reference does not confirm delivery.</td></tr>
      <tr><th scope="row">Prices and commitment</th><td>No payment or reservation is made through the preferences form. Confirm property prices, availability, charges and contract terms directly with the developer.</td></tr>
      <tr><th scope="row">Contact</th><td><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></td></tr>
    </tbody></table></div>
    <p>If no participating developer is available, the confirmation records that introductions are being prepared and your details have not been shared. Confirm the unit, charges and contract with the developer before making a reservation decision; this form does not perform those checks.</p>
    <div className="faq-list">{HOME_QUESTIONS.slice(3).map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    <p>Last updated: <time dateTime={REVIEWED}>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(REVIEWED + "T00:00:00Z"))}</time></p>
    </div></details>
  </section>;
}
