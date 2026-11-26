import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { isPreviewAuthFallbackEnabled } from "@/lib/auth/runtime";
import { getDemoUserByEmail, setStoredDemoUser } from "@/lib/data/fallback";
import type { DemoUser, UserRole, UserStatus } from "@/types/domain";

export type CurrentUser = DemoUser & { id?: string; source: "supabase" | "demo" };

export type LoginResult = {
  ok: boolean;
  user?: CurrentUser;
  source: "supabase" | "demo";
  message: string;
};

export async function loadAuthProfile(id: string): Promise<CurrentUser | null> {
  const supabase = createSupabaseBrowserClient();
  const profile = await supabase?.from("profiles")
    .select("id, full_name, email, role, status, bio")
    .eq("id", id)
    .maybeSingle();
  if (!profile?.data || profile.error) return null;
  const { full_name, email, role, status, bio } = profile.data;
  return { id, name: full_name, email, password: "", role: role as UserRole, status: status as UserStatus, highlight: bio ?? "", source: "supabase" };
}

export function accountHome(user: CurrentUser | null | undefined) {
  if (!user) return "/entrar";
  if (user.status !== "approved") return "/app/aguardando-aprovacao";
  switch (user.role) {
    case "admin":
    case "super_admin": return "/app/admin";
    case "teacher": return "/app/professor";
    case "guide": return "/app/guia";
    case "tourist": return "/app/turista";
    case "student": return "/app/aluno";
    default: return "/";
  }
}

export async function loginWithSupabaseOrDemo(email: string, password: string): Promise<LoginResult> {
  const demo = isPreviewAuthFallbackEnabled() ? getDemoUserByEmail(email) : undefined;
  if (demo && demo.password === password) {
    setStoredDemoUser(demo);
    return { ok: true, user: { ...demo, source: "demo" }, source: "demo", message: "Acesso de demonstração autorizado." };
  }

  try {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        const user = await loadAuthProfile(data.user.id);
        if (user) return { ok: true, user, source: "supabase", message: "Acesso autorizado." };
        await supabase.auth.signOut({ scope: "local" });
        return { ok: false, source: "supabase", message: "Sua conta ainda não tem um perfil vinculado. Procure a coordenação." };
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.warn("Falha ao carregar o perfil de acesso", error);
  }

  return {
    ok: false,
    source: isSupabaseConfigured() ? "supabase" : "demo",
    message: isSupabaseConfigured() || isPreviewAuthFallbackEnabled()
      ? "Confira seu e-mail e sua senha e tente novamente."
      : "O acesso está temporariamente indisponível. Tente novamente mais tarde."
  };
}

export async function logoutEverywhere() {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase?.auth.signOut({ scope: "local" });
  if (result?.error) throw result.error;
}
