import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { getDemoUserByEmail, setStoredDemoUser } from "@/lib/data/fallback";
import type { DemoUser, UserRole, UserStatus } from "@/types/domain";

export type CurrentUser = DemoUser & {
  id?: string;
  source: "supabase" | "demo";
};

export type LoginResult = {
  ok: boolean;
  user?: CurrentUser;
  source: "supabase" | "demo";
  message: string;
};

export async function loginWithSupabaseOrDemo(email: string, password: string): Promise<LoginResult> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
          const profile = await supabase
            .from("profiles")
            .select("id, full_name, email, role, status, bio")
            .eq("id", data.user.id)
            .maybeSingle();

          const user: CurrentUser = {
            id: data.user.id,
            name: profile.data?.full_name ?? data.user.email ?? email,
            email: profile.data?.email ?? data.user.email ?? email,
            password: "",
            role: (profile.data?.role as UserRole | undefined) ?? "student",
            status: (profile.data?.status as UserStatus | undefined) ?? "approved",
            highlight: profile.data?.bio ?? "Sessao real Supabase.",
            source: "supabase"
          };
          return { ok: true, user, source: "supabase", message: "Login Supabase realizado." };
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Supabase login failed, trying demo fallback", error);
      }
    }
  }

  const demo = getDemoUserByEmail(email);
  if (demo && demo.password === password) {
    setStoredDemoUser(demo);
      return {
        ok: true,
        user: { ...demo, source: "demo" },
        source: "demo",
        message: "Acesso validado para este ambiente."
      };
  }

  return {
    ok: false,
    source: "demo",
    message: "Nao encontramos este acesso. Confira e-mail e senha."
  };
}

export async function logoutEverywhere() {
  try {
    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Supabase logout failed", error);
    }
  }
}
