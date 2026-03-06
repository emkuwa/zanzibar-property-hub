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
  }
};

const PropertySEOPage = () => {
  const { slug } = useParams();

  const page = content[slug || ""];

  if (!page) {
    return <div className="container mx-auto px-6 py-20">Page not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <p className="text-lg">{page.text}</p>
    </div>
  );
};

export default PropertySEOPage;
