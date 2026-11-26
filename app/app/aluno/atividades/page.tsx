import { ClipboardCheck, Clock3, FileCheck2, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { PerifaCard } from "@/components/brand/perifa-card";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { studentActivities } from "@/lib/mock-data/ecotuca";
import type { StudentActivityStatus } from "@/types/domain";

const statusCopy: Record<StudentActivityStatus, { label: string; tone: "yellow" | "coral" | "blue" | "mint" }> = {
  todo: { label: "para fazer", tone: "yellow" },
  submitted: { label: "enviada", tone: "mint" },
  reviewed: { label: "avaliada", tone: "blue" },
  revision: { label: "revisar", tone: "coral" }
};

export default function StudentActivitiesPage() {
  const pendingCount = studentActivities.filter((activity) => activity.status === "todo" || activity.status === "revision").length;
  const reviewedCount = studentActivities.filter((activity) => activity.status === "reviewed").length;

  return (
    <AppShell title="Atividades" roleContext="student">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]">
          <div className="brand-card overflow-hidden bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
            <Badge>Atividades de exemplo</Badge>
            <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">Atividades</h1>
            <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/75">
              Confira exemplos de atividades, formatos de entrega e orientações da equipe.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Pendentes", String(pendingCount)],
                ["Enviadas", String(studentActivities.length - pendingCount - reviewedCount)],
                ["Avaliadas", String(reviewedCount)]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-white/10 p-4">
                  <p className="text-xs font-black uppercase text-brand-mint">{label}</p>
                  <p className="brand-display mt-1 text-4xl text-brand-yellow">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <PerifaCard tone="yellow">
            <Clock3 className="text-[var(--accent-text)]" size={28} />
            <h2 className="brand-display mt-3 text-4xl">Próxima entrega</h2>
            <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              Checklist de segurança da saída até 24/06. Use exemplos da aula e revise os combinados antes de enviar.
            </p>
            <Link href="#atividade-02" className="inline-action mt-3">Ver orientação da atividade</Link>
          </PerifaCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {studentActivities.map((activity) => {
            const status = statusCopy[activity.status];
            return (
              <article key={activity.id} id={activity.id} className="brand-card min-w-0 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Badge tone={status.tone}>{status.label}</Badge>
                    <h2 className="brand-display mt-3 text-4xl">{activity.title}</h2>
                    <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{activity.trackTitle}</p>
                  </div>
                  <span className="rounded-lg bg-brand-warm px-3 py-2 text-xs font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                    Prazo {activity.dueDate}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/70 p-4 text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                    <p className="inline-flex items-center gap-2 text-xs font-black uppercase text-[var(--accent-text)]">
                      <FileCheck2 size={15} />
                      Evidência
                    </p>
                    <p className="mt-2 text-sm font-bold">{activity.evidenceType}</p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-4 text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                    <p className="inline-flex items-center gap-2 text-xs font-black uppercase text-brand-blue dark:text-brand-mint">
                      <MessageSquareText size={15} />
                      Feedback
                    </p>
                    <p className="mt-2 text-sm font-bold">{activity.teacherFeedback}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-black uppercase">
                    <span>Progresso da entrega</span>
                    <span>{activity.progressPercent}%</span>
                  </div>
                  <Progress value={activity.progressPercent} tone={activity.tone} />
                </div>
              </article>
            );
          })}
        </div>

        <PerifaCard tone="mint">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-[var(--link-text)]">
                <ClipboardCheck size={18} />
                Fluxo da atividade
              </p>
              <h2 className="brand-display mt-2 text-4xl">Enviar, receber devolutiva e melhorar</h2>
            </div>
            <div className="grid gap-2 text-sm font-black sm:grid-cols-3">
              {["Rascunho salvo", "Envio para professor", "Feedback da coordenação"].map((item) => (
                <span key={item} className="rounded-lg bg-brand-warm px-3 py-2 text-brand-brown dark:bg-white/10 dark:text-brand-cream">{item}</span>
              ))}
            </div>
          </div>
        </PerifaCard>
      </section>
    </AppShell>
  );
}
