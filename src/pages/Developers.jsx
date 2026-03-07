import { motion } from "framer-motion";

const Developers = () => {
  return (
    <section className="min-h-screen py-20">

      <div className="container mx-auto px-6 max-w-3xl text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Get International Property Investors
        </motion.h1>

        <p className="mt-6 text-lg text-muted-foreground">
          ZanziInvest connects property developers, real estate agents and brokers
          with international investors actively searching for property investment
          opportunities in Zanzibar.
        </p>

        <div className="mt-10 bg-muted/40 p-8 rounded-xl">

          <h2 className="text-2xl font-semibold mb-6">
            Apply to Receive Investor Leads
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 rounded-lg border"
            />

            <input
              type="text"
              placeholder="Contact Person"
              className="w-full p-3 rounded-lg border"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-lg border"
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              className="w-full p-3 rounded-lg border"
            />

            <button
              className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-semibold"
            >
              Request Investor Leads
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Developers;
