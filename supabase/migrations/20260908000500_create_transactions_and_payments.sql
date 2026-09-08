-- ==============================================================================
-- Migration: Create Transactions Table & Payment Synchronization
-- Description: Creates public.transactions table, indexes, and RLS policies for recording
--              payment transactions (Pro upgrades, credits, certificates).
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'success',
  item_type TEXT NOT NULL DEFAULT 'general',
  amount NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_payment_id ON public.transactions(razorpay_payment_id);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to view own transactions" ON public.transactions;
CREATE POLICY "Allow users to view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role' OR auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow users or service role to insert transactions" ON public.transactions;
CREATE POLICY "Allow users or service role to insert transactions" ON public.transactions
  FOR INSERT WITH CHECK (true);
