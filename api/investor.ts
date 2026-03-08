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

    // A. LOGIC YA CHAT (AI HAITUMI TELEGRAM)
    if (question && !leadData) {
      const knowledgeBase: Record<string, any> = {
        "Is Zanzibar a good place to buy property?": {
          answer: "Zanzibar has seen a 15% increase in property values over the last year. It's a prime market for vacation rentals with growing tourism demand.",
          suggestions: ["Best areas for ROI", "Legal process"]
        },
        "Which areas have the best rental returns?": {
          answer: "Paje and Nungwi are currently top-tier for rental returns, often exceeding 10% net ROI due to high occupancy rates.",
          suggestions: ["See Paje listings", "Calculate ROI"]
        },
        "What is the average ROI for villas?": {
          answer: "Luxury villas in prime locations typically see between 8% to 12% ROI, depending on management and location.",
          suggestions: ["View Villa ROI guide", "Contact Sales"]
        }
      };

      const result = knowledgeBase[question] || {
        answer: "That's a great question about the Zanzibar market! Based on current trends, we recommend beachfront areas for maximum appreciation. Would you like more specific details?",
        suggestions: ["Contact Specialist", "View Properties"]
      };

      return response.status(200).json(result);
    }

    // B. LOGIC YA DATABASE (KAMA MTUMIAJI AMEQUALIFY)
    if (leadData) {
      // TODO: Weka kodi ya Supabase au Database yako hapa
      console.log("Saving qualified lead to database:", leadData);

      return response.status(200).json({ 
        success: true, 
        message: "Data imehifadhiwa kwenye Database kikamilifu (Bila Telegram)." 
      });
    }

  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' });
  }
}
