import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

const questions = [
  "Is Zanzibar a good place to buy property?",
  "Which areas have the best rental returns?",
  "What is the average ROI for villas?",
];

const AIAdvisor = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question) return;

    setLoading(true);

    try {

      const res = await fetch("/api/investor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      setAnswer(data.answer);

    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

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
              <span className="text-sm font-semibold text-accent-foreground">
                AI-Powered
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              AI Investment Advisor
            </h2>

            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Get instant answers to your property investment questions.
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
                onClick={() => setQuestion(q)}
                className="flex items-start gap-3 bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <MessageSquare className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {q}
                </span>
              </div>
            ))}

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about investing in Zanzibar..."
              className="w-full p-3 rounded-lg border"
            />

            <button
              onClick={askAI}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity mt-4"
            >
              {loading ? "Thinking..." : "Ask the AI Advisor"}
            </button>

            {answer && (
              <div className="bg-card p-4 rounded-lg shadow space-y-4">

                <p className="text-foreground">{answer}</p>

                <button
                  className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90"
                  onClick={() => window.location.href="/invest"}
                >
                  Get Investment Opportunities
                </button>

              </div>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
