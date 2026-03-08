export default async function handler(req, res) {

try {

```
const { question } = req.body;

const prompt = `
```

You are a Zanzibar property investment advisor.

Rules:

* Answer in MAXIMUM 2 short sentences.
* Keep answers clear and simple.
* Focus on property investment in Zanzibar.
* After answering, ask if they want to receive investment opportunities.

Question:
${question}
`;

```
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${process.env.OPENAI_API_KEY}\`
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful Zanzibar real estate investment advisor."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  })
});

const data = await response.json();

const answer = data?.choices?.[0]?.message?.content || "Sorry, I couldn't answer that.";

res.status(200).json({
  answer,
  suggestions: [
    "Can foreigners buy property in Zanzibar?",
    "Best areas to invest in Zanzibar",
    "Average ROI for villas in Zanzibar",
    "Is Zanzibar good for real estate investment?"
  ]
});
```

} catch (error) {

```
console.error(error);

res.status(500).json({
  answer: "Sorry, something went wrong."
});
```

}

}
