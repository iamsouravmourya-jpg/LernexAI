-- Create certificate_downloads audit table
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
