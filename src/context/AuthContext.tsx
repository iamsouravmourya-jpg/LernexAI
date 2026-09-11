import React, { createContext, useContext, useState, useEffect } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { getAppUrl } from "@/lib/siteUrl";
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  email: string;
  name: string;
  id?: string;
  avatar?: string;
  plan_type?: string;
  created_at?: string;
  first_name?: string;
  last_name?: string;
  state?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    phone?: string
  ) => Promise<{ sessionCreated: boolean }>;
  loginWithGoogle: () => Promise<void>;
  logout: (redirectTo?: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser?: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchUserProfile(supabaseUser: SupabaseUser): Promise<User> {
  try {
    const { data: profileData, error } = await supabase
      .from('users')
      .select('first_name, last_name, state, phone, plan_type, avatar_url')
      .eq('id', supabaseUser.id)
      .maybeSingle();

    if (error) {
      console.warn("User profile fetch notice:", error.message || error);
    }

    const metaFullName =
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.user_metadata?.name ||
      [supabaseUser.user_metadata?.first_name, supabaseUser.user_metadata?.last_name].filter(Boolean).join(" ");

    const computedName =
      [profileData?.first_name, profileData?.last_name].filter(Boolean).join(" ") ||
      metaFullName ||
      supabaseUser.email?.split("@")[0] ||
      "Learner";

    const computedAvatar =
      profileData?.avatar_url ||
      supabaseUser.user_metadata?.avatar_url ||
      supabaseUser.user_metadata?.picture ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(supabaseUser.email || 'learner')}&backgroundColor=e2e8f0`;

    // If profile row doesn't exist yet in public.users, self-heal and insert it
    if (!profileData && isSupabaseConfigured) {
      try {
        const nameParts = computedName.split(" ");
        const fName = nameParts[0] || "";
        const lName = nameParts.slice(1).join(" ") || "";
        await supabase.from('users').upsert({
          id: supabaseUser.id,
          email: supabaseUser.email,
          first_name: fName || null,
          last_name: lName || null,
          avatar_url: computedAvatar,
          plan_type: 'free',
          role: 'student',
        }, { onConflict: 'id' });
      } catch (upsertErr) {
        console.warn("Self-heal user profile upsert warning:", upsertErr);
      }
    }

    return {
      email: supabaseUser.email || "",
      name: computedName,
      id: supabaseUser.id,
      avatar: computedAvatar,
      plan_type: profileData?.plan_type || supabaseUser.user_metadata?.plan_type || "free",
      created_at: supabaseUser.created_at,
      first_name: profileData?.first_name || supabaseUser.user_metadata?.first_name || computedName.split(" ")[0],
      last_name: profileData?.last_name || supabaseUser.user_metadata?.last_name || computedName.split(" ").slice(1).join(" "),
      state: profileData?.state,
      phone: profileData?.phone,
    };
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    const fallbackName = supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "Learner";
    return {
      email: supabaseUser.email || "",
      name: fallbackName,
      id: supabaseUser.id,
      avatar: supabaseUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(supabaseUser.email || 'learner')}&backgroundColor=e2e8f0`,
      plan_type: "free",
      created_at: supabaseUser.created_at,
    };
  }
}

function mapSupabaseUser(supabaseUser: SupabaseUser | null | undefined): User | null {
  if (!supabaseUser) return null;

  return {
    email: supabaseUser.email || "",
    name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
    id: supabaseUser.id,
    avatar: supabaseUser.user_metadata?.avatar_url,
    plan_type: supabaseUser.user_metadata?.plan_type || "free",
    created_at: supabaseUser.created_at,
  };
}

export const DEMO_CREDENTIALS = {
  email: "demo@lernexai.com",
  password: "demo1234",
  name: "Demo Student",
  plan_type: "pro" as const,
};

export const DEMO_USER: User = {
  id: "00000000-0000-0000-0000-000000000001",
  email: DEMO_CREDENTIALS.email,
  name: DEMO_CREDENTIALS.name,
  first_name: "Demo",
  last_name: "Student",
  phone: "9876543210",
  plan_type: "pro",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoStudent&backgroundColor=b6e3f4",
  created_at: "2026-01-01T00:00:00.000Z",
};

