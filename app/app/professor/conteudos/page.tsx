import { AppShell } from "@/components/layout/app-shell";
import { ContentUploadDemo } from "@/features/teacher/content-upload-demo";

const tips = [
  { title: "Defina um objetivo", body: "Diga o que o aluno deve conseguir explicar ou demonstrar ao terminar a aula." },
  { title: "Proponha uma atividade", body: "Relacione a aula a uma situação que os alunos possam observar ou praticar no território." },
  { title: "Combine a entrega", body: "Explique o formato, o prazo e o que será considerado na devolutiva." }
];

export default function TeacherContentPage() {
  return (
    <AppShell title="Conteúdos" roleContext="teacher">
      <div className="workspace-grid">
        <header className="workspace-intro">
          <div>
            <p className="section-label"><span /> Ensino</p>
            <h1 className="text-display-lg mt-2">Conteúdos</h1>
            <p className="mt-3 max-w-[60ch] text-[var(--muted)]">Organize a proposta da aula e encaminhe o material de apoio para a coordenação.</p>
          </div>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,.75fr)]">
          <ContentUploadDemo />
          <aside className="brand-card p-5 sm:p-7">
            <h2 className="text-card-title">Antes de enviar</h2>
            <ul className="mt-4 space-y-3">
              {tips.map((item) => <li key={item.title}><strong>{item.title}</strong><p className="text-sm leading-relaxed text-[var(--muted)]">{item.body}</p></li>)}
            </ul>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
