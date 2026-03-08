try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();

      // Hapa lazima tuseme data.answer ili jibu litoke kwenye Backend yako
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: data.answer || "How can I assist you further with Zanzibar properties?" 
      }]);
      
      if (data.suggestions) setSuggestions(data.suggestions);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "Connection error. Please try again." }]);
    }
