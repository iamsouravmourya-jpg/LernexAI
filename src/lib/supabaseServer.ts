import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Serverless Backend Supabase Admin Client
 * 
 * Rules:
 * 1. Strictly uses `process.env` (Node.js runtime).
 * 2. Uses `process.env.SUPABASE_SERVICE_ROLE_KEY` (secret key without VITE_ prefix)
 *    and `process.env.VITE_SUPABASE_URL` (or `process.env.SUPABASE_URL`).
 * 3. Never uses hardcoded 'example.supabase.co' or placeholder values.
 * 4. Fails safely and gracefully if variables are missing during build or runtime.
 */
export function getBackendSupabaseAdmin(): SupabaseClient | null {
  const supabaseUrl = (
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ''
  ).trim();

  const serviceRoleKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    ''
  ).trim();

  const isValidUrl =
    Boolean(supabaseUrl) &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('example.supabase.co') &&
    !supabaseUrl.includes('placeholder');

  const isValidKey =
    Boolean(serviceRoleKey) &&
    !serviceRoleKey.includes('placeholder') &&
    serviceRoleKey.length > 20;

  if (!isValidUrl || !isValidKey) {
    console.warn('[Backend Supabase] Missing or invalid credentials. Skipping database write.');
    return null;
  }

  try {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (error) {
    console.error('[Backend Supabase Client Init Error]:', error);
    return null;
  }
}
