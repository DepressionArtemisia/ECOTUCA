import { AppShell } from "@/components/layout/app-shell";
import { AccountSummary } from "@/features/auth/account-summary";

export default function WaitingApprovalPage() {
  return <AppShell title="Situação da conta"><AccountSummary statusOnly /></AppShell>;
}
