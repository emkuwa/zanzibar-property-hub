import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { question, leadData } = req.body;

    // A. CHAT LOGIC (OpenAI inajibu hapa)
    if (question && !leadData) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a Zanzibar real estate expert. Be professional and helpful." },
          { role: "user", content: question }
        ],
      });

      return res.status(200).json({ answer: completion.choices[0].message.content });
    }

    // B. LEAD LOGIC (Hifadhi DB na Tuma Telegram)
    if (leadData) {
      // 1. Tuma DigitalOcean
      await fetch("http://104.248.41.165:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });

      // 2. Tuma Telegram Alert (Hii ndio SMS yako)
      const message = `✅ *New Lead Captured!*\n\n📧 Email: ${leadData.email}\n📱 Simu: ${leadData.phone || 'N/A'}`;
      
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown"
        })
      });

      return res.status(200).json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ answer: "AI is currently resting. Try again!" });
  }
}
