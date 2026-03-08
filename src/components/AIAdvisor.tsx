// Ndani ya AIAdvisor.tsx
const data = await response.json();

setMessages(prev => [...prev, { 
  role: "ai", 
  text: data.answer || "Searching Zanzibar investment data..." // Hakikisha ni data.answer
}]);
