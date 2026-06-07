import { AppShell } from "@/components/layout/app-shell";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { ContentUploadDemo } from "@/features/teacher/content-upload-demo";

export default function TeacherContentPage() {
  return (
    <AppShell title="Conteudos">
      <section className="mx-auto max-w-5xl rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
        <Badge tone="blue">Gestao pedagogica</Badge>
        <h1 className="brand-display mt-4 text-5xl">Criar conteudo</h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Titulo da aula", "Trilha", "Modulo", "Link do video", "Imagem de capa", "Publicacao"].map((field) => (
            <div key={field} className="rounded-lg bg-brand-warm p-4 text-sm font-black text-brand-brown">{field}</div>
          ))}
        </div>
        <ContentUploadDemo />
        <EcoButton className="mt-5" variant="mint">Salvar rascunho</EcoButton>
      </section>
    </AppShell>
  );
}
