import { useState } from "react";

const AIAdvisor = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question) return;
    setMessages(prev => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      // Hapa tunasoma 'data.answer' kutoka backend
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: data.answer || "I'm looking into that for you." 
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "ai", text: "Connection error." }]);
    }
    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="p-6 bg-sand rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Zanzibar AI Advisor</h2>
      <div className="space-y-4 mb-4 h-64 overflow-y-auto bg-white p-4 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right text-blue-600' : 'text-left text-gray-800'}>
            <p className="inline-block p-2 rounded-lg bg-gray-100">{m.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          value={question} 
          onChange={e => setQuestion(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Ask me anything..."
        />
        <button onClick={askAI} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AIAdvisor;
