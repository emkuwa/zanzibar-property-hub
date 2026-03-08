import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = request.body;

    if (!question) {
      return response.status(400).json({ error: 'Question is required' });
    }

    // Hapa unaweza kuweka OpenAI API key yako au majibu ya haraka (mock responses)
    // Kwa sasa, tunatoa majibu ya mfano ili build ipite na AI ifanye kazi
    const answers: Record<string, any> = {
      "Is Zanzibar a good place to buy property?": {
        answer: "Yes, Zanzibar is experiencing a tourism boom, making it excellent for holiday home rentals and capital appreciation.",
        suggestions: ["Best areas for villas", "Legal requirements for foreigners"]
      },
      "Which areas have the best rental returns?": {
        answer: "Nungwi, Paje, and Kiwengwa are currently leading in rental yields due to high tourist demand.",
        suggestions: ["Average nightly rates", "Property management tips"]
      },
      "What is the average ROI for villas?": {
        answer: "Well-managed villas in prime spots like Paje can see an ROI of 8% to 12% annually.",
        suggestions: ["Calculate my ROI", "View available villas"]
      }
    };

    const defaultAnswer = {
      answer: "That's a great question about the Zanzibar market! For specific details, it's best to consult with our local investment experts.",
      suggestions: ["Talk to an agent", "View property listings"]
    };

    const result = answers[question] || defaultAnswer;

    return response.status(200).json(result);

  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' });
  }
}
