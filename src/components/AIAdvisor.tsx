// Ndani ya function askAI
const askAI = async (text?: string) => {
  const query = text || question;
  if (!query) return;

  setMessages(prev => [...prev, { role: "user", text: query }]);
  setLoading(true);

  try {
    const response = await fetch("/api/investor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query }), // Tuma swali
    });

    const data = await response.json();

    // MUHIMU: Hakikisha jina ni data.answer
    setMessages(prev => [...prev, { 
      role: "ai", 
      text: data.answer || "Niko hapa kusaidia uwekezaji wako Zanzibar." 
    }]);
  } catch (err) {
    setMessages(prev => [...prev, { role: "ai", text: "Hitilafu ya mtandao, jaribu tena." }]);
  }
  setLoading(false);
  setQuestion("");
};
