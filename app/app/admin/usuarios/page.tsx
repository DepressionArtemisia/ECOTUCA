import { AdminShell } from "@/components/layout/admin-shell";
import { DemoUserSwitcher } from "@/components/demo/demo-user-switcher";

export default function AdminUsersPage() {
  return (
    <AdminShell>
      <DemoUserSwitcher />
    </AdminShell>
  );
}
