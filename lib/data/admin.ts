import { listPendingProfiles, updateProfileStatus } from "@/lib/data/profiles";
import { listPendingSignupApplications } from "@/lib/data/signup-applications";
import type { DemoUser } from "@/types/domain";
import type { UserStatus } from "@/types/domain";

export type ApprovalQueueItem = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  status: UserStatus | "archived";
  submittedAt?: string;
  highlight: string;
  kind: "signup_application" | "profile";
  source: "supabase" | "prepared";
};

export async function getApprovalQueue(): Promise<ApprovalQueueItem[]> {
  const applications = await listPendingSignupApplications();
  if (applications.length) {
    return applications.map((application) => ({
      id: application.id,
      email: application.email,
      name: application.name,
      phone: application.phone,
      role: application.role,
      status: application.status,
      submittedAt: application.submittedAt,
      highlight: application.highlight,
      kind: "signup_application",
      source: "supabase"
    }));
  }

  const profiles = await listPendingProfiles();
  return profiles.map(profileToApprovalItem);
}

export async function setApprovalStatus(item: ApprovalQueueItem, status: UserStatus) {
  if (item.kind === "signup_application") {
    return { ok: true, source: "prepared" as const };
  }

  const result = await updateProfileStatus(item.email, status);
  return {
    ok: result.ok,
    source: result.source === "supabase" ? "supabase" as const : "prepared" as const
  };
}

function profileToApprovalItem(user: DemoUser): ApprovalQueueItem {
  return {
    id: user.email,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
    highlight: user.highlight,
    kind: "profile",
    source: user.password === "" ? "supabase" : "prepared"
  };
}
