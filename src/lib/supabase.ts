import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Dynamically resolve environment variables for both Vite client and Node/Vercel runtimes
const getEnvVar = (key: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return String(import.meta.env[key]).trim();
    }
  } catch {}

  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return String(process.env[key]).trim();
    }
  } catch {}

  return '';
};

const supabaseUrl = (getEnvVar('VITE_SUPABASE_URL') || getEnvVar('SUPABASE_URL')).trim();
const supabaseAnonKey = (getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('SUPABASE_ANON_KEY')).trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('placeholder') && 
  !supabaseUrl.includes('example.supabase.co') &&
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
        },
      });
    } catch (err) {
      console.warn('[Supabase Config Error]: Unable to initialize Supabase client:', err);
    }
  }

  // Safe dummy client to prevent unhandled exception or unresolvable DNS queries
  return createClient('https://app-local.supabase.co', 'dummy-anon-key-local', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const supabase = initSupabase();

