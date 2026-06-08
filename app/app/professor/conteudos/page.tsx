import { AppShell } from "@/components/layout/app-shell";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { ContentUploadDemo } from "@/features/teacher/content-upload-demo";

export default function TeacherContentPage() {
  return (
    <AppShell title="Conteudos" roleContext="teacher">
      <section className="mx-auto max-w-6xl rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
        <Badge tone="blue">Gestao pedagogica</Badge>
        <h1 className="brand-display mt-4 text-5xl">Criar conteudo</h1>
        <p className="mt-3 max-w-3xl text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
          Prepare aulas, materiais e evidencias de aprendizagem para a trilha do aluno. A publicacao final passa por curadoria da coordenacao.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Titulo da aula", "Trilha", "Modulo", "Link do video", "Imagem de capa", "Publicacao"].map((field) => (
            <div key={field} className="rounded-lg bg-brand-warm p-4 text-sm font-black text-brand-brown">{field}</div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            ["Objetivo da aula", "O que o aluno deve conseguir explicar ou praticar."],
            ["Atividade territorial", "Tarefa simples conectada ao territorio e ao ambiente."],
            ["Evidencia", "Foto, relato, quiz ou checkpoint para acompanhamento."]
          ].map(([item, text]) => (
            <div key={item} className="rounded-lg border border-brand-brown/10 bg-brand-yellow/15 p-4 dark:border-brand-yellow/20 dark:bg-white/5">
              <h2 className="text-sm font-black">{item}</h2>
              <p className="mt-2 text-xs font-bold text-brand-brown/70 dark:text-brand-cream/70">{text}</p>
            </div>
          ))}
        </div>
        <ContentUploadDemo />
        <EcoButton className="mt-5" variant="mint">Salvar rascunho</EcoButton>
      </section>
    </AppShell>
  );
}
