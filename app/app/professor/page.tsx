import { AppShell } from "@/components/layout/app-shell";
import { TeacherDashboard } from "@/features/teacher/teacher-dashboard";

export default function TeacherPage() {
  return (
    <AppShell title="Professor" roleContext="teacher">
      <TeacherDashboard />
    </AppShell>
  );
}
