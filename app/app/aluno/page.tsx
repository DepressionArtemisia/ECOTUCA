import { AppShell } from "@/components/layout/app-shell";
import { StudentDashboard } from "@/features/student/student-dashboard";

export default function StudentPage() {
  return (
    <AppShell title="Area do aluno">
      <StudentDashboard />
    </AppShell>
  );
}
