import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  try {
    const { question, leadData } = request.body;

    // A. KAMA NI CHAT YA KAWAIDA (Tumia OpenAI kujibu)
    if (question && !leadData) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a Zanzibar real estate expert. Answer questions about property investment in Zanzibar concisely." },
          { role: "user", content: question }
        ],
      });

      const answer = completion.choices[0].message.content;
      return response.status(200).json({ answer });
    }

    // B. KAMA NI LEAD DATA (Hifadhi DB na tumia Telegram)
    if (leadData) {
      // 1. Tuma DigitalOcean (Kama ulivyoseti)
      await fetch("http://104.248.41.165:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });

      // 2. Tuma Telegram Alert
      const message = `🚀 *New Lead on ZanziInvest!* \n\n📧 Email: ${leadData.email}\n📱 Phone: ${leadData.phone || 'N/A'}`;
      
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown"
        })
      });

      return response.status(200).json({ success: true });
    }
  } catch (error) {
    return response.status(500).json({ error: "System busy" });
  }
}
