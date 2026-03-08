import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  try {
    const { question, leadData } = request.body;

    // A. CHAT LOGIC (AI Pekee - Haina Telegram hapa)
    if (question && !leadData) {
      const db: Record<string, any> = {
        "can i buy land in zanzibar?": {
          answer: "Yes, foreigners can buy land in Zanzibar through long-term leases (up to 99 years) under the ZIPA regulations.",
          suggestions: ["View investment laws", "Available land plots"]
        },
        "Is Zanzibar a good place to buy property?": {
          answer: "Absolutely. Zanzibar offers high rental yields (up to 12% ROI) and rapidly appreciating land values.",
          suggestions: ["ROI Calculator", "Best areas"]
        }
      };

      const reply = db[question.toLowerCase()] || {
        answer: "Zanzibar is a great market! For specific details on " + question + ", I recommend speaking with our local legal team.",
        suggestions: ["Contact Specialist", "Browse Listings"]
      };

      return response.status(200).json(reply);
    }

    // B. DATABASE LOGIC (Lead Qualification)
    if (leadData) {
      // Hapa ndipo unapo-save kwenye Database (Supabase nk)
      console.log("Saving lead to DB...", leadData);
      return response.status(200).json({ success: true, message: "Lead saved to DB" });
    }

  } catch (error) {
    return response.status(500).json({ error: 'Server error' });
  }
}
