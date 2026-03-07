import { motion } from "framer-motion";

const DeveloperSection = () => {
  return (
    <section className="py-20 bg-muted/40">

      <div className="container mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl font-bold"
        >
          Partner With ZanziInvest
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-muted-foreground"
        >
          ZanziInvest connects property developers, agents, and brokers with
          international investors actively searching for property opportunities
          in Zanzibar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >

          <a
            href="/developers"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Partner With Us
          </a>

        </motion.div>

      </div>

    </section>
  );
};

export default DeveloperSection;
