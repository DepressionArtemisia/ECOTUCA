import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function TeacherClassesPage() {
  return (
    <AppShell title="Turmas" roleContext="teacher">
      <PlaceholderPage title="Acompanhamento de turmas" description="Lista de alunos, progresso por trilha, engajamento e alertas pedagogicos." area="Professor" />
    </AppShell>
  );
}
