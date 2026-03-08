export default async function handler(req: any, res: any) {

try {

```
const { question } = req.body;

const prompt = `
```

You are a professional Zanzibar property investment advisor.

Write the answer in ONE short paragraph (3–4 sentences maximum).
Explain clearly and naturally like a helpful advisor.

After the paragraph, add a short invitation asking if the investor
would like to receive property investment opportunities in Zanzibar.

Question:
${question}
`;

```
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    max_tokens: 120,
    temperature: 0.6,
    messages: [
      {
        role: "system",
        content: "You are a Zanzibar real estate investment expert."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  })
});

const data = await response.json();

const answer =
  data?.choices?.[0]?.message?.content ||
  "Sorry, I couldn't answer that.";

res.status(200).json({
  answer,
  suggestions: [
    "Can foreigners buy property in Zanzibar?",
    "Best areas to invest in Zanzibar",
    "Average ROI for Zanzibar villas",
    "Buy land in Zanzibar as a foreign investor"
  ]
});
```

} catch (error) {

```
console.error(error);

res.status(500).json({
  answer: "Something went wrong."
});
```

}

}
