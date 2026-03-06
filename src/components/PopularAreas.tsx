import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const areas = [
  { name: "Paje", description: "Beach villas and kite-surf tourism hotspot." },
  { name: "Nungwi", description: "Luxury resort area with strong tourism demand." },
  { name: "Jambiani", description: "Emerging beachfront investment location." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PopularAreas = () => {
  return (
    <section className="py-24 bg-sand">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Popular Investment Areas in Zanzibar
          </h2>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {areas.map((a) => (
            <motion.div
              key={a.name}
              variants={item}
              className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{a.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularAreas;
