import type { VercelRequest } from "@vercel/node";
import type { User } from "@supabase/supabase-js";

export async function requireUser(req: VercelRequest): Promise<User | null> {
  try {
    const authorization = Array.isArray(req.headers.authorization)
      ? req.headers.authorization[0] || ""
      : req.headers.authorization || "";
    if (!authorization.startsWith("Bearer ")) return null;

    const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
    const anonKey = (process.env.VITE_SUPABASE_ANON_KEY || "").trim();
    if (!url || !anonKey) return null;

    const response = await fetch(`${url}/auth/v1/user`, {
      headers: {
        apikey: anonKey,
        Authorization: authorization,
      },
    });
    if (!response.ok) return null;
    return await response.json() as User;
  } catch (error) {
    console.error("[Auth] Supabase token validation failed:", error);
    return null;
  }
}

export function setCors(res: { setHeader: (name: string, value: string) => void }) {
  const origin = process.env.APP_URL || process.env.VITE_APP_URL || "";
  res.setHeader("Access-Control-Allow-Origin", origin || "https://www.lernexai.site");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Vary", "Origin");
}
