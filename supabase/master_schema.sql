-- ============================================================================
-- LERNEXAI ULTIMATE MASTER DATABASE SCHEMA
-- ============================================================================

-- 1. Create the consolidated public.users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  phone TEXT DEFAULT '',                        -- Added phone column for direct contacts!
  state TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),

  -- Pro Plan & Subscription Details
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'pro')),
  pro_valid_until TIMESTAMPTZ,

  -- AI Chat Limits & Purchased Credits (Consolidated)
  daily_chat_limit INT NOT NULL DEFAULT 10,
  chats_used_today INT NOT NULL DEFAULT 0,
  last_chat_date DATE NOT NULL DEFAULT CURRENT_DATE,
  extra_credits INT NOT NULL DEFAULT 0,

  -- AI Course Generation Limits (Pro: 5/month, Free: 0)
  ai_courses_created_this_month INT NOT NULL DEFAULT 0,
  ai_courses_month_start DATE NOT NULL DEFAULT CURRENT_DATE,

  -- System Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan_type ON public.users(plan_type);


-- 2. Create the courses table (for default platform courses)
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT DEFAULT 'Software Engineering',
  difficulty TEXT DEFAULT 'Beginner to Advanced' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced')),
  thumbnail_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  total_modules INT DEFAULT 0,
  estimated_hours INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);


-- 3. Create the modules table
CREATE TABLE IF NOT EXISTS public.modules (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  module_number INT,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);


-- 4. Create the lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT REFERENCES public.modules(id) ON DELETE CASCADE,
  lesson_number INT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'interactive',
  video_url TEXT,
  order_index INT NOT NULL,
  duration_minutes INT DEFAULT 15,
  starter_code TEXT,
  sandbox_language TEXT,
  challenge JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);


-- 5. Create the quizzes table (lesson quizzes or module quizzes)
CREATE TABLE IF NOT EXISTS public.quizzes (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  module_index INT NOT NULL,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  questions JSONB NOT NULL,
  passing_score INT DEFAULT 70,
  time_limit_minutes INT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);


-- 6. Create user enrollments table (tracks student enrollments & custom courses progress)
CREATE TABLE IF NOT EXISTS public.user_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,                     -- Points to courses.id or user_courses.id
  progress_percentage INT DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.user_enrollments(user_id);


-- 7. Create user progress table (lesson completion tracker)
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, lesson_id)
);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.user_progress(user_id);


-- 8. Create quiz attempts table (tracks scores of completed quizzes)
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score INT NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, quiz_id)
);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON public.quiz_attempts(user_id);


-- 9. Create certificate purchases table (verified digital credentials)
CREATE TABLE IF NOT EXISTS public.certificate_purchases (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  certificate_id TEXT NOT NULL UNIQUE,
  score NUMERIC NOT NULL,
  grade TEXT NOT NULL,
  full_name TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  purchase_amount NUMERIC DEFAULT 0,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificate_purchases(user_id);


-- 10. Create custom user courses table (AI-Generated Curriculums)
CREATE TABLE IF NOT EXISTS public.user_courses (
  id TEXT PRIMARY KEY,                          -- Course ID (e.g. course-gen-12345)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Creator ID
  title TEXT NOT NULL,                          -- Course Title
  description TEXT,                             -- Tagline / summary
  category TEXT DEFAULT 'AI & Software',        -- Category
  difficulty TEXT DEFAULT 'Beginner to Advanced', -- Difficulty level
  course_data JSONB NOT NULL,                   -- Entire nested JSON of modules, lessons, quizzes
  is_custom BOOLEAN DEFAULT TRUE,              -- Custom created flag
  status TEXT DEFAULT 'pending_approval' CHECK (status IN ('draft', 'pending_approval', 'published')), -- Admin lifecycle state
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON public.user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_status ON public.user_courses(status);


-- 11. Create course requests table (student demanded tracks & masterclasses)
CREATE TABLE IF NOT EXISTS public.course_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  course_topic TEXT NOT NULL,
  target_level TEXT DEFAULT 'Beginner to Advanced' CHECK (target_level IN ('Beginner', 'Beginner to Advanced', 'Advanced')),
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'building', 'published')),
  votes INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_course_requests_user_id ON public.course_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_course_requests_status ON public.course_requests(status);


