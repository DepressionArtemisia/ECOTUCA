import { WorkspaceShell } from "@/components/layout/workspace-shell";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <WorkspaceShell roleContext="admin">{children}</WorkspaceShell>;
}
