-- Keep payment fulfillment server-side and idempotent.
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL UNIQUE,
  razorpay_payment_id TEXT NOT NULL UNIQUE,
  product_type TEXT NOT NULL CHECK (product_type IN ('credits', 'pro_upgrade', 'certificate')),
  amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
  credits INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  processed_at TIMESTAMPTZ
);

ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_transactions FROM anon, authenticated;
GRANT SELECT ON public.payment_transactions TO authenticated;

DROP POLICY IF EXISTS "Users can view own payment transactions" ON public.payment_transactions;
CREATE POLICY "Users can view own payment transactions" ON public.payment_transactions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
