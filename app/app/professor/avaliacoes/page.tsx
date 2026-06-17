import { ClipboardCheck, MessageSquareText, TimerReset, UserCheck } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { teacherEvaluations } from "@/lib/mock-data/ecotuca";
import type { TeacherEvaluationStatus } from "@/types/domain";

const statusCopy: Record<TeacherEvaluationStatus, { label: string; tone: "yellow" | "coral" | "blue" | "mint" }> = {
  pending: { label: "pendente", tone: "yellow" },
  reviewed: { label: "avaliada", tone: "blue" },
  revision: { label: "revisao", tone: "coral" }
};

const priorityTone = {
  alta: "coral",
  media: "yellow",
  baixa: "mint"
} as const;

export default function TeacherEvaluationsPage() {
  const pendingCount = teacherEvaluations.filter((item) => item.status === "pending").length;
  const summaryItems = [
    { label: "Pendentes", value: String(pendingCount), icon: TimerReset },
    { label: "Em revisao", value: "1", icon: MessageSquareText },
    { label: "Avaliadas", value: "1", icon: UserCheck }
  ];

  return (
    <AppShell title="Avaliacoes" roleContext="teacher">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="brand-card bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
          <Badge tone="yellow">Fila pedagogica</Badge>
          <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">Avaliacoes e feedbacks</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/75">
            Acompanhe evidencias enviadas por alunos, priorize devolutivas e transforme cada atividade em orientacao clara para a proxima pratica.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {summaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg bg-white/10 p-4">
                  <Icon className="text-brand-mint" size={22} />
                  <p className="mt-2 text-xs font-black uppercase text-brand-mint">{item.label}</p>
                  <p className="brand-display mt-1 text-4xl text-brand-yellow">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          {teacherEvaluations.map((item) => {
            const status = statusCopy[item.status];
            return (
              <PerifaCard key={item.id} tone={priorityTone[item.priority]}>
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <Badge tone={status.tone}>{status.label}</Badge>
                      <Badge tone={priorityTone[item.priority]}>prioridade {item.priority}</Badge>
                    </div>
                    <h2 className="brand-display mt-3 text-4xl">{item.activityTitle}</h2>
                    <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
                      {item.studentName} - {item.trackTitle}
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg bg-brand-warm p-4 text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                        <p className="text-xs font-black uppercase text-brand-coral">Evidencia</p>
                        <p className="mt-2 text-sm font-bold">{item.evidence}</p>
                      </div>
                      <div className="rounded-lg bg-brand-warm p-4 text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                        <p className="text-xs font-black uppercase text-brand-blue dark:text-brand-mint">Orientacao sugerida</p>
                        <p className="mt-2 text-sm font-bold">{item.feedbackHint}</p>
                      </div>
                    </div>
                  </div>
                  <aside className="rounded-lg bg-brand-brown p-4 text-brand-cream">
                    <p className="text-xs font-black uppercase text-brand-mint">Enviado</p>
                    <p className="brand-display mt-2 text-3xl text-brand-yellow">{item.submittedAt}</p>
                    <EcoButton className="mt-5 w-full" variant="mint">
                      <ClipboardCheck size={16} />
                      Avaliar
                    </EcoButton>
                  </aside>
                </div>
              </PerifaCard>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
