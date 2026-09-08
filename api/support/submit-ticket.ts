import type { VercelRequest, VercelResponse } from "@vercel/node";

function setCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const { ticketId, category, subject, message, priority = "normal", userEmail, userName, userId, screenshot, url } = body;

  if (!String(subject || "").trim() || !String(message || "").trim()) {
    return res.status(400).json({ error: "Subject and message are required" });
  }

  const id = ticketId || `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
  let telegramSent = false;
  let telegramMessageId: number | undefined;

  if (telegramToken && telegramChatId) {
    const telegramText = [
      "🚨 NEW SUPPORT TICKET 🚨",
      `Ticket ID: ${id}`,
      `User: ${userName || "Learner"}${userEmail ? ` (${userEmail})` : ""}`,
      `Category: ${category || "General"}`,
      `Priority: ${String(priority).toUpperCase()}`,
      `Subject: ${subject}`,
      `Message: ${message}`,
      url ? `URL: ${url}` : "",
      "Reply to this message to respond to the learner.",
    ].filter(Boolean).join("\n\n");

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: telegramText }),
      });
      const telegramData = await telegramResponse.json();
      telegramSent = Boolean(telegramData.ok);
      telegramMessageId = telegramData.result?.message_id;
    } catch (error) {
      console.warn("[Support] Telegram notification failed:", error);
    }
  }

  return res.status(200).json({
    success: true,
    ticket: {
      id,
      category: category || "General",
      subject: String(subject).trim(),
      message: String(message).trim(),
      priority,
      status: "Under Review",
      createdAt: "Just now",
      createdAtIso: new Date().toISOString(),
      userEmail,
      userName,
      userId,
      screenshot,
      url,
      isSpam: false,
      isGenuine: true,
      urgency: priority,
      aiResponse: "Thank you for contacting Lernex AI Support. Our team will review your request and get back to you shortly.",
      recommendedAction: "Review user query.",
      telegramSent,
      telegramMessageId,
    },
  });
}
