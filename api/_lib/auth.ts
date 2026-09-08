import type { VercelRequest } from "@vercel/node";
import { createClient, type User } from "@supabase/supabase-js";

export async function requireUser(req: VercelRequest): Promise<User | null> {
  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) return null;

  const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
  const anonKey = (process.env.VITE_SUPABASE_ANON_KEY || "").trim();
  if (!url || !anonKey) return null;

  const client = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.getUser(authorization.slice(7));
  return error ? null : data.user;
}

export function setCors(res: { setHeader: (name: string, value: string) => void }) {
  const origin = process.env.APP_URL || process.env.VITE_APP_URL || "";
  res.setHeader("Access-Control-Allow-Origin", origin || "https://www.lernexai.site");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Vary", "Origin");
}