export function isDemoUser(user: User | null | undefined): boolean {
  if (!user) return false;
  return (
    user.id === DEMO_USER.id ||
    user.id === "demo-user-12345" ||
    user.email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase()
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          setLoading(false);
        }
      }, 1500);

      try {
        if (isSupabaseConfigured) {
          // Priority 1: Check for real authenticated Supabase session first
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          if (session?.user && !sessionError) {
            localStorage.removeItem("lernex_demo_user");
            const userProfile = await fetchUserProfile(session.user);
            if (isMounted) {
              setUser(userProfile);
              clearTimeout(timeoutId);
              setLoading(false);
              return;
            }
          }
        }

        if (isMounted) {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization failed", error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void initializeAuth();

    if (isSupabaseConfigured) {
      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          localStorage.removeItem("lernex_demo_user");
          const userProfile = await fetchUserProfile(session.user);
          if (isMounted) {
            setUser(userProfile);
          }
        } else if (event === "SIGNED_OUT") {
          localStorage.removeItem("lernex_demo_user");
          if (isMounted) {
            setUser(null);
          }
        }
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const loginAsDemo = async () => {
    setUser(DEMO_USER);
  };

  const login = async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!isSupabaseConfigured) {
      throw new Error("Authentication service is unavailable. Please verify Supabase database configuration.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (error) throw error;

    if (data.user) {
      localStorage.removeItem("lernex_demo_user");
      const userProfile = await fetchUserProfile(data.user);
      setUser(userProfile);
    }
  };

  const signup = async (email: string, password: string, firstName?: string, lastName?: string, phone?: string) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!isSupabaseConfigured) {
      throw new Error("Authentication service is unavailable. Please verify database configuration.");
    }

    const fullName = [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ") || trimmedEmail.split("@")[0];
    const callbackUrl = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : getAppUrl("/auth/callback");

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        emailRedirectTo: callbackUrl,
        data: {
          full_name: fullName,
          first_name: firstName?.trim() || null,
          last_name: lastName?.trim() || null,
          phone: phone?.trim() || null,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedEmail)}&backgroundColor=e2e8f0`,
          plan_type: "free"
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      localStorage.removeItem("lernex_demo_user");
      if (data.session?.user) {
        const { error: profileError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: trimmedEmail,
            first_name: firstName?.trim() || null,
            last_name: lastName?.trim() || null,
            phone: phone?.trim() || null,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedEmail)}&backgroundColor=e2e8f0`,
            plan_type: 'free',
            role: 'student',
          }, { onConflict: 'id' });

        if (profileError) {
          throw new Error(`Account created, but profile could not be saved: ${profileError.message}`);
        }
      }

      if (data.session?.user) {
        const userProfile = await fetchUserProfile(data.session.user);
        setUser(userProfile);
        return { sessionCreated: true };
      }
    }

    return { sessionCreated: false };
  };

  const loginWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured for this deployment. Please verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    }

    localStorage.removeItem("lernex_demo_user");
    const callbackUrl = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : getAppUrl("/auth/callback");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) throw error;
  };

  const logout = async (redirectTo: string = "/") => {
    try {
      sessionStorage.setItem("lernex_is_logging_out", "true");
    } catch (_) {}

    localStorage.removeItem("lernex_demo_user");
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn("Supabase signout error:", e);
      }
    }
    setUser(null);

    if (typeof window !== "undefined" && redirectTo) {
      window.location.replace(redirectTo);
    }
  };

  const refreshUser = async () => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!error && data?.user) {
          localStorage.removeItem("lernex_demo_user");
          const userProfile = await fetchUserProfile(data.user);
          setUser(userProfile);
          return;
        }
      } catch (e) {
        console.warn("Error refreshing Supabase user:", e);
      }
    }

    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    if (isDemoUser(user) || !user?.id || localStorage.getItem("lernex_demo_user")) {
      const updatedUser: User = {
        ...(user || DEMO_USER),
        ...data,
        name: [data.first_name, data.last_name].filter(Boolean).join(" ") || data.name || user?.name || "Learner",
      };
      setUser(updatedUser);
      return;
    }

    if (isSupabaseConfigured && user?.id) {
      const updatePayload: Record<string, any> = {};
      if (data.first_name !== undefined) updatePayload.first_name = data.first_name;
      if (data.last_name !== undefined) updatePayload.last_name = data.last_name;
      if (data.phone !== undefined) updatePayload.phone = data.phone;
      if (data.state !== undefined) updatePayload.state = data.state;
      if (data.avatar !== undefined) updatePayload.avatar_url = data.avatar;

      if (Object.keys(updatePayload).length > 0) {
        const { error } = await supabase
          .from('users')
          .update(updatePayload)
          .eq('id', user.id);
        if (error) {
          console.error("Failed to update user profile in users table:", error);
          throw error;
        }
      }

      await refreshUser();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsDemo, signup, loginWithGoogle, logout, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
