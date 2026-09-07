-- Repair the auth signup profile trigger for the public.users schema.
-- Run this migration in the Supabase SQL Editor or with Supabase migrations.

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

UPDATE public.users AS profile
SET
  email = COALESCE(NULLIF(profile.email, ''), auth_user.email),
  first_name = COALESCE(profile.first_name, ''),
  last_name = COALESCE(profile.last_name, ''),
  phone = COALESCE(profile.phone, ''),
  state = COALESCE(profile.state, ''),
  avatar_url = COALESCE(profile.avatar_url, ''),
  role = COALESCE(profile.role, 'student'),
  plan_type = COALESCE(profile.plan_type, 'free'),
  daily_chat_limit = COALESCE(profile.daily_chat_limit, 10),
  chats_used_today = COALESCE(profile.chats_used_today, 0),
  last_chat_date = COALESCE(profile.last_chat_date, CURRENT_DATE),
  extra_credits = COALESCE(profile.extra_credits, 0),
  ai_courses_created_this_month = COALESCE(profile.ai_courses_created_this_month, 0),
  ai_courses_month_start = COALESCE(profile.ai_courses_month_start, CURRENT_DATE),
  updated_at = timezone('utc'::text, now())
FROM auth.users AS auth_user
WHERE profile.id = auth_user.id;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
