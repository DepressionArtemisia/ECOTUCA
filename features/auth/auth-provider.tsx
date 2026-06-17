"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithSupabaseOrDemo, logoutEverywhere, type CurrentUser, type LoginResult } from "@/lib/data/auth";
import { clearStoredDemoUser, getStoredDemoUser, setStoredDemoUser } from "@/lib/data/fallback";
import { isDemoSessionAllowedInEnforcedAccess, isPreviewAuthFallbackEnabled } from "@/lib/auth/runtime";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { DemoUser } from "@/types/domain";

type AuthContextValue = {
  user: CurrentUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  useDemoUser: (user: DemoUser) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const supabase = createSupabaseBrowserClient();
        const session = await supabase?.auth.getSession();
        const authUser = session?.data.session?.user;
        if (authUser && supabase) {
          const profile = await supabase
            .from("profiles")
            .select("id, full_name, email, role, status, bio")
            .eq("id", authUser.id)
            .maybeSingle();
          if (active && profile.data) {
            setUser({
              id: profile.data.id,
              name: profile.data.full_name,
              email: profile.data.email,
              password: "",
              role: profile.data.role,
              status: profile.data.status,
              highlight: profile.data.bio ?? "Sessao Supabase.",
              source: "supabase"
            });
            return;
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Auth provider Supabase session failed", error);
        }
      } finally {
        if (active) {
          if (isPreviewAuthFallbackEnabled()) {
            const demo = getStoredDemoUser();
            setUser((current) => current ?? { ...demo, source: "demo" });
          } else {
            setUser((current) => current ?? null);
          }
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginWithSupabaseOrDemo(email, password);
    if (result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const useDemoUser = useCallback((demoUser: DemoUser) => {
    if (!isPreviewAuthFallbackEnabled() && !isDemoSessionAllowedInEnforcedAccess()) return;
    setStoredDemoUser(demoUser);
    setUser({ ...demoUser, source: "demo" });
  }, []);

  const logout = useCallback(async () => {
    await logoutEverywhere();
    clearStoredDemoUser();
    if (isPreviewAuthFallbackEnabled()) {
      const demo = getStoredDemoUser();
      setUser({ ...demo, source: "demo" });
    } else {
      setUser(null);
    }
    router.push("/entrar");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      useDemoUser,
      logout
    }),
    [loading, login, logout, useDemoUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
