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
  const subjectText = String(subject).trim();
  const messageText = String(message).trim();
  const groqKeys = [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_1,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY_3,
    process.env.GROQ_API_KEY_4,
  ].map((key) => (key || "").trim()).filter((key) => key.startsWith("gsk_"));

  let isSpam = false;
  let isGenuine = true;
  let urgency = String(priority);
  let aiResponse = "Thank you for contacting Lernex AI Support. Our team will review your request and get back to you shortly.";
  let recommendedAction = "Review user query.";

  if (groqKeys.length > 0) {
    try {
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKeys[0]}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: "You triage LernexAI support tickets. Return only JSON with isSpam boolean, isGenuine boolean, urgency (low, normal, high, critical), autoReply string, and recommendedAction string. Mark greetings, gibberish, promotional spam, and messages without a real request as spam. Keep real course, account, payment, certificate, bug, and feedback requests genuine.",
            },
            {
              role: "user",
              content: `Category: ${category || "General"}\nPriority: ${priority}\nSubject: ${subjectText}\nMessage: ${messageText}`,
            },
          ],
        }),
      });
      const groqData = await groqResponse.json();
      const rawContent = groqData.choices?.[0]?.message?.content;
      const parsed = typeof rawContent === "string" ? JSON.parse(rawContent) : null;
      if (parsed && typeof parsed.isSpam === "boolean") isSpam = parsed.isSpam;
      if (parsed && typeof parsed.isGenuine === "boolean") isGenuine = parsed.isGenuine;
      if (parsed?.urgency) urgency = String(parsed.urgency);
      if (parsed?.autoReply) aiResponse = String(parsed.autoReply);
      if (parsed?.recommendedAction) recommendedAction = String(parsed.recommendedAction);
    } catch (error) {
      console.warn("[Support] Groq triage failed, using local filter:", error);
    }
  }

  if (!groqKeys.length || (!isSpam && isGenuine && aiResponse.startsWith("Thank you for contacting"))) {
    const compactText = `${subjectText} ${messageText}`.toLowerCase().trim();
    if (compactText.length < 5 || /^(hi|hello|hey|test|testing|asdf|kya hai)$/i.test(compactText)) {
      isSpam = true;
      isGenuine = false;
      aiResponse = "Hello! Please share specific details about your issue so our support team can help you.";
      recommendedAction = "Ask the learner for specific issue details.";
    }
  }

  const ticketStatus = isSpam ? "Auto-Resolved" : "Under Review";
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
  let telegramSent = false;
  let telegramMessageId: number | undefined;

  if (isGenuine && telegramToken && telegramChatId) {
    const telegramText = [
      "🚨 NEW SUPPORT TICKET 🚨",
      `Ticket ID: ${id}`,
      `User: ${userName || "Learner"}${userEmail ? ` (${userEmail})` : ""}`,
      `Category: ${category || "General"}`,
      `Priority: ${String(priority).toUpperCase()}`,
      `Subject: ${subjectText}`,
      `Message: ${messageText}`,
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
      subject: subjectText,
      message: messageText,
      priority,
      status: ticketStatus,
      createdAt: "Just now",
      createdAtIso: new Date().toISOString(),
      userEmail,
      userName,
      userId,
      screenshot,
      url,
      isSpam,
      isGenuine,
      urgency,
      aiResponse,
      recommendedAction,
      telegramSent,
      telegramMessageId,
    },
  });
}
