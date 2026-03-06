import { motion } from "framer-motion";
import { TrendingUp, Home, DollarSign, Globe } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Fast Growing Tourism Market",
    description: "Zanzibar's tourism sector is booming with double-digit growth year over year.",
  },
  {
    icon: Home,
    title: "High Rental Demand",
    description: "Strong Airbnb and short-term rental demand from global travelers year-round.",
  },
  {
    icon: DollarSign,
    title: "Affordable Beachfront Property",
    description: "Premium oceanfront properties at a fraction of comparable global destinations.",
  },
  {
    icon: Globe,
    title: "International Investor Interest",
    description: "Growing interest from European, Middle Eastern, and African investors.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WhyInvest = () => {
  return (
    <section id="why-zanzibar" className="py-24 bg-sand">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Why Invest in Zanzibar?
          </h2>

          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            A unique combination of growth, affordability, and global appeal makes Zanzibar one of the most exciting property markets today.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={item}
              className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                <b.icon className="w-7 h-7 text-accent-foreground" />
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {b.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyInvest;
