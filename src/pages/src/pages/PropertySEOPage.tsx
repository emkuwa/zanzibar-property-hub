import { useParams } from "react-router-dom";

const content: any = {

  "zanzibar-villas-for-sale": {
    title: "Zanzibar Villas for Sale",
    text: "Explore villas for sale in Zanzibar including beachfront villas and luxury holiday homes popular with international investors."
  },

  "best-areas-to-buy-property-in-zanzibar": {
    title: "Best Areas to Buy Property in Zanzibar",
    text: "Popular areas for property investment in Zanzibar include Paje, Nungwi, and Jambiani where tourism demand and rental income potential are strong."
  },

  "zanzibar-beachfront-property": {
    title: "Zanzibar Beachfront Property",
    text: "Beachfront property in Zanzibar attracts investors looking for holiday rental income and long-term appreciation."
  },

  "invest-in-zanzibar-property": {
    title: "Invest in Zanzibar Property",
    text: "Zanzibar is becoming a leading property investment destination in East Africa due to tourism growth and international interest."
  },

  "buy-villa-in-zanzibar": {
    title: "Buy Villa in Zanzibar",
    text: "Buying a villa in Zanzibar is becoming increasingly popular among international investors looking for strong rental yields and capital growth."
  }

};

const PropertySEOPage = () => {

  const { slug } = useParams();
  const page = content[slug || ""];

  if (!page) {
    return (
      <div className="container mx-auto px-6 py-20">
        Page not found
      </div>
    );
  }

  return (

    <div className="container mx-auto px-6 py-20 max-w-4xl">

      <h1 className="text-4xl font-bold mb-6">
        {page.title}
      </h1>

      <p className="text-lg mb-8">
        {page.text}
      </p>

      <p className="text-lg mb-8">
        Zanzibar has become one of the most attractive real estate investment destinations in East Africa. 
        Investors are attracted by the growing tourism industry, beachfront land availability and strong demand for holiday rentals.
      </p>

      <a
        href="#investor-form"
        className="inline-block px-8 py-4 bg-black text-white rounded-lg"
      >
        Get Zanzibar Investment Opportunities
      </a>

      <div className="mt-16">

        <h3 className="text-2xl font-bold mb-4">
          Related Investment Pages
        </h3>

        <ul className="space-y-3">

          <li>
            <a className="text-blue-600 underline" href="/zanzibar-villas-for-sale">
              Zanzibar Villas for Sale
            </a>
          </li>

          <li>
            <a className="text-blue-600 underline" href="/best-areas-to-buy-property-in-zanzibar">
              Best Areas to Buy Property in Zanzibar
            </a>
          </li>

          <li>
            <a className="text-blue-600 underline" href="/zanzibar-beachfront-property">
              Zanzibar Beachfront Property
            </a>
          </li>

          <li>
            <a className="text-blue-600 underline" href="/invest-in-zanzibar-property">
              Invest in Zanzibar Property
            </a>
          </li>

          <li>
            <a className="text-blue-600 underline" href="/buy-villa-in-zanzibar">
              Buy Villa in Zanzibar
            </a>
          </li>

        </ul>

      </div>

    </div>

  );

};

export default PropertySEOPage;
