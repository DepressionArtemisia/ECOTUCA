import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { contentReviewItems } from "@/lib/mock-data/ecotuca";
import type { ContentReviewStatus } from "@/types/domain";

const statusCopy: Record<ContentReviewStatus, { label: string; tone: "yellow" | "coral" | "blue" | "mint" }> = {
  draft: { label: "rascunho", tone: "yellow" },
  review: { label: "em curadoria", tone: "blue" },
  approved: { label: "aprovado", tone: "mint" },
  changes: { label: "ajustes", tone: "coral" }
};

export default function AdminContentsPage() {
  return (
    <AdminShell>
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="brand-card bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
          <Badge tone="mint">Curadoria de conteudo</Badge>
          <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">Conteudos da plataforma</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/75">
            Controle aulas, materiais, rascunhos e revisoes antes de publicar qualquer conteudo para alunos e professores.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {[
            ["Rascunhos", "1", "Professor prepara antes da curadoria"],
            ["Em curadoria", "1", "Coordenacao revisa objetivos e linguagem"],
            ["Com ajustes", "1", "Volta para o autor com orientacao"],
            ["Aprovados", "1", "Liberado para trilhas e certificados"]
          ].map(([label, value, detail]) => (
            <PerifaCard key={label} tone="mint">
              <p className="text-xs font-black uppercase text-brand-coral">{label}</p>
              <p className="brand-display mt-2 text-4xl">{value}</p>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{detail}</p>
            </PerifaCard>
          ))}
        </div>

        <div className="grid gap-4">
          {contentReviewItems.map((item) => {
            const status = statusCopy[item.status];
            return (
              <PerifaCard key={item.id} tone={status.tone}>
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <Badge tone={status.tone}>{status.label}</Badge>
                      <Badge tone="brown">{item.kind}</Badge>
                    </div>
                    <h2 className="brand-display mt-3 text-4xl">{item.title}</h2>
                    <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
                      {item.trackTitle} - {item.author}
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      {item.checklist.map((check) => (
                        <span key={check} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-warm px-3 py-2 text-xs font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                          <CheckCircle2 size={15} />
                          {check}
                        </span>
                      ))}
                    </div>
                  </div>
                  <aside className="rounded-lg bg-white/70 p-4 dark:bg-white/10">
                    <p className="inline-flex items-center gap-2 text-xs font-black uppercase text-brand-blue dark:text-brand-mint">
                      <FileText size={15} />
                      Atualizado
                    </p>
                    <p className="brand-display mt-2 text-3xl">{item.updatedAt}</p>
                    <EcoButton className="mt-5 w-full" variant={item.status === "approved" ? "mint" : "coral"}>
                      <ShieldCheck size={16} />
                      Revisar
                    </EcoButton>
                  </aside>
                </div>
              </PerifaCard>
            );
          })}
        </div>
      </section>
    </AdminShell>
  );
}
