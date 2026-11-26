import { BarChart3, ClipboardCheck, UsersRound } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PerifaCard } from "@/components/brand/perifa-card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { demoUsers, learningTracks, studentActivities } from "@/lib/mock-data/ecotuca";

const classes = [
  {
    name: "Turma Guia Local 2026.1",
    students: 28,
    progress: 64,
    track: "Formação de Guia Local",
    nextMeeting: "Quinta, 19h"
  },
  {
    name: "Turma Biodiversidade Urbana",
    students: 18,
    progress: 42,
    track: "Meio Ambiente e Biodiversidade",
    nextMeeting: "Sábado, 9h"
  }
];

export default function TeacherClassesPage() {
  const students = demoUsers.filter((user) => user.role === "student");
  const summaryItems = [
    { label: "Alunos acompanhados", value: "46", icon: UsersRound },
    { label: "Atividades abertas", value: String(studentActivities.length), icon: ClipboardCheck },
    { label: "Trilhas ativas", value: String(learningTracks.length), icon: BarChart3 }
  ];

  return (
    <AppShell title="Turmas" roleContext="teacher">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="brand-card workspace-callout p-5 sm:p-6">
          <Badge>Dados de exemplo</Badge>
          <h1 className="brand-display mt-4 text-5xl text-[var(--foreground)] sm:text-6xl">Turmas e progresso</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold text-[var(--muted)]">
            Veja turmas ativas, atividades pendentes e alunos que precisam de apoio antes da certificação.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {summaryItems.map((item) => {
            const Icon = item.icon;
            return (
            <PerifaCard key={item.label} tone="mint">
              <Icon className="text-[var(--accent-text)]" size={26} />
              <p className="mt-3 text-xs font-black uppercase text-[var(--accent-text)]">{item.label}</p>
              <p className="brand-display mt-1 text-4xl">{item.value}</p>
            </PerifaCard>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {classes.map((classItem) => (
            <PerifaCard key={classItem.name} tone="yellow">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge tone="blue">{classItem.track}</Badge>
                  <h2 className="brand-display mt-3 text-4xl">{classItem.name}</h2>
                  <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
                    {classItem.students} alunos - próximo encontro {classItem.nextMeeting}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-black uppercase">
                  <span>Progresso médio</span>
                  <span>{classItem.progress}%</span>
                </div>
                <Progress value={classItem.progress} tone="mint" />
              </div>
            </PerifaCard>
          ))}
        </div>

        <PerifaCard tone="coral">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge tone="coral">Acompanhamento individual</Badge>
              <h2 className="brand-display mt-3 text-4xl">Acompanhar antes do prazo</h2>
              <p className="mt-2 max-w-2xl text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
                Lista inicial para priorizar contato, devolutiva e acolhimento pedagógico.
              </p>
            </div>
            <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-2">
              {students.map((student) => (
                <div key={student.email} className="rounded-lg bg-brand-warm p-4 text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                  <p className="font-black">{student.name}</p>
                  <p className="mt-1 truncate text-xs font-bold opacity-75">{student.email}</p>
                  <Badge className="mt-3" tone={student.status === "approved" ? "mint" : "yellow"}>{student.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </PerifaCard>
        <Link href="/app/professor/avaliacoes" className="inline-action">Consultar entregas para avaliação</Link>
      </section>
    </AppShell>
  );
}
