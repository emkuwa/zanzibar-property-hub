import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock } from "lucide-react";

const ROICalculator = () => {
  const [price, setPrice] = useState(150000);
  const [nightly, setNightly] = useState(120);
  const [occupancy, setOccupancy] = useState(65);

  const results = useMemo(() => {
    const annualIncome = nightly * (occupancy / 100) * 365;
    const roi = (annualIncome / price) * 100;
    const payback = price / annualIncome;
    return { annualIncome, roi, payback };
  }, [price, nightly, occupancy]);

  return (
    <section id="calculator" className="py-24 bg-ocean-gradient">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
            Investment ROI Calculator
          </h2>

          <p className="mt-4 text-primary-foreground/75 text-lg max-w-xl mx-auto">
            Estimate your potential rental income and return on investment from a Zanzibar property.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-xl"
        >

          <div className="grid md:grid-cols-3 gap-8 mb-10">

            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">
                Property Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">
                Nightly Rental ($)
              </label>
              <input
                type="number"
                value={nightly}
                onChange={(e) => setNightly(Number(e.target.value))}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">
                Occupancy Rate (%)
              </label>
              <input
                type="number"
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground font-semibold"
              />
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-accent rounded-xl p-6 text-center">
              <Calculator className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Annual Income</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                ${results.annualIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-accent rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">ROI</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {results.roi.toFixed(1)}%
              </p>
            </div>

            <div className="bg-accent rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Payback Period</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {results.payback.toFixed(1)} years
              </p>
            </div>

          </div>

          <div className="text-center mt-10">
            <a
              href="#investor-form"
              className="inline-block px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90"
            >
              Get Investment Opportunities
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default ROICalculator;
