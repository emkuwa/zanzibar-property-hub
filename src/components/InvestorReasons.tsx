import { motion } from "framer-motion";
import { Plane, Key, Palmtree, Globe2 } from "lucide-react";

const reasons = [
  {
    icon: Plane,
    title: "Tourism Growth",
    description: "Over 500,000 tourists visit Zanzibar annually.",
  },
  {
    icon: Key,
    title: "Strong Rental Market",
    description: "High demand for short-term rentals.",
  },
  {
    icon: Palmtree,
    title: "Affordable Beachfront Property",
    description: "Lower prices than other beach destinations.",
  },
  {
    icon: Globe2,
    title: "Growing Global Interest",
    description: "Increasing international investment.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const InvestorReasons = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Why International Investors Choose Zanzibar
          </h2>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={item}
              className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                <r.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorReasons;
