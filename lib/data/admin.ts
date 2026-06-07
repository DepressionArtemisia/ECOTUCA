import { listPendingProfiles, updateProfileStatus } from "@/lib/data/profiles";
import type { UserStatus } from "@/types/domain";

export async function getApprovalQueue() {
  return listPendingProfiles();
}

export async function setApprovalStatus(email: string, status: UserStatus) {
  return updateProfileStatus(email, status);
}
