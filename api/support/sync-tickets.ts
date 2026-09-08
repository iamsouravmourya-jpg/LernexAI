import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireUser, setCors } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const authenticatedUser = await requireUser(req);
  if (!authenticatedUser) return res.status(401).json({ error: "Authentication required" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const ticketIds = Array.isArray(body.ticketIds)
    ? body.ticketIds.map((id: unknown) => String(id).toUpperCase()).filter((id: string) => /^TKT-\d+$/.test(id))
    : [];
  if (ticketIds.length === 0) return res.status(200).json({ success: true, tickets: [] });

  const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!supabaseUrl || !serviceRoleKey) return res.status(200).json({ success: true, tickets: [] });

  const query = ticketIds.map((id) => `"${id}"`).join(",");
  const response = await fetch(`${supabaseUrl}/rest/v1/support_tickets?select=*&user_id=eq.${authenticatedUser.id}&id=in.(${query})`, {
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` },
  });
  if (!response.ok) return res.status(502).json({ error: "Unable to sync support tickets" });

  return res.status(200).json({ success: true, tickets: await response.json() });
}
