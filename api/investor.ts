import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { question, leadData } = req.body;

    // --- STEP A: AI CHAT (Hapa ndipo 'Akili' ilipo) ---
    // Kama mtumiaji anauliza swali tu (Hajaza fomu)
    if (question && !leadData) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "Wewe ni mtaalamu wa uwekezaji Zanzibar (ZanziInvest). Jibu maswali kwa kina kuhusu ROI, ZIPA, na ardhi. Lengo ni kumvutia mteja awekeze. USITUME ujumbe wowote Telegram hapa." 
          },
          { role: "user", content: question }
        ],
      });

      const aiAnswer = completion.choices[0].message.content;
      
      // MUHIMU: Tunarudisha 'answer' tu, HATUTUMI Telegram hapa
      return res.status(200).json({ answer: aiAnswer });
    }

    // --- STEP B: LEAD CAPTURE (Hapa ndipo Telegram inaruhusiwa) ---
    // Inatokea TU kama 'leadData' ipo (Simu, Email, nk)
    if (leadData) {
      // 1. Tuma DigitalOcean (Background)
      fetch("http://104.248.41.165:5000/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      }).catch(() => console.log("DO server sync..."));

      // 2. Tuma Telegram Alert (Hii ndio SMS unayoitaka ikitokea Lead tu)
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `🔥 *New Qualified Lead!* \nEmail: ${leadData.email}\nBudget: ${leadData.budget}`,
          parse_mode: "Markdown"
        })
      });

      return res.status(200).json({ success: true });
    }

  } catch (error) {
    return res.status(200).json({ answer: "Mambo! Niko hapa kusaidia uwekezaji wako Zanzibar. Naomba uulize tena swali lako." });
  }
}
