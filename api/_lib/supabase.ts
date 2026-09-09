import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function getBackendSupabaseAdmin(): SupabaseClient | null {
  const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!url || !url.startsWith("http") || !serviceRoleKey || serviceRoleKey.length < 20) {
    console.error("[Supabase Admin] Missing server credentials");
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
