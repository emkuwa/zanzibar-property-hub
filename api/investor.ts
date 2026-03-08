import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  try {
    const { question, leadData } = request.body;

    // A. CHAT LOGIC - Hapa AI inajibu bila kutuma Telegram
    if (question && !leadData) {
      const knowledge: Record<string, string> = {
        "can i buy land in zanzibar?": "Yes, foreigners can acquire land through a 99-year lease under ZIPA regulations.",
        "is zanzibar a good place to buy property?": "Absolutely! With tourism growth, areas like Paje and Nungwi offer ROI between 10-15%.",
        "what is the average roi for villas?": "Typically, well-managed villas see a net ROI of 8-12% annually."
      };

      const answer = knowledge[question.toLowerCase()] || 
                     "That's an interesting question about Zanzibar. Our investment experts can give you a detailed breakdown on that.";
      
      return response.status(200).json({ answer });
    }

    // B. DATABASE & TELEGRAM ALERT (Hii inatokea tu Lead ikipatikana)
    if (leadData) {
      // 1. Tuma data DigitalOcean kwanza
      const dropletRes = await fetch("http://104.248.41.165:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });

      if (dropletRes.ok) {
        // 2. IKIWA IMEFANIKIWA KWENYE DB, NDIPO TUMA TELEGRAM
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const message = `🔥 *New Qualified Lead Saved!* \n\n👤 Name: ${leadData.name || 'N/A'}\n📧 Email: ${leadData.email}\n💰 Budget: ${leadData.budget || 'N/A'}\n📱 Phone: ${leadData.phone || 'N/A'}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
          })
        });

        return response.status(200).json({ success: true, message: "Lead stored and alert sent." });
      }
    }

  } catch (error) {
    return response.status(500).json({ error: 'System busy, please try again.' });
  }
}
