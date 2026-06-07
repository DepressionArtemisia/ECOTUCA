import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { demoUsers } from "@/lib/mock-data/ecotuca";
import type { DemoUser, UserStatus } from "@/types/domain";

export async function listPendingProfiles(): Promise<DemoUser[]> {
  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) throw new Error("Supabase unavailable");
    const session = await supabase.auth.getSession();
    if (!session.data.session) return demoUsers.filter((user) => user.status === "pending");
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, email, role, status, bio")
      .eq("status", "pending");
    if (error) throw error;
    return (data ?? []).map((profile) => ({
      name: profile.full_name,
      email: profile.email,
      password: "",
      role: profile.role,
      status: profile.status,
      highlight: profile.bio ?? "Cadastro pendente."
    })) as DemoUser[];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Pending profiles fallback", error);
    }
    return demoUsers.filter((user) => user.status === "pending");
  }
}

export async function updateProfileStatus(email: string, status: UserStatus) {
  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) throw new Error("Supabase unavailable");
    const session = await supabase.auth.getSession();
    if (!session.data.session) throw new Error("Supabase session unavailable");
    const { error } = await supabase.from("profiles").update({ status }).eq("email", email);
    if (error) throw error;
    return { ok: true, source: "supabase" as const };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Profile status update fallback", error);
    }
    return { ok: true, source: "demo" as const };
  }
}
