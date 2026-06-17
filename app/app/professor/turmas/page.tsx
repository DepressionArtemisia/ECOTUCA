import { BarChart3, ClipboardCheck, UsersRound } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PerifaCard } from "@/components/brand/perifa-card";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { demoUsers, learningTracks, studentActivities } from "@/lib/mock-data/ecotuca";

const classes = [
  {
    name: "Turma Guia Local 2026.1",
    students: 28,
    progress: 64,
    track: "Formacao de Guia Local",
    nextMeeting: "Quinta, 19h"
  },
  {
    name: "Turma Biodiversidade Urbana",
    students: 18,
    progress: 42,
    track: "Meio Ambiente e Biodiversidade",
    nextMeeting: "Sabado, 9h"
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
        <div className="brand-card bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
          <Badge tone="mint">Acompanhamento pedagogico</Badge>
          <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">Turmas e progresso</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/75">
            Veja turmas ativas, atividades pendentes e alunos que precisam de apoio antes da certificacao.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {summaryItems.map((item) => {
            const Icon = item.icon;
            return (
            <PerifaCard key={item.label} tone="mint">
              <Icon className="text-brand-coral" size={26} />
              <p className="mt-3 text-xs font-black uppercase text-brand-coral">{item.label}</p>
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
                    {classItem.students} alunos - proximo encontro {classItem.nextMeeting}
                  </p>
                </div>
                <EcoButton variant="mint">Abrir turma</EcoButton>
              </div>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-black uppercase">
                  <span>Progresso medio</span>
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
              <Badge tone="coral">Alunos em atencao</Badge>
              <h2 className="brand-display mt-3 text-4xl">Acompanhar antes do prazo</h2>
              <p className="mt-2 max-w-2xl text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
                Lista inicial para priorizar contato, devolutiva e acolhimento pedagogico.
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
      </section>
    </AppShell>
  );
}
