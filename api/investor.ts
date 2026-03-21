import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Fallback ya AI upande wa server – sawa na ile ya frontend
function getFallbackAnswer(question: string): string {
  const q = (question || "").toLowerCase();
  if (/\b(foreign|buy|purchase|own|ownership|land)\b/.test(q)) {
    return "Yes, foreign investors can participate in Zanzibar real estate through ZIPA-approved structures. Most land is on long-term lease (33–99 years). The safest route is to work with a ZIPA-compliant developer or structure.";
  }
  if (q.includes("paje")) {
    return "Paje is one of Zanzibar’s strongest villa and beachfront investment locations, driven by kitesurf tourism. Typical entry budgets range from ~100k–700k USD depending on distance to the beach and size.";
  }
  if (q.includes("nungwi")) {
    return "Nungwi is a prime tourism hub in the north with strong nightly rates for hotels and villas. Well-positioned properties can target 8–15% gross ROI depending on occupancy and pricing.";
  }
  if (q.includes("jambiani")) {
    return "Jambiani is growing fast for boutique villas and guesthouses. Investors often focus on seafront or second-row plots with strong holiday-rental demand.";
  }
  if (/\b(roi|return)\b/.test(q)) {
    return "For well-managed holiday rentals and boutique hotels, investors in Zanzibar often target 8–15% annual gross ROI. Exact numbers depend on area, property type, leverage and occupancy.";
  }
  if (/\b(budget|pesa|cost|price)\b/.test(q)) {
    return "Entry budgets roughly start from 50k–100k USD for smaller apartments, 100k–700k USD for villas, and 700k+ USD for larger beachfront or hotel projects.";
  }
  if (/\b(jambo|hello|hi)\b/.test(q)) {
    return "Karibu ZanziInvest. I can help you compare areas, budgets, ROI ranges and the right property type for your goals.";
  }
  return "Zanzibar offers strong tourism-driven demand for villas, apartments and hotels. The right area, budget and structure depend on your goals and risk profile. Share your budget and preferred area and we can match you with concrete opportunities.";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { question, leadData } = req.body || {};

  // --- STEP A: AI CHAT (Hapa ndipo 'Akili' ilipo) ---
  if (question && !leadData) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Wewe ni mtaalamu wa uwekezaji wa real estate Zanzibar (ZanziInvest). Elezea kwa kina kuhusu maeneo (Paje, Nungwi, Jambiani nk), ROI, ZIPA, aina ya umiliki na hatari. Lengo ni kumsaidia mwekezaji afanye uamuzi unaomfaa. Usitume ujumbe wowote kuhusu Telegram au mambo ya ndani ya mfumo."
          },
          { role: "user", content: question as string }
        ]
      });

      const aiAnswer = completion.choices[0]?.message?.content || getFallbackAnswer(question);
      return res.status(200).json({ answer: aiAnswer });
    } catch (error) {
      // Kama OpenAI au env vars zina shida, tumia fallback ya ndani
      return res.status(200).json({ answer: getFallbackAnswer(question) });
    }
  }

  // --- STEP B: LEAD CAPTURE (Hapa ndipo Telegram inaruhusiwa) ---
  if (leadData) {
    try {
      // 1. Tuma DigitalOcean (Background)
      // Server-side only (no mixed-content); Flask listens on 5051. Override with FLASK_LEAD_URL if needed.
      fetch(process.env.FLASK_LEAD_URL || "http://104.248.41.165:5051/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      }).catch(() => console.log("DO server sync..."));

      // 2. Tuma Telegram Alert (Hii ndio SMS unayoitaka ikitokea Lead tu)
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `🔥 *New Qualified Lead!* \nEmail: ${leadData.email}\nBudget: ${leadData.budget}`,
            parse_mode: "Markdown"
          })
        });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Lead capture failed" });
    }
  }

  // Ikiwa hakuna question wala leadData
  return res.status(400).json({ message: "Invalid payload" });
}
