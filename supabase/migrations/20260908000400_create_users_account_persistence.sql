-- ==============================================================================
-- Migration: Complete User Account Persistence & RLS Repair
-- Description: Ensures public.users table exists with all fields, enables RLS with
--              proper SELECT, INSERT, and UPDATE policies, and equips the auth trigger
--              to persist profile metadata (first_name, last_name, phone, avatar).
-- ==============================================================================

-- 1. Create table public.users if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL DEFAULT '',
  state TEXT NOT NULL DEFAULT '',
  avatar_url TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'student',
  plan_type TEXT NOT NULL DEFAULT 'free',
  pro_valid_until TIMESTAMPTZ,
  daily_chat_limit INTEGER NOT NULL DEFAULT 10,
  chats_used_today INTEGER NOT NULL DEFAULT 0,
  last_chat_date DATE NOT NULL DEFAULT CURRENT_DATE,
  extra_credits INTEGER NOT NULL DEFAULT 0,
  ai_courses_created_this_month INTEGER NOT NULL DEFAULT 0,
  ai_courses_month_start DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Add columns if table already exists
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS first_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS last_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS state TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS avatar_url TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student',
  ADD COLUMN IF NOT EXISTS plan_type TEXT NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS pro_valid_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS daily_chat_limit INTEGER NOT NULL DEFAULT 10,
  ADD COLUMN IF NOT EXISTS chats_used_today INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_chat_date DATE NOT NULL DEFAULT CURRENT_DATE,
  ADD COLUMN IF NOT EXISTS extra_credits INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_courses_created_this_month INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_courses_month_start DATE NOT NULL DEFAULT CURRENT_DATE,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Clean up & Create RLS Policies for public.users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own profile or public details" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Service role can manage all profiles" ON public.users;
CREATE POLICY "Service role can manage all profiles" ON public.users
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 5. Trigger Function: Automatically populate public.users with metadata from auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_first_name TEXT;
  v_last_name TEXT;
  v_phone TEXT;
  v_avatar_url TEXT;
  v_plan_type TEXT;
  v_full_name TEXT;
BEGIN
  v_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', '');
  v_last_name := COALESCE(NEW.raw_user_meta_data->>'last_name', '');
  v_phone := COALESCE(NEW.raw_user_meta_data->>'phone', '');
  v_avatar_url := COALESCE(NEW.raw_user_meta_data->>'avatar_url', '');
  v_plan_type := COALESCE(NEW.raw_user_meta_data->>'plan_type', 'free');
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '');

  IF v_first_name = '' AND v_full_name <> '' THEN
    v_first_name := split_part(v_full_name, ' ', 1);
    v_last_name := substr(v_full_name, length(v_first_name) + 2);
  END IF;

  INSERT INTO public.users (
    id,
    email,
    first_name,
    last_name,
    phone,
    avatar_url,
    plan_type,
    role,
    daily_chat_limit,
    chats_used_today,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    v_first_name,
    v_last_name,
    v_phone,
    v_avatar_url,
    v_plan_type,
    'student',
    10,
    0,
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = CASE WHEN EXCLUDED.first_name <> '' THEN EXCLUDED.first_name ELSE public.users.first_name END,
    last_name = CASE WHEN EXCLUDED.last_name <> '' THEN EXCLUDED.last_name ELSE public.users.last_name END,
    phone = CASE WHEN EXCLUDED.phone <> '' THEN EXCLUDED.phone ELSE public.users.phone END,
    avatar_url = CASE WHEN EXCLUDED.avatar_url <> '' THEN EXCLUDED.avatar_url ELSE public.users.avatar_url END,
    updated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$;

-- 6. Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 7. Backfill any existing auth.users into public.users
INSERT INTO public.users (
  id,
  email,
  first_name,
  last_name,
  phone,
  avatar_url,
  plan_type,
  role,
  created_at,
  updated_at
)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'first_name', split_part(COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''), ' ', 1)),
  COALESCE(u.raw_user_meta_data->>'last_name', substr(COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''), length(split_part(COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''), ' ', 1)) + 2)),
  COALESCE(u.raw_user_meta_data->>'phone', ''),
  COALESCE(u.raw_user_meta_data->>'avatar_url', ''),
  COALESCE(u.raw_user_meta_data->>'plan_type', 'free'),
  'student',
  u.created_at,
  timezone('utc'::text, now())
FROM auth.users u
ON CONFLICT (id) DO NOTHING;
