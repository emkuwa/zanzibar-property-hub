import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { question, leadData } = req.body;

    // --- SEHEMU YA 1: AI CHAT (OpenAI) ---
    // Hii inafanya kazi mteja anapouliza swali la kawaida
    if (question && !leadData) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "Wewe ni mtaalamu wa uwekezaji Zanzibar (ZanziInvest). Jibu maswali kuhusu ROI, ardhi (ZIPA), na maeneo kama Paje/Nungwi. Lengo lako ni kumsaidia investor na kumvutia ajaze fomu ya uwekezaji. Usionyeshe listings za nyumba, bali elezea fursa za uwekezaji." 
          },
          { role: "user", content: question }
        ],
        temperature: 0.7,
      });

      const aiAnswer = completion.choices[0].message.content;
      return res.status(200).json({ answer: aiAnswer });
    }

    // --- SEHEMU YA 2: LEAD CAPTURE (DigitalOcean & Telegram) ---
    // Hii inatokea TU mteja akijaza fomu au akituma info zake
    if (leadData) {
      // 1. Hifadhi kwenye Database ya DigitalOcean (Background task)
      fetch("http://104.248.41.165:5000/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      }).catch(err => console.error("DigitalOcean sync failed"));

      // 2. Tuma Telegram Alert kwa Admin
      const telegramMsg = `🚀 *New Investor Lead!*\n\n📧 Email: ${leadData.email}\n💰 Budget: ${leadData.budget}\n🌍 Country: ${leadData.country}`;
      
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMsg,
          parse_mode: "Markdown"
        })
      });

      return res.status(200).json({ success: true, message: "Lead captured successfully" });
    }

  } catch (error: any) {
    console.error("Error:", error.message);
    return res.status(200).json({ 
      answer: "Samahani, kwa sasa ninafanya uchambuzi wa soko la Zanzibar. Naomba uulize tena baada ya sekunde chache." 
    });
  }
}
