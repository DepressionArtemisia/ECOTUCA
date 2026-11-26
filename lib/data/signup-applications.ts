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
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("A conexão com a plataforma está indisponível.");
  const { data, error } = await supabase
    .from("signup_applications")
    .select("id, role, status, applicant_name, applicant_email, applicant_phone, submitted_at, payload")
    .eq("status", "pending")
    .order("submitted_at", { ascending: true })
    .limit(50);

  if (error) throw error;
  return ((data ?? []) as SignupApplicationRow[]).map(toQueueItem);
}

function toQueueItem(row: SignupApplicationRow): SignupApplicationQueueItem {
  return {
    id: row.id,
    role: row.role,
    status: row.status,
    name: row.applicant_name ?? "Cadastro sem nome",
    email: row.applicant_email ?? "E-mail não informado",
    phone: row.applicant_phone ?? "",
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
  return "";
}