-- ============================================================================
-- PART 2: AUTOMATIC TRIGGERS, SECURITY & PL/SQL FUNCTIONS
-- ============================================================================

-- Automatic Updated_At Timestamp Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_users_updated_at ON public.users;
CREATE TRIGGER tr_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();


-- Automatic Profile Creation on auth.users Signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_full_name TEXT;
  v_first_name TEXT;
  v_last_name TEXT;
BEGIN
  -- Extract names from metadata safely
  v_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    ''
  );
  
  v_first_name := COALESCE(
    NEW.raw_user_meta_data->>'first_name',
    split_part(v_full_name, ' ', 1),
    split_part(NEW.email, '@', 1)
  );

  v_last_name := COALESCE(
    NEW.raw_user_meta_data->>'last_name',
    NULLIF(substr(v_full_name, length(v_first_name) + 2), ''),
    ''
  );

  INSERT INTO public.users (
    id,
    first_name,
    last_name,
    email,
    phone,
    state,
    avatar_url,
    plan_type,
    role,
    daily_chat_limit,
    chats_used_today,
    last_chat_date,
    extra_credits,
    ai_courses_created_this_month,
    ai_courses_month_start
  ) VALUES (
    NEW.id,
    v_first_name,
    v_last_name,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'state', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    'free',
    'student',
    10,
    0,
    CURRENT_DATE,
    0,
    0,
    CURRENT_DATE
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    first_name = CASE WHEN public.users.first_name = '' THEN EXCLUDED.first_name ELSE public.users.first_name END,
    last_name = CASE WHEN public.users.last_name = '' THEN EXCLUDED.last_name ELSE public.users.last_name END,
    avatar_url = CASE WHEN public.users.avatar_url = '' THEN EXCLUDED.avatar_url ELSE public.users.avatar_url END,
    updated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- consume_ai_chat function
CREATE OR REPLACE FUNCTION public.consume_ai_chat(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_user public.users%ROWTYPE;
  v_today DATE := CURRENT_DATE;
  v_allowed BOOLEAN := FALSE;
BEGIN
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
    v_allowed := TRUE;
  ELSIF v_user.extra_credits > 0 THEN
    v_user.extra_credits := v_user.extra_credits - 1;
    v_allowed := TRUE;
  ELSE
    v_allowed := FALSE;
  END IF;

  UPDATE public.users
  SET
    chats_used_today = v_user.chats_used_today,
    last_chat_date = v_user.last_chat_date,
    extra_credits = v_user.extra_credits,
    plan_type = v_user.plan_type,
    daily_chat_limit = v_user.daily_chat_limit,
    updated_at = timezone('utc'::text, now())
  WHERE id = p_user_id;

  RETURN jsonb_build_object(
    'allowed', v_allowed,
    'chats_used_today', v_user.chats_used_today,
    'daily_chat_limit', v_user.daily_chat_limit,
    'extra_credits', v_user.extra_credits,
    'plan_type', v_user.plan_type
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- add_user_credits function
CREATE OR REPLACE FUNCTION public.add_user_credits(p_user_id UUID, p_credits INT)
RETURNS INT AS $$
DECLARE
  v_new_credits INT;
BEGIN
  UPDATE public.users
  SET
    extra_credits = COALESCE(extra_credits, 0) + p_credits,
    updated_at = timezone('utc'::text, now())
  WHERE id = p_user_id
  RETURNING extra_credits INTO v_new_credits;

  RETURN v_new_credits;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- upgrade_user_to_pro function
CREATE OR REPLACE FUNCTION public.upgrade_user_to_pro(
  p_user_id UUID, 
  p_days INT DEFAULT 30,
  p_bonus_free_days INT DEFAULT 3
)
RETURNS VOID AS $$
DECLARE
  v_base_time TIMESTAMPTZ;
  v_total_days INT;
BEGIN
  v_total_days := p_days + p_bonus_free_days;

  SELECT COALESCE(
    CASE 
      WHEN pro_valid_until > timezone('utc'::text, now()) THEN pro_valid_until 
      ELSE timezone('utc'::text, now()) 
    END,
    timezone('utc'::text, now())
  ) INTO v_base_time
  FROM public.users
  WHERE id = p_user_id;

  UPDATE public.users
  SET
    plan_type = 'pro',
    daily_chat_limit = 50,
    pro_valid_until = v_base_time + (v_total_days || ' days')::INTERVAL,
    updated_at = timezone('utc'::text, now())
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================================
-- PART 3: ROW LEVEL SECURITY (RLS) POLICIES FOR ALL TABLES
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_purchases ENABLE ROW LEVEL SECURITY;

-- users policies
DROP POLICY IF EXISTS "Users can view own profile or public details" ON public.users;
CREATE POLICY "Users can view own profile or public details" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Enable insert for authenticated users or system" ON public.users;
CREATE POLICY "Enable insert for authenticated users or system" ON public.users FOR INSERT WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- courses policies
DROP POLICY IF EXISTS "Allow select for everyone" ON public.courses;
CREATE POLICY "Allow select for everyone" ON public.courses FOR SELECT USING (true);

-- modules policies
DROP POLICY IF EXISTS "Allow select modules for everyone" ON public.modules;
CREATE POLICY "Allow select modules for everyone" ON public.modules FOR SELECT USING (true);

-- lessons policies
DROP POLICY IF EXISTS "Allow select lessons for everyone" ON public.lessons;
CREATE POLICY "Allow select lessons for everyone" ON public.lessons FOR SELECT USING (true);

-- quizzes policies
DROP POLICY IF EXISTS "Allow select quizzes for everyone" ON public.quizzes;
CREATE POLICY "Allow select quizzes for everyone" ON public.quizzes FOR SELECT USING (true);

-- user_enrollments policies
DROP POLICY IF EXISTS "Allow users select enrollments" ON public.user_enrollments;
CREATE POLICY "Allow users select enrollments" ON public.user_enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users insert enrollments" ON public.user_enrollments;
CREATE POLICY "Allow users insert enrollments" ON public.user_enrollments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users update enrollments" ON public.user_enrollments;
CREATE POLICY "Allow users update enrollments" ON public.user_enrollments FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- user_progress policies
DROP POLICY IF EXISTS "Allow users select progress" ON public.user_progress;
CREATE POLICY "Allow users select progress" ON public.user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users insert progress" ON public.user_progress;
CREATE POLICY "Allow users insert progress" ON public.user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users update progress" ON public.user_progress;
CREATE POLICY "Allow users update progress" ON public.user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- quiz_attempts policies
DROP POLICY IF EXISTS "Allow users select attempts" ON public.quiz_attempts;
CREATE POLICY "Allow users select attempts" ON public.quiz_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users insert attempts" ON public.quiz_attempts;
CREATE POLICY "Allow users insert attempts" ON public.quiz_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users update attempts" ON public.quiz_attempts;
CREATE POLICY "Allow users update attempts" ON public.quiz_attempts FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- certificate_purchases policies
DROP POLICY IF EXISTS "Allow users select cert purchases" ON public.certificate_purchases;
CREATE POLICY "Allow users select cert purchases" ON public.certificate_purchases FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow users insert cert purchases" ON public.certificate_purchases;
CREATE POLICY "Allow users insert cert purchases" ON public.certificate_purchases FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- course_requests policies
ALTER TABLE public.course_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all users to view course requests" ON public.course_requests;
CREATE POLICY "Allow all users to view course requests" ON public.course_requests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anyone to insert course requests" ON public.course_requests;
CREATE POLICY "Allow anyone to insert course requests" ON public.course_requests FOR INSERT WITH CHECK (true);


-- 12. Create transactions table (for financial and payment transaction history)
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


-- 13. Create certificate downloads audit table
CREATE TABLE IF NOT EXISTS public.certificate_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT,
  user_agent TEXT,
  downloaded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_cert_downloads_cert_id ON public.certificate_downloads(certificate_id);
CREATE INDEX IF NOT EXISTS idx_cert_downloads_user_id ON public.certificate_downloads(user_id);

ALTER TABLE public.certificate_downloads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to view own downloads" ON public.certificate_downloads;
CREATE POLICY "Allow users to view own downloads" ON public.certificate_downloads
  FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow users to insert certificate downloads" ON public.certificate_downloads;
CREATE POLICY "Allow users to insert certificate downloads" ON public.certificate_downloads
  FOR INSERT WITH CHECK (true);


