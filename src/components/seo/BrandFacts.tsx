import { BUSINESS, REVIEWED } from "@/content/business";
export default function BrandFacts() {
  return <section data-answer-section="landing" className="landing-container privacy-section" aria-labelledby="brand-facts-heading">
    <h2 id="brand-facts-heading">Who operates ZanziInvest and what does an enquiry do?</h2>
    <p>ZanziInvest by Zanzibaba is a Zanzibar property enquiry service operated by Zanzibaba Company Limited. An enquiry records your preferences and consent for introductions to participating developers; it does not reserve a property.</p>
    <div className="seo-table-wrap"><table><caption>ZanziInvest service facts</caption><tbody>
      <tr><th scope="row">Operator</th><td>{BUSINESS.name}</td></tr>
      <tr><th scope="row">Service area</th><td>{BUSINESS.area}</td></tr>
      <tr><th scope="row">Enquiry details</th><td>Property type, budget, preferred area, timeline, name, email and WhatsApp number, plus sharing consent.</td></tr>
      <tr><th scope="row">After submission</th><td>The enquiry is saved with a reference. Sharing depends on participating developers being available; a saved enquiry does not confirm delivery.</td></tr>
      <tr><th scope="row">Developer contact</th><td>Consent covers all participating partner developers. Several developers may contact you directly.</td></tr>
      <tr><th scope="row">Prices and commitment</th><td>No payment or reservation is made through the enquiry form. Confirm property prices, availability, charges and contract terms directly with the developer.</td></tr>
      <tr><th scope="row">Commission</th><td>Zanzibaba may receive a developer referral commission under its agreement with that developer.</td></tr>
      <tr><th scope="row">Contact</th><td><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></td></tr>
    </tbody></table></div>
    <p>If no participating developer is available, the confirmation records that introductions are being prepared and the enquiry has not been sent. Confirm the unit, charges and contract with the developer before making a reservation decision; this form does not perform those checks.</p>
    <p>Last updated: <time dateTime={REVIEWED}>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(REVIEWED + "T00:00:00Z"))}</time></p>
  </section>;
}
