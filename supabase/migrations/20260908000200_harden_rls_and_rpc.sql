-- Harden private profile, purchase, request, and privilege-changing RPC access.
CREATE TABLE IF NOT EXISTS public.course_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  course_topic TEXT NOT NULL,
  target_level TEXT DEFAULT 'Beginner to Advanced' CHECK (target_level IN ('Beginner', 'Beginner to Advanced', 'Advanced')),
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'building', 'published')),
  votes INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_course_requests_user_id ON public.course_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_course_requests_status ON public.course_requests(status);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile or public details" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow users select cert purchases" ON public.certificate_purchases;
CREATE POLICY "Users can view own certificate purchases" ON public.certificate_purchases
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow all users to view course requests" ON public.course_requests;
CREATE POLICY "Users can view own course requests" ON public.course_requests
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow anyone to insert course requests" ON public.course_requests;
CREATE POLICY "Authenticated users can create course requests" ON public.course_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

REVOKE ALL ON FUNCTION public.add_user_credits(UUID, INT) FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.upgrade_user_to_pro(UUID, INT, INT) FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.consume_ai_chat(UUID) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_chat(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION public.consume_ai_chat(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user public.users%ROWTYPE;
  v_today DATE := CURRENT_DATE;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RETURN jsonb_build_object('allowed', FALSE, 'error', 'Unauthorized');
  END IF;

  SELECT * INTO v_user FROM public.users WHERE id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('allowed', FALSE, 'error', 'User not found');
  END IF;

  IF v_user.last_chat_date < v_today THEN
    v_user.chats_used_today := 0;
    v_user.last_chat_date := v_today;
  END IF;
  IF v_user.plan_type = 'pro' AND v_user.pro_valid_until IS NOT NULL AND v_user.pro_valid_until < now() THEN
    v_user.plan_type := 'free';
    v_user.daily_chat_limit := 10;
  END IF;

  IF v_user.chats_used_today < v_user.daily_chat_limit THEN
    v_user.chats_used_today := v_user.chats_used_today + 1;
  ELSIF v_user.extra_credits > 0 THEN
    v_user.extra_credits := v_user.extra_credits - 1;
  ELSE
    RETURN jsonb_build_object('allowed', FALSE, 'chats_used_today', v_user.chats_used_today, 'daily_chat_limit', v_user.daily_chat_limit, 'extra_credits', v_user.extra_credits, 'plan_type', v_user.plan_type);
  END IF;

  UPDATE public.users SET chats_used_today = v_user.chats_used_today, last_chat_date = v_user.last_chat_date, extra_credits = v_user.extra_credits, plan_type = v_user.plan_type, daily_chat_limit = v_user.daily_chat_limit, updated_at = timezone('utc'::text, now()) WHERE id = p_user_id;
  RETURN jsonb_build_object('allowed', TRUE, 'chats_used_today', v_user.chats_used_today, 'daily_chat_limit', v_user.daily_chat_limit, 'extra_credits', v_user.extra_credits, 'plan_type', v_user.plan_type);
END;
$$;
