import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/domain";

export type SignupApplicationStatus = "pending" | "approved" | "rejected" | "archived";

export type SignupApplicationQueueItem = {
  id: string;
  role: Extract<UserRole, "student" | "teacher" | "guide" | "tourist">;
  status: SignupApplicationStatus;
  name: string;
  email: string;
  phone: string;
  submittedAt: string;
  highlight: string;
};

type SignupApplicationRow = {
  id: string;
  role: SignupApplicationQueueItem["role"];
  status: SignupApplicationStatus;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  submitted_at: string | null;
  payload: Record<string, unknown> | null;
};

export async function listPendingSignupApplications(): Promise<SignupApplicationQueueItem[]> {
  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return [];
    const session = await supabase.auth.getSession();
    if (!session.data.session) return [];

    const { data, error } = await supabase
      .from("signup_applications")
      .select("id, role, status, applicant_name, applicant_email, applicant_phone, submitted_at, payload")
      .eq("status", "pending")
      .order("submitted_at", { ascending: true })
      .limit(50);

    if (error) throw error;
    return ((data ?? []) as SignupApplicationRow[]).map(toQueueItem);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Signup applications fallback", error);
    }
    return [];
  }
}

function toQueueItem(row: SignupApplicationRow): SignupApplicationQueueItem {
  return {
    id: row.id,
    role: row.role,
    status: row.status,
    name: row.applicant_name ?? "Cadastro sem nome",
    email: row.applicant_email ?? "sem-email-informado",
    phone: row.applicant_phone ?? "sem telefone",
    submittedAt: row.submitted_at ?? "",
    highlight: getHighlight(row.payload)
  };
}

function getHighlight(payload: Record<string, unknown> | null) {
  const motivation = payload?.motivacao;
  const bio = payload?.miniBio;
  const objective = payload?.objetivoVisita;
  const route = payload?.roteiroPrincipal;
  for (const value of [motivation, bio, objective, route]) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "Cadastro recebido para analise da coordenacao.";
}
