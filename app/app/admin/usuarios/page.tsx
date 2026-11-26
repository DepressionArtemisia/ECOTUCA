import { AdminShell } from "@/components/layout/admin-shell";
import { UsersDirectory } from "@/features/admin/users-directory";

export default function AdminUsersPage() {
  return <AdminShell><UsersDirectory /></AdminShell>;
}
