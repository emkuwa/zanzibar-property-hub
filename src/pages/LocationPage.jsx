import { useParams } from "react-router-dom";

export default function LocationPage() {

  const { location } = useParams();

  return (
    <div style={{padding:"40px", maxWidth:"900px", margin:"auto"}}>

      <h1>Buy Property in {location} Zanzibar</h1>

      <p>
        {location} is one of the fastest growing real estate investment
        areas in Zanzibar. International investors are increasingly
        looking for beachfront villas, tourism developments and
        boutique hotels in this region.
      </p>

      <h2>Property Investment in {location}</h2>

      <p>
        Tourism growth in Zanzibar has created strong demand for
        holiday rental villas and boutique hotels in {location}.
        Many investors are targeting this location due to strong
        rental yields and beachfront opportunities.
      </p>

      <h2>Investment Opportunities</h2>

      <ul>
        <li>Beachfront Villas</li>
        <li>Boutique Hotels</li>
        <li>Holiday Rental Apartments</li>
        <li>Tourism Land Development</li>
      </ul>

      <h2>Request Investment Opportunities</h2>

      <form>

        <input placeholder="Full Name" /><br/><br/>

        <input placeholder="Email" /><br/><br/>

        <input placeholder="WhatsApp" /><br/><br/>

        <button>Request Investment Details</button>

      </form>

    </div>
  );
}
