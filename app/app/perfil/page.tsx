import { AppShell } from "@/components/layout/app-shell";
import { AccountSummary } from "@/features/auth/account-summary";

export default function ProfilePage() {
  return <AppShell title="Meu perfil"><AccountSummary /></AppShell>;
}
