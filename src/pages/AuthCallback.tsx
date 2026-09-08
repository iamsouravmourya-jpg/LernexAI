import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { refreshUser } = useAuth();
  const [message, setMessage] = useState("Completing sign in…");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;

    async function finishAuth() {
      try {
        // Clean out any stale demo user immediately upon receiving auth callback
        localStorage.removeItem("lernex_demo_user");

        // Parse search params and hash fragment
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));

        const error = url.searchParams.get("error") || hashParams.get("error");
        const errorDescription =
          url.searchParams.get("error_description") ||
          hashParams.get("error_description") ||
          url.searchParams.get("error_message");

        if (error) {
          console.error("OAuth error in callback URL:", error, errorDescription);
          if (!errorDescription?.includes("Database error")) {
            setHasError(true);
            setMessage(errorDescription || "Authentication could not be completed.");
            setTimeout(() => {
              if (active) setLocation("/auth", { replace: true });
            }, 3000);
            return;
          }
        }

        const code = url.searchParams.get("code") || hashParams.get("code");
        let session = null;

        // 1. If PKCE code is provided, exchange it for a session
        if (code) {
          setMessage("Verifying authentication code…");
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.warn("exchangeCodeForSession warning:", exchangeError.message);
          } else if (data?.session) {
            session = data.session;
          }
        }

        // 2. If access_token is in hash (Implicit OAuth grant), set session directly
        const accessToken = hashParams.get("access_token") || url.searchParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token") || url.searchParams.get("refresh_token");
        if (!session && accessToken) {
          setMessage("Authenticating with Google…");
          try {
            const { data: setSessionData, error: setSessionErr } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });
            if (setSessionData?.session) {
              session = setSessionData.session;
            } else if (setSessionErr) {
              console.warn("setSession error:", setSessionErr.message);
            }
          } catch (tokErr) {
            console.warn("setSession catch:", tokErr);
          }
        }

        // 3. If session wasn't obtained via exchange or tokens, check Supabase's active session
        if (!session) {
          setMessage("Retrieving active session…");
          const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
          if (currentSession) {
            session = currentSession;
          } else if (sessionError) {
            console.warn("getSession warning:", sessionError.message);
          }
        }

        // 4. Brief retry in case tokens are still being persisted by Supabase client
        if (!session) {
          await new Promise((res) => setTimeout(res, 800));
          const { data: retryData } = await supabase.auth.getSession();
          session = retryData?.session || null;
        }

        if (!active) return;

        if (session?.user) {
          localStorage.removeItem("lernex_demo_user");
          setMessage("Profile verified. Redirecting to dashboard…");

          // Clean token hash from browser url
          try {
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, "", window.location.pathname);
            }
          } catch (_e) {
            // Ignored if browser prevents history replacement
          }

          // Ensure profile is recorded in public.users without overwriting pro status
          try {
            const userMeta = session.user.user_metadata || {};
            const fullName = userMeta.full_name || userMeta.name || "";
            const parts = fullName.trim().split(" ");
            const firstName = parts[0] || userMeta.first_name || null;
            const lastName = parts.slice(1).join(" ") || userMeta.last_name || null;
            const avatarUrl =
              userMeta.avatar_url ||
              userMeta.picture ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(session.user.email || 'user')}&backgroundColor=e2e8f0`;

            const { data: existingUser } = await supabase
              .from('users')
              .select('plan_type')
              .eq('id', session.user.id)
              .maybeSingle();

            await supabase
              .from('users')
              .upsert({
                id: session.user.id,
                email: session.user.email,
                first_name: firstName,
                last_name: lastName,
                avatar_url: avatarUrl,
                plan_type: existingUser?.plan_type || session.user.app_metadata?.plan_type || 'free',
                role: 'student',
              }, { onConflict: 'id' });
          } catch (profileError) {
            console.warn("User profile upsert warning during callback:", profileError);
          }

          try {
            await refreshUser();
          } catch (refErr) {
            console.warn("refreshUser catch in callback:", refErr);
          }

          setLocation("/dashboard", { replace: true });
          return;
        }

        setHasError(true);
        setMessage("Session could not be established. Please try signing in again.");
        setTimeout(() => {
          if (active) setLocation("/auth", { replace: true });
        }, 3000);
      } catch (error: unknown) {
        console.error("Auth callback error:", error);
        setHasError(true);
        const errMsg = error instanceof Error ? error.message : "An unexpected error occurred during sign in.";
        setMessage(errMsg);
        setTimeout(() => {
          if (active) setLocation("/auth", { replace: true });
        }, 3000);
      }
    }

    void finishAuth();

    return () => {
      active = false;
    };
  }, [setLocation, refreshUser]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        {!hasError ? (
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />
        ) : (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 font-bold text-lg">
            !
          </div>
        )}
        <h1 className="text-xl font-bold text-slate-900">
          {hasError ? "Sign In Notice" : "Finishing Sign In"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        {hasError && (
          <button
            onClick={() => setLocation("/auth", { replace: true })}
            className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
}
