import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState("Completing sign in…");

  useEffect(() => {
    let active = true;

    async function finishAuth() {
      try {
        console.log("Auth callback: Processing OAuth callback");
        
        // Get current URL
        const url = new URL(window.location.href);
        
        // Check for error in URL
        const error = url.searchParams.get("error");
        const errorDescription = url.searchParams.get("error_description");
        
        if (error) {
          console.error("OAuth error:", error, errorDescription);
          
          // If it's a database error, we can still proceed with the session
          if (errorDescription?.includes("Database error")) {
            console.log("Database error detected, but attempting to continue with session");
            setMessage("Completing sign in (skipping database save)…");
          } else {
            setMessage(errorDescription || "Authentication failed");
            setTimeout(() => setLocation("/auth"), 2000);
            return;
          }
        }

        // Give Supabase time to process the OAuth callback
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check for session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (!active) return;
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setMessage(sessionError.message || "Could not complete sign in");
          setTimeout(() => setLocation("/auth"), 2000);
          return;
        }
        
        if (session) {
          console.log("Auth callback: Session found, redirecting to dashboard");
          console.log("Session user:", session.user);
          
          // Try to create user profile if it doesn't exist
          try {
            const { error: profileError } = await supabase
              .from('users')
              .upsert({
                id: session.user.id,
                email: session.user.email,
                first_name: session.user.user_metadata?.full_name?.split(' ')[0] || null,
                last_name: session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || null,
                plan_type: 'free',
                created_at: new Date().toISOString()
              }, { onConflict: 'id' });
            
            if (profileError) {
              console.warn("Could not save user profile:", profileError);
              // Don't fail the auth flow if profile save fails
            } else {
              console.log("User profile saved successfully");
            }
          } catch (profileError) {
            console.warn("Profile save error:", profileError);
            // Don't fail the auth flow
          }
          
          if (!active) return;
          setLocation("/dashboard", { replace: true });
          return;
        }

        console.log("Auth callback: No session found after delay");
        setMessage("Session not found. Redirecting back to sign in…");
        setTimeout(() => setLocation("/auth"), 2000);
      } catch (error) {
        console.error("Auth callback error:", error);
        setMessage("An error occurred during sign in");
        setTimeout(() => setLocation("/auth"), 2000);
      }
    }

    void finishAuth();

    return () => {
      active = false;
    };
  }, [setLocation]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-6 text-center">
      <div>
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />
        <h1 className="text-xl font-bold text-gray-900">Finishing sign in</h1>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}
