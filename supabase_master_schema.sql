-- =========================================================
-- LERNEX AI MASTER SUPABASE SQL SCHEMA
-- Execute this SQL script in Supabase SQL Editor
-- =========================================================

-- 1. Create Profiles / Users Extension Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    plan TEXT DEFAULT 'free', -- 'free' or 'pro'
    pro_expires_at TIMESTAMPTZ,
    ai_credits_balance INTEGER DEFAULT 15,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Transactions Table (For Razorpay Payments)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'success', 'failed'
    item_type TEXT NOT NULL, -- 'pro_upgrade', 'credits', 'certificate'
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    certificate_code TEXT UNIQUE,
    status TEXT DEFAULT 'issued', -- 'issued', 'pending'
    payment_id TEXT,
    issued_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create User Credits Table
CREATE TABLE IF NOT EXISTS public.user_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE,
    credits INTEGER DEFAULT 15,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) & Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Permissive policies for read & write
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users read own transactions" ON public.transactions FOR SELECT USING (true);
CREATE POLICY "Public insert transactions" ON public.transactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public insert certificates" ON public.certificates FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read credits" ON public.user_credits FOR SELECT USING (true);
CREATE POLICY "Public update credits" ON public.user_credits FOR ALL USING (true);
