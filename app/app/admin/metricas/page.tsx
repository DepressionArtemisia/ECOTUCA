import { AdminShell } from "@/components/layout/admin-shell";
import { AdminDashboard } from "@/features/admin/admin-dashboard";

export default function AdminMetricsPage() {
  return (
    <AdminShell>
      <AdminDashboard indicatorsOnly />
    </AdminShell>
  );
}
