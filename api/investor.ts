import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, leadData } = request.body;

    // 1. KAMA NI CHAT YA KAWAIDA
    if (question && !leadData) {
      const answers: Record<string, any> = {
        "Is Zanzibar a good place to buy property?": {
          answer: "Zanzibar has seen a 15% increase in property values over the last year. It's a prime market for vacation rentals.",
          suggestions: ["Best areas for ROI", "Legal process"]
        },
        "Which areas have the best rental returns?": {
          answer: "Paje and Nungwi are currently top-tier for rental returns, often exceeding 10% net ROI.",
          suggestions: ["See Paje listings", "Calculate ROI"]
        }
      };

      const result = answers[question] || {
        answer: "That's a great question! For detailed investment analysis, feel free to leave your contact details.",
        suggestions: ["Contact Specialist", "View Properties"]
      };

      // MUHIMU: Hapa HATUTUMI Telegram. Tunarudisha jibu kwa AI pekee.
      return response.status(200).json(result);
    }

    // 2. KAMA AI IMEPATA "LEAD DATA" (Mtumiaji amequalify)
    if (leadData) {
      // HAPA NDIPO UNAPOWEKA KODI YA KUHIFADHI KWENYE DATABASE
      console.log("Saving qualified lead to database:", leadData);

      // Tunarudisha jibu la shukrani bila kutuma Telegram kwa sasa
      return response.status(200).json({ 
        success: true, 
        message: "Lead qualified and saved to database." 
      });
    }

  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' });
  }
}
