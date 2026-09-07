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
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchUserProfile(supabaseUser: SupabaseUser): Promise<User> {
  try {
    const { data: profileData, error } = await supabase
      .from('users')
      .select('first_name, last_name, state, phone, plan_type')
      .eq('id', supabaseUser.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      // Return basic user data if profile fetch fails
      return {
        email: supabaseUser.email || "",
        name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
        id: supabaseUser.id,
        avatar: supabaseUser.user_metadata?.avatar_url,
        plan_type: supabaseUser.user_metadata?.plan_type || "free",
        created_at: supabaseUser.created_at,
      };
    }

    return {
      email: supabaseUser.email || "",
      name: [profileData?.first_name, profileData?.last_name].filter(Boolean).join(" ") ||
            supabaseUser.user_metadata?.full_name ||
            supabaseUser.email?.split("@")[0] ||
            "User",
      id: supabaseUser.id,
      avatar: supabaseUser.user_metadata?.avatar_url,
      plan_type: profileData?.plan_type || supabaseUser.user_metadata?.plan_type || "free",
      created_at: supabaseUser.created_at,
      first_name: profileData?.first_name,
      last_name: profileData?.last_name,
      state: profileData?.state,
      phone: profileData?.phone,
    };
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return {
      email: supabaseUser.email || "",
      name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
      id: supabaseUser.id,
      avatar: supabaseUser.user_metadata?.avatar_url,
      plan_type: supabaseUser.user_metadata?.plan_type || "free",
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
    const initializeAuth = async () => {
      // 1. Check for stored demo session first
      try {
        const storedDemo = localStorage.getItem("lernex_demo_user");
        if (storedDemo) {
          const parsed = JSON.parse(storedDemo);
          setUser(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn("Could not read stored demo user:", e);
      }

      if (!isSupabaseConfigured) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user);
          setUser(userProfile);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void initializeAuth();

    if (isSupabaseConfigured) {
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        // If a demo user is active in localStorage, do not override unless signed out
        if (localStorage.getItem("lernex_demo_user")) {
          return;
        }
        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user);
          setUser(userProfile);
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }

    return () => {};
  }, []);

  const loginAsDemo = async () => {
    localStorage.setItem("lernex_demo_user", JSON.stringify(DEMO_USER));
    setUser(DEMO_USER);
  };

  const login = async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();

    // Check for demo login
    if (
      trimmedEmail === "demo@lernexai.com" ||
      trimmedEmail === "test@lernexai.com" ||
      trimmedEmail === "demo@example.com" ||
      trimmedEmail === "demo@test.com" ||
      password === "demo1234" ||
      !isSupabaseConfigured
    ) {
      const demoProfile: User = {
        ...DEMO_USER,
        email: trimmedEmail || DEMO_CREDENTIALS.email,
        name: trimmedEmail === DEMO_CREDENTIALS.email ? DEMO_CREDENTIALS.name : trimmedEmail.split("@")[0],
      };
      localStorage.setItem("lernex_demo_user", JSON.stringify(demoProfile));
      setUser(demoProfile);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
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

    if (!isSupabaseConfigured || trimmedEmail === "demo@lernexai.com") {
      const customUser: User = {
        id: `user-${Date.now()}`,
        email: trimmedEmail,
        name: [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ") || trimmedEmail.split("@")[0],
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        plan_type: "free",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedEmail)}&backgroundColor=e2e8f0`,
        created_at: new Date().toISOString(),
      };
      localStorage.setItem("lernex_demo_user", JSON.stringify(customUser));
      setUser(customUser);
      return { sessionCreated: true };
    }

    const fullName = [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ") || email.split("@")[0];

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAppUrl("/auth/callback"),
        data: {
          full_name: fullName,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}&backgroundColor=e2e8f0`,
          plan_type: "free"
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      // Also save to users table
      try {
        await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: email,
            first_name: firstName || null,
            last_name: lastName || null,
            phone: phone || null,
            plan_type: 'free'
          });
      } catch (profileError) {
        console.error("Error creating user profile:", profileError);
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
      await loginAsDemo();
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getAppUrl("/auth/callback"),
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) throw error;
  };

  const logout = async () => {
    localStorage.removeItem("lernex_demo_user");
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn("Supabase signout error:", e);
      }
    }
    setUser(null);
  };

  const refreshUser = async () => {
    const storedDemo = localStorage.getItem("lernex_demo_user");
    if (storedDemo) {
      try {
        setUser(JSON.parse(storedDemo));
        return;
      } catch {}
    }

    if (!isSupabaseConfigured) {
      return;
    }

    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (data.user) {
      const userProfile = await fetchUserProfile(data.user);
      setUser(userProfile);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsDemo, signup, loginWithGoogle, logout, refreshUser }}>
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
