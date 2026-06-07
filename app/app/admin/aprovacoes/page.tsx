import { AdminShell } from "@/components/layout/admin-shell";
import { ApprovalQueue } from "@/features/admin/approval-queue";

export default function AdminApprovalsPage() {
  return (
    <AdminShell>
      <ApprovalQueue />
    </AdminShell>
  );
}
