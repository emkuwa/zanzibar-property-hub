import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

const questions = [
  "Is Zanzibar a good place to buy property?",
  "Which areas have the best rental returns?",
  "What is the average ROI for villas?",
];

const AIAdvisor = () => {
  return (
    <section className="py-24 bg-sand">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-accent-foreground" />
              <span className="text-sm font-semibold text-accent-foreground">AI-Powered</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              AI Investment Advisor
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Get instant answers to your property investment questions. Our AI advisor is trained on Zanzibar market data, regulations, and investment trends.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {questions.map((q) => (
              <div
                key={q}
                className="flex items-start gap-3 bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <MessageSquare className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">{q}</span>
              </div>
            ))}
            <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity mt-4">
              Ask the AI Advisor
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
