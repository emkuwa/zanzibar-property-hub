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

  const askAI = async (selectedQuestion?: string) => {
    const q = selectedQuestion || question;
    if (!q) return;

    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();

      // Hapa ndipo tunasoma 'answer' badala ya ujumbe wa kizamani
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: data.answer || "I am analyzing the market for you..." 
      }]);
      
      setSuggestions(data.suggestions || []);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "Service temporarily unavailable." }]);
    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <section className="py-24 bg-sand">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <motion.div>
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6 text-accent-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">AI Advisor</span>
            </div>
            <h2 className="text-4xl font-bold">Zanzibar Investment AI</h2>
          </motion.div>

          <div className="space-y-4">
            {/* Clickable suggestions */}
            {!messages.length && questions.map((q) => (
              <button 
                key={q} 
                onClick={() => askAI(q)}
                className="w-full text-left p-4 bg-white rounded-xl shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-3"
              >
                <MessageSquare className="w-5 h-5 text-blue-500" />
                {q}
              </button>
            ))}

            {/* Chat Messages */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-white text-gray-800 mr-auto'} max-w-[85%]`}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="flex gap-2">
              <input 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 p-3 border rounded-lg"
              />
              <button 
                onClick={() => askAI()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
