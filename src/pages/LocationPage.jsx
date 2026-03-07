import { useParams } from "react-router-dom";

export default function LocationPage() {
  const { location } = useParams();

  return (
    <div style={{padding:"40px"}}>
      <h1>Buy Property in {location} Zanzibar</h1>

      <p>
        {location} is one of the most attractive locations in Zanzibar
        for international real estate investors looking for beachfront
        developments and tourism property opportunities.
      </p>

      <h2>Why Invest in {location}</h2>

      <p>
        Tourism in Zanzibar is growing rapidly and areas like {location}
        are attracting developers building villas, boutique hotels and
        holiday rental properties.
      </p>

      <h2>Investment Opportunities</h2>

      <ul>
        <li>Beachfront Villas</li>
        <li>Boutique Hotels</li>
        <li>Rental Apartments</li>
        <li>Land for Development</li>
      </ul>

      <h2>Request Investment Details</h2>

      <form>
        <input placeholder="Name" /><br/><br/>
        <input placeholder="Email" /><br/><br/>
        <input placeholder="WhatsApp" /><br/><br/>
        <button>Request Details</button>
      </form>

    </div>
  );
}
