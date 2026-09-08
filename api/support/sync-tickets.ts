import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const ticketIds = Array.isArray(body.ticketIds) ? body.ticketIds.map((id: unknown) => String(id).toUpperCase()) : [];
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
  if (!telegramToken || ticketIds.length === 0) return res.status(200).json({ success: true, tickets: [] });

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/getUpdates?offset=0&limit=100`);
    const telegramData = await telegramResponse.json();
    const tickets = new Map<string, Record<string, unknown>>();

    for (const update of telegramData.result || []) {
      const message = update.message;
      const text = String(message?.text || "").trim();
      if (!text) continue;

      let ticketId: string | undefined;
      const replyText = String(message?.reply_to_message?.text || "");
      const replyMatch = replyText.match(/Ticket ID:\s*`?(TKT-\d+)`?/i);
      const directMatch = text.match(/\b(TKT-\d+)\s*:\s*(.+)/is);
      if (replyMatch) ticketId = replyMatch[1].toUpperCase();
      else if (directMatch) ticketId = directMatch[1].toUpperCase();
      if (!ticketId || !ticketIds.includes(ticketId)) continue;

      const reply = directMatch ? directMatch[2].trim() : text;
      tickets.set(ticketId, {
        id: ticketId,
        adminReply: reply,
        adminReplyTime: new Date((message.date || Math.floor(Date.now() / 1000)) * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Resolved",
      });
    }

    return res.status(200).json({ success: true, tickets: Array.from(tickets.values()) });
  } catch (error) {
    console.warn("[Support] Telegram sync failed:", error);
    return res.status(200).json({ success: true, tickets: [] });
  }
}
