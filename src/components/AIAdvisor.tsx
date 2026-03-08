// Ndani ya function askAI:
try {
  const res = await fetch("/api/investor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await res.json();

  // HAPA NDIPO MABADILIKO YALIPO:
  setMessages(prev => [...prev, { 
    role: "ai", 
    text: data.answer || "I'm sorry, I couldn't process that. Can you rephrase?" 
  }]);
} catch (e) {
  setMessages(prev => [...prev, { role: "ai", text: "Error connecting to AI." }]);
}
