import { motion } from "framer-motion";
import pajeImg from "@/assets/paje-villa.jpg";
import nungwiImg from "@/assets/nungwi-apartments.jpg";
import jambianiImg from "@/assets/jambiani-villa.jpg";
import { MapPin } from "lucide-react";

const properties = [
  {
    name: "Paje Beach Villas",
    location: "Paje, East Coast",
    price: "$120,000 – $250,000",
    description: "Modern beachfront villas with infinity pools.",
    image: pajeImg,
  },
  {
    name: "Nungwi Ocean Apartments",
    location: "Nungwi, North Coast",
    price: "$85,000 – $180,000",
    description: "Contemporary ocean-view apartments.",
    image: nungwiImg,
  },
  {
    name: "Jambiani Luxury Villas",
    location: "Jambiani, Southeast",
    price: "$150,000 – $350,000",
    description: "Exclusive private villas with beach access.",
    image: jambianiImg,
  },
];

const FeaturedProperties = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Zanzibar Property Investment Opportunities",
    "itemListElement": properties.map((p, i) => ({
      "@type": "Residence",
      "position": i + 1,
      "name": p.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": p.location.split(',')[0],
        "addressRegion": "Zanzibar"
      }
    }))
  };

  return (
    <section id="properties" className="py-24 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Featured Investment Opportunities
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Hand-picked properties with strong rental potential and capital appreciation.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {p.location}
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground">
                  {p.name}
                </h3>

                <p className="text-secondary font-semibold mt-1">{p.price}</p>

                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  {p.description}
                </p>

                {/* Button hii sasa inapeleka mteja kwenye form kwa smooth scroll */}
                <a
  href="#investor-form"
  className="relative z-20 mt-5 block w-full ..."
>
  View Investment Details
</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
