import { listPendingProfiles } from "@/lib/data/profiles";
import { listPendingSignupApplications } from "@/lib/data/signup-applications";
import { demoUsers } from "@/lib/mock-data/ecotuca";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/domain";

export type ReviewDecision = "approved" | "rejected";
export type ApprovalQueueItem = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  highlight?: string | null;
  kind: "signup_application" | "profile";
};

export async function getApprovalQueue(preview: boolean): Promise<ApprovalQueueItem[]> {
  if (preview) {
    return demoUsers.filter(({ status }) => status === "pending")
      .map(({ email, name, role, highlight }) => ({ id: email, email, name, role, highlight, kind: "profile" }));
  }

  const [applications, profiles] = await Promise.all([listPendingSignupApplications(), listPendingProfiles()]);
  return [
    ...applications.map((application) => ({ ...application, kind: "signup_application" as const })),
    ...profiles.map((profile) => ({ ...profile, kind: "profile" as const }))
  ];
}

export async function setApprovalStatus(item: ApprovalQueueItem, decision: ReviewDecision) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("A conexão com a plataforma está indisponível.");
  const result = item.kind === "signup_application"
    ? await supabase.rpc("review_signup_application", { application_id: item.id, decision })
    : await supabase.rpc("review_pending_profile", { profile_id: item.id, decision });
  if (result.error) throw result.error;
  return result.data === true;
}
