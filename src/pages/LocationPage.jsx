import { useParams } from "react-router-dom";

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

  const formattedLocation =
    location.charAt(0).toUpperCase() + location.slice(1);

  document.title =
  `Buy ${type} in ${formattedLocation} Zanzibar – Investment Opportunities | ZanziInvest`;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto", fontFamily:"Arial, sans-serif" }}>

      <h1 style={{fontSize:"32px",fontWeight:"700",marginBottom:"20px"}}>
        Buy {type} in {formattedLocation} Zanzibar – Investment Opportunities
      </h1>

      <p style={{marginBottom:"25px",lineHeight:"1.7",fontSize:"17px"}}>
        Zanzibar is becoming one of the most attractive real estate investment
        destinations in East Africa. International investors are increasingly
        buying villas, hotels and tourism properties across the island.
      </p>

      <h2 style={{fontSize:"22px",fontWeight:"600",marginTop:"40px",marginBottom:"15px"}}>
        Why Invest in {formattedLocation}
      </h2>

      <p style={{marginBottom:"20px",lineHeight:"1.7"}}>
        {formattedLocation} is one of the fastest growing tourism areas in
        Zanzibar. Investors are developing villas, resorts and boutique hotels
        to serve international visitors coming to the island.
      </p>

      <p style={{marginBottom:"25px",lineHeight:"1.7"}}>
        {formattedLocation} is attracting international property investors
        looking for beachfront villas, boutique hotels and tourism development
        opportunities. With strong tourism growth and increasing demand for
        holiday rentals, this location has become one of the most promising
        real estate investment areas in Zanzibar.
      </p>

      <h2 style={{fontSize:"22px",fontWeight:"600",marginTop:"40px",marginBottom:"15px"}}>
        Investment Opportunities
      </h2>

      <ul style={{marginBottom:"25px",paddingLeft:"20px"}}>
        <li style={{marginBottom:"8px"}}>Beachfront Villas</li>
        <li style={{marginBottom:"8px"}}>Boutique Hotels</li>
        <li style={{marginBottom:"8px"}}>Holiday Rental Apartments</li>
        <li style={{marginBottom:"8px"}}>Tourism Land Development</li>
      </ul>

      <h2 style={{fontSize:"22px",fontWeight:"600",marginTop:"40px",marginBottom:"15px"}}>
        Other Investment Areas in Zanzibar
      </h2>

      <ul style={{marginBottom:"25px",paddingLeft:"20px"}}>
        {locations.map((loc) => {

          const locFormatted =
          loc.charAt(0).toUpperCase() + loc.slice(1);

          return (
            <li key={loc} style={{marginBottom:"8px"}}>
              <a href={`/buy-property-in-${loc}-zanzibar`}>
                Buy property in {locFormatted} Zanzibar
              </a>
            </li>
          );
        })}
      </ul>

      <h2 style={{fontSize:"22px",fontWeight:"600",marginTop:"40px",marginBottom:"15px"}}>
        Popular Property Investments in {formattedLocation}
      </h2>

      <ul style={{marginBottom:"25px",paddingLeft:"20px"}}>
        {propertyTypes.map((ptype) => (
          <li key={ptype} style={{marginBottom:"8px"}}>
            <a href={`/buy-${ptype}-in-${location}-zanzibar`}>
              Buy {ptype} in {formattedLocation} Zanzibar
            </a>
          </li>
        ))}
      </ul>

      <h2 style={{fontSize:"22px",fontWeight:"600",marginTop:"40px",marginBottom:"15px"}}>
        Request Investment Opportunities
      </h2>

      <form>

        <input placeholder="Full Name" /><br /><br />

        <input placeholder="Email" /><br /><br />

        <input placeholder="WhatsApp" /><br /><br />

        <button>Request Investment Details</button>

      </form>

    </div>
  );
}
