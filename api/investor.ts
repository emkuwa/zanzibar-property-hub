export default async function handler(req, res) {

  const { question } = req.body;

  const prompt = `
You are a real estate investment advisor for Zanzibar.

Answer the question clearly and briefly.

Question: ${question}

End your answer by asking if the investor would like to receive investment opportunities in Zanzibar.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a Zanzibar property investment expert." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();

  const answer = data.choices[0].message.content;

  res.status(200).json({ answer });

}
