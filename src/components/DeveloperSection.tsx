import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const DeveloperSection = () => {
  return (
    <section className="py-24 bg-ocean-gradient">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Building2 className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
            List Your Development
          </h2>
          <p className="mt-4 text-primary-foreground/75 text-lg">
            Get your project discovered by international investors actively looking for property in Zanzibar.
          </p>
          <button className="mt-8 inline-flex items-center px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
            List Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperSection;
