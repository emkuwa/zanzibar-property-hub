const askAI = async () => {
  if (!question.trim()) return;
  
  const userQuery = question;
  setMessages(prev => [...prev, { role: "user", text: userQuery }]);
  setLoading(true);

  try {
    const res = await fetch("/api/investor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userQuery }),
    });

    const data = await res.json();

    // LAZIMA iwe data.answer ili kusoma jibu la OpenAI
    setMessages(prev => [...prev, { 
      role: "ai", 
      text: data.answer || "Samahani, jaribu tena kidogo." 
    }]);
  } catch (error) {
    setMessages(prev => [...prev, { role: "ai", text: "Nimeshindwa kuunganisha." }]);
  }
  setQuestion("");
  setLoading(false);
};
