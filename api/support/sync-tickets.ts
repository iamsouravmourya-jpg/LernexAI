import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireUser, setCors } from "../_lib/auth.js";

function escapeTelegramHtml(value: unknown) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res, req);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const authenticatedUser = await requireUser(req);
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const ticketIds: string[] = Array.isArray(body.ticketIds)
    ? body.ticketIds.map((id: unknown) => String(id).toUpperCase()).filter((id: string) => /^TKT-\d+$/.test(id))
    : [];

  if (ticketIds.length === 0) return res.status(200).json({ success: true, tickets: [] });

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  // Map to hold resolved/updated ticket states
  const ticketMap = new Map<string, any>();

  // 1. Check local JSON storage first (if available)
  try {
    const fs = await import("fs");
    const path = await import("path");
    const ticketsFile = path.join(process.cwd(), "data", "support_tickets.json");
    if (fs.existsSync(ticketsFile)) {
      const localTickets: any[] = JSON.parse(fs.readFileSync(ticketsFile, "utf-8"));
      for (const t of localTickets) {
        if (ticketIds.includes(String(t.id).toUpperCase())) {
          ticketMap.set(String(t.id).toUpperCase(), t);
        }
      }
    }
  } catch (err) {
    // Ignore in read-only environment
  }

  // 2. Poll recent Telegram updates to detect admin replies in real-time (works in serverless / Vercel too!)
  if (telegramToken) {
    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${telegramToken}/getUpdates?offset=-50&limit=50`);
      const tgData = await tgRes.json();

      if (tgData.ok && Array.isArray(tgData.result)) {
        for (const update of tgData.result) {
          const msg = update.message || update.edited_message;
          if (!msg) continue;

          const text = String(msg.text || msg.caption || "").trim();
          if (!text || text.startsWith("/")) continue;

          let targetTicketId: string | undefined;

          // A. Check reply_to_message for Ticket ID or message ID
          if (msg.reply_to_message) {
            const replyText = String(msg.reply_to_message.text || msg.reply_to_message.caption || "");
            const tktMatch = replyText.match(/\b(TKT-\d+)\b/i);
            if (tktMatch) {
              const matchedId = tktMatch[1].toUpperCase();
              if (ticketIds.includes(matchedId)) {
                targetTicketId = matchedId;
              }
            }
          }

          // B. Check direct message starting with TKT-xxxx
          if (!targetTicketId) {
            const directMatch = text.match(/^(?:\/reply\s+)?(TKT-\d+)[:\s\-]+(.+)/is);
            if (directMatch) {
              const matchedId = directMatch[1].toUpperCase();
              if (ticketIds.includes(matchedId)) {
                targetTicketId = matchedId;
              }
            }
          }

          // C. General mention of TKT-xxxx
          if (!targetTicketId) {
            const generalMatch = text.match(/\b(TKT-\d+)\b/i);
            if (generalMatch) {
              const matchedId = generalMatch[1].toUpperCase();
              if (ticketIds.includes(matchedId)) {
                targetTicketId = matchedId;
              }
            }
          }

          // If a reply to one of our tickets was found:
          if (targetTicketId) {
            let cleanReply = text.replace(/^(?:\/reply\s+)?(TKT-\d+)[:\s\-]+/is, "").trim();
            if (!cleanReply) cleanReply = text;

            const istTime = new Date(msg.date * 1000).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "medium",
              timeStyle: "short",
            });

            const existing = ticketMap.get(targetTicketId) || { id: targetTicketId };
            existing.status = "Resolved";
            existing.adminReply = cleanReply;
            existing.adminReplyTime = istTime;
            existing.adminName = msg.from?.first_name || "LernexAI Support Team";
            ticketMap.set(targetTicketId, existing);

            // Update Supabase in background
            if (supabaseUrl && serviceRoleKey) {
              try {
                await fetch(`${supabaseUrl}/rest/v1/support_tickets?id=eq.${targetTicketId}`, {
                  method: "PATCH",
                  headers: {
                    apikey: serviceRoleKey,
                    Authorization: `Bearer ${serviceRoleKey}`,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                  },
                  body: JSON.stringify({
                    status: "Resolved",
                    admin_reply: cleanReply,
                    admin_reply_time: new Date(msg.date * 1000).toISOString(),
                  }),
                });
              } catch (patchErr) {
                // Ignore
              }
            }

            // Update local file if available
            try {
              const fs = await import("fs");
              const path = await import("path");
              const ticketsFile = path.join(process.cwd(), "data", "support_tickets.json");
              if (fs.existsSync(ticketsFile)) {
                const list = JSON.parse(fs.readFileSync(ticketsFile, "utf-8"));
                const idx = list.findIndex((x: any) => x.id === targetTicketId);
                if (idx >= 0) {
                  list[idx].status = "Resolved";
                  list[idx].adminReply = cleanReply;
                  list[idx].adminReplyTime = istTime;
                  list[idx].adminName = msg.from?.first_name || "LernexAI Support Team";
                  fs.writeFileSync(ticketsFile, JSON.stringify(list, null, 2), "utf-8");
                }
              }
            } catch (fsErr) {
              // Ignore
            }
          }
        }
      }
    } catch (tgErr) {
      console.warn("[Sync Tickets] Telegram getUpdates check error:", tgErr);
    }
  }

  // 3. Query Supabase (if available and table exists)
  if (supabaseUrl && serviceRoleKey) {
    try {
      const query = ticketIds.map((id) => `"${id}"`).join(",");
      const filter = authenticatedUser?.id
        ? `user_id=eq.${authenticatedUser.id}&id=in.(${query})`
        : `id=in.(${query})`;

      const response = await fetch(`${supabaseUrl}/rest/v1/support_tickets?select=*&${filter}`, {
        headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` },
      });

      if (response.ok) {
        const dbTickets = await response.json();
        if (Array.isArray(dbTickets)) {
          for (const row of dbTickets) {
            const mapped = {
              id: row.id,
              category: row.category,
              subject: row.subject,
              message: row.message,
              priority: row.priority,
              status: row.status,
              createdAt: row.created_at ? new Date(row.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Recently",
              createdAtIso: row.created_at,
              userEmail: row.user_email,
              userName: row.user_name,
              userId: row.user_id,
              screenshot: row.screenshot,
              url: row.url,
              isSpam: row.is_spam,
              isGenuine: row.is_genuine,
              urgency: row.urgency,
              aiResponse: row.ai_response,
              recommendedAction: row.recommended_action,
              telegramSent: row.telegram_sent,
              telegramMessageId: row.telegram_message_id,
              adminReply: row.admin_reply,
              adminReplyTime: row.admin_reply_time ? new Date(row.admin_reply_time).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : undefined,
            };
            // Preserve or override
            const current = ticketMap.get(row.id);
            if (!current || (row.status === "Resolved" && row.admin_reply)) {
              ticketMap.set(row.id, mapped);
            }
          }
        }
      }
    } catch (dbErr) {
      console.warn("[Sync Tickets] Supabase query error:", dbErr);
    }
  }

  return res.status(200).json({
    success: true,
    tickets: Array.from(ticketMap.values()),
  });
}
