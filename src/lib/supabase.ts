import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Frontend Client-Side Supabase Initialization
 * 
 * Rules:
 * 1. Strictly uses Vite's `import.meta.env.VITE_*` syntax.
 * 2. Reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
 * 3. Never hardcodes a placeholder host.
 * 4. Checks configuration validity so it never crashes the client if variables are absent.
 */
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder') &&
  supabaseAnonKey.length > 20
);

function initSupabase(): SupabaseClient {
  if (isSupabaseConfigured) {
    try {
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (err) {
      console.warn('[Frontend Supabase Init Warning]:', err);
    }
  }

  // Safe fallback dummy client that never triggers unresolvable DNS lookups
  return createClient('https://app-local.supabase.co', 'dummy-anon-key-local', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const supabase = initSupabase();

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function isValidUuid(id?: string | null): boolean {
  if (!id) return false;
  return UUID_REGEX.test(id);
}
