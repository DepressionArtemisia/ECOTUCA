import { WorkspaceShell } from "@/components/layout/workspace-shell";

export function AppShell({ children, title, roleContext }: {
  children: React.ReactNode;
  title?: string;
  roleContext?: "student" | "teacher" | "guide" | "tourist";
}) {
  return <WorkspaceShell title={title} roleContext={roleContext}>{children}</WorkspaceShell>;
}
