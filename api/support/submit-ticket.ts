import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireUser, setCors } from "../_lib/auth.js";

function escapeTelegramHtml(value: unknown) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const authenticatedUser = await requireUser(req);
  if (!authenticatedUser) return res.status(401).json({ error: "Authentication required" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const { ticketId, category, subject, message, priority = "normal", screenshot, url } = body;
  const userEmail = authenticatedUser.email;
  const userName = authenticatedUser.user_metadata?.full_name || authenticatedUser.email?.split("@")[0] || "Learner";
  const userId = authenticatedUser.id;

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
  const looksLikeGibberish = (value: string) => {
    const normalized = value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
    const words = normalized.split(" ").filter(Boolean);
    if (!normalized || normalized.length < 5) return true;
    if (words.length === 1 && words[0].length <= 4) return true;
    if (words.length === 1 && !/[aeiou]/.test(words[0]) && words[0].length <= 8) return true;
    return /^(hi|hello|hey|test|testing|asdf|qwerty|hhdg|kya hai)$/i.test(normalized);
  };

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

  if (looksLikeGibberish(`${subjectText} ${messageText}`)) {
    isSpam = true;
    isGenuine = false;
    aiResponse = "Hello! Please share specific details about your issue so our support team can help you.";
    recommendedAction = "Ask the learner for specific issue details.";
  }

  const ticketStatus = isSpam ? "Auto-Resolved" : "Under Review";
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
  let telegramSent = false;
  let telegramMessageId: number | undefined;

  if (isGenuine && telegramToken && telegramChatId) {
    const priorityLabel = String(priority).toLowerCase() === "urgent" || String(priority).toLowerCase() === "high" ? "🔴" : "🟡";
    const telegramText = [
      "🛟 <b>LERNEX AI SUPPORT DESK</b>",
      "<i>New learner request requires review</i>",
      "━━━━━━━━━━━━━━━━━━━━",
      `<b>Ticket</b>  <code>${escapeTelegramHtml(id)}</code>`,
      `<b>Received</b>  ${escapeTelegramHtml(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }))}`,
      `<b>Category</b>  ${escapeTelegramHtml(category || "General")}`,
      `${priorityLabel} <b>Priority</b>  ${escapeTelegramHtml(String(priority).toUpperCase())}`,
      "",
      `<b>From</b>  ${escapeTelegramHtml(userName || "Learner")}${userEmail ? `\n<b>Email</b>  ${escapeTelegramHtml(userEmail)}` : ""}`,
      `<b>Subject</b>  ${escapeTelegramHtml(subjectText)}`,
      "",
      "<b>Message</b>",
      `<blockquote>${escapeTelegramHtml(messageText)}</blockquote>`,
      url ? `<b>Page</b>  ${escapeTelegramHtml(url)}` : "",
      screenshot ? "📎 <i>Screenshot attached in the ticket</i>" : "",
      "",
      `<b>AI recommendation</b>  ${escapeTelegramHtml(recommendedAction)}`,
      "━━━━━━━━━━━━━━━━━━━━",
      `<i>Reply to this message, or send:</i> <code>${escapeTelegramHtml(id)}: your reply</code>`,
    ].filter(Boolean).join("\n");

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: telegramText, parse_mode: "HTML" }),
      });
      const telegramData = await telegramResponse.json();
      telegramSent = Boolean(telegramData.ok);
      telegramMessageId = telegramData.result?.message_id;
    } catch (error) {
      console.warn("[Support] Telegram notification failed:", error);
    }
  }

  const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (supabaseUrl && serviceRoleKey) {
    const saveResponse = await fetch(`${supabaseUrl}/rest/v1/support_tickets`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ id, user_id: userId, user_email: userEmail, user_name: userName, category, subject: subjectText, message: messageText, priority, status: ticketStatus, is_spam: isSpam, is_genuine: isGenuine, urgency, ai_response: aiResponse, recommended_action: recommendedAction, telegram_sent: telegramSent, telegram_message_id: telegramMessageId, screenshot, url }),
    });
    if (!saveResponse.ok) console.error("[Support] Ticket persistence failed:", saveResponse.status);
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
      createdAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
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
