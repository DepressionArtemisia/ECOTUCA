import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { demoUsers } from "@/lib/mock-data/ecotuca";
import type { UserRole, UserStatus } from "@/types/domain";

export async function listPendingProfiles() {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("A conexão com a plataforma está indisponível.");
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, bio")
    .eq("status", "pending")
    .not("role", "in", "(admin,super_admin)")
    .order("created_at", { ascending: true })
    .limit(50);
  if (error) throw error;
  return data.map((profile) => ({
    id: profile.id as string,
    name: profile.full_name as string,
    email: profile.email as string,
    role: profile.role as UserRole,
    highlight: profile.bio as string | null
  }));
}

export type ProfileListItem = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export async function listProfiles(preview: boolean): Promise<ProfileListItem[]> {
  if (preview) return demoUsers.map(({ name, email, role, status }) => ({ id: email, name, email, role, status }));

  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("A conexão com a plataforma está indisponível.");
  const { data, error } = await supabase.from("profiles")
    .select("id, full_name, email, role, status")
    .order("full_name", { ascending: true })
    .limit(100);
  if (error) throw error;
  return data.map(({ id, full_name, email, role, status }) => ({ id, name: full_name, email, role, status }));
}
