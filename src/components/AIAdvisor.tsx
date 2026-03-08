const askAI = async (selectedQuestion?: string) => {
    const q = selectedQuestion || question;
    if (!q) return;

    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }), // Tuma swali pekee hapa
      });

      const data = await res.json();

      // MUHIMU: Hapa lazima tuseme data.answer ili AI isitoe jibu la default
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: data.answer || "I have received your query. How else can I help?" 
      }]);
      
      if (data.suggestions) setSuggestions(data.suggestions);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "I'm having trouble connecting right now." }]);
    }

    setQuestion("");
    setLoading(false);
  };
