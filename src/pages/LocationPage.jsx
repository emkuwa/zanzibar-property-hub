import { useParams } from "react-router-dom";

const descriptions = [
  "Zanzibar is becoming one of the top property investment destinations in East Africa.",
  "International investors are increasingly buying villas and tourism properties in Zanzibar.",
  "Tourism growth in Zanzibar is creating strong demand for rental villas and boutique hotels.",
  "Beachfront property in Zanzibar is attracting global real estate investors."
];

const locations = [
  "paje",
  "nungwi",
  "kendwa",
  "jambiani",
  "bwejuu",
  "kiwengwa",
  "matemwe",
  "michamvi",
  "fumba",
  "stone-town",
  "kizimkazi",
  "pongwe",
  "uroa"
];

const propertyTypes = [
  "villa",
  "hotel",
  "resort",
  "apartment",
  "land",
  "beachfront-villa",
  "boutique-hotel",
  "holiday-rental",
  "tourism-property",
  "investment-property"
];

export default function LocationPage() {

  const { slug } = useParams();

  let location = "";
  let type = "property";

  if (slug) {

    const cleaned = slug.replace("-zanzibar", "");

    const parts = cleaned.split("-in-");

    if (parts.length === 2) {
      type = parts[0].replace("buy-", "");
      location = parts[1];
    }

  }

  const randomText =
    descriptions[Math.floor(Math.random() * descriptions.length)];

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h1>Buy {type} in {location} Zanzibar</h1>

      <p>{randomText}</p>

      <h2>Why Invest in {location}</h2>

      <p>
        {location} is one of the fastest growing tourism areas in Zanzibar.
        Investors are developing villas, resorts and boutique hotels to serve
        international visitors coming to the island.
      </p>

      <h2>Investment Opportunities</h2>

      <ul>
        <li>Beachfront Villas</li>
        <li>Boutique Hotels</li>
        <li>Holiday Rental Apartments</li>
        <li>Tourism Land Development</li>
      </ul>

      <h2>Other Investment Areas in Zanzibar</h2>

      <ul>
        {locations.map((loc) => (
          <li key={loc}>
            <a href={`/buy-property-in-${loc}-zanzibar`}>
              Buy property in {loc} Zanzibar
            </a>
          </li>
        ))}
      </ul>

      <h2>Popular Property Investments in {location}</h2>

      <ul>
        {propertyTypes.map((ptype) => (
          <li key={ptype}>
            <a href={`/buy-${ptype}-in-${location}-zanzibar`}>
              Buy {ptype} in {location} Zanzibar
            </a>
          </li>
        ))}
      </ul>

      <h2>Request Investment Opportunities</h2>

      <form>

        <input placeholder="Full Name" /><br /><br />

        <input placeholder="Email" /><br /><br />

        <input placeholder="WhatsApp" /><br /><br />

        <button>Request Investment Details</button>

      </form>

    </div>
  );
}
