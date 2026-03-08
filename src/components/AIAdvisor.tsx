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
const [messages, setMessages] = useState<any[]>([]);
const [suggestions, setSuggestions] = useState<string[]>([]);
const [loading, setLoading] = useState(false);

const askAI = async () => {

```
if (!question) return;

const userMessage = { role: "user", text: question };

setMessages(prev => [...prev, userMessage]);

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

  const aiMessage = {
    role: "ai",
    text: data.answer
  };

  setMessages(prev => [...prev, aiMessage]);
  setSuggestions(data.suggestions || []);

} catch (error) {

  setMessages(prev => [...prev, {
    role: "ai",
    text: "Error getting response."
  }]);

}

setQuestion("");
setLoading(false);
```

};

return ( <section className="py-24 bg-sand"> <div className="container mx-auto px-6"> <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">

```
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
          Ask questions about property investment in Zanzibar.
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
            className="flex items-start gap-3 bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
            <span className="text-foreground font-medium">
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
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90"
        >
          {loading ? "Thinking..." : "Ask the AI Advisor"}
        </button>

        <div className="space-y-3">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-card"
              }`}
            >
              {msg.text}
            </div>
          ))}

        </div>

        {suggestions.length > 0 && (

          <div className="flex flex-wrap gap-2 mt-4">

            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setQuestion(s)}
                className="text-sm bg-card px-3 py-1 rounded"
              >
                {s}
              </button>
            ))}

          </div>

        )}

        {messages.length > 0 && (
          <button
            className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold"
            onClick={() => window.location.href="/invest"}
          >
            Get Investment Opportunities
          </button>
        )}

      </motion.div>

    </div>
  </div>
</section>
```

);
};

export default AIAdvisor;
