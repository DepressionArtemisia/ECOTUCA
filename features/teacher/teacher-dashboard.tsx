import Image from "next/image";
import { BookOpen, ClipboardCheck, FileUp, MessageCircle, TimerReset, UsersRound } from "lucide-react";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { forumTopics, learningTracks } from "@/lib/mock-data/ecotuca";

export function TeacherDashboard() {
  const contentStates = [
    { label: "Rascunhos", value: "5", detail: "aulas em preparo", tone: "yellow" as const, icon: FileUp },
    { label: "Em curadoria", value: "3", detail: "materiais para revisar", tone: "coral" as const, icon: ClipboardCheck },
    { label: "Publicadas", value: "12", detail: "aulas disponiveis", tone: "mint" as const, icon: BookOpen },
    { label: "Proximas respostas", value: "5", detail: "duvidas pendentes", tone: "blue" as const, icon: TimerReset }
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div className="relative overflow-hidden rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
        <Image
          src="/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg"
          alt="Vista do Complexo do Alemao usada como contexto pedagogico"
          fill
          className="object-cover opacity-[.18]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/88 to-brand-blue/45" />
        <div className="relative">
          <OfficialLogo variant="horizontal" tone="negative" size="md" />
        </div>
        <div className="relative mt-5">
          <Badge tone="yellow">Professor facilitador</Badge>
        </div>
        <h1 className="brand-display relative mt-4 text-5xl text-brand-yellow">Prof. Mariana Costa</h1>
        <p className="relative mt-3 max-w-2xl text-brand-cream/80">
          Acompanhe turmas, publique materiais, responda duvidas e conecte cada conteudo ao territorio.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <PerifaCard tone="yellow"><UsersRound size={26} /><p className="mt-3 text-3xl font-black">3 turmas</p><p className="text-sm">128 alunos</p></PerifaCard>
        <PerifaCard tone="mint"><BookOpen size={26} /><p className="mt-3 text-3xl font-black">18 aulas</p><p className="text-sm">12 publicadas</p></PerifaCard>
        <PerifaCard tone="coral"><MessageCircle size={26} /><p className="mt-3 text-3xl font-black">16 duvidas</p><p className="text-sm">5 pendentes</p></PerifaCard>
        <PerifaCard tone="blue"><FileUp size={26} /><p className="mt-3 text-3xl font-black">9 PDFs</p><p className="text-sm">material em preparacao</p></PerifaCard>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contentStates.map((state) => {
          const Icon = state.icon;
          return (
            <PerifaCard key={state.label} tone={state.tone}>
              <Icon size={24} />
              <p className="mt-3 text-sm font-black uppercase text-brand-brown/65 dark:text-brand-cream/70">{state.label}</p>
              <p className="brand-display mt-1 text-4xl">{state.value}</p>
              <p className="text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{state.detail}</p>
            </PerifaCard>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
          <h2 className="brand-display text-4xl">Progresso das trilhas</h2>
          <div className="mt-4 space-y-4">
            {learningTracks.map((track) => (
              <div key={track.id}>
                <div className="mb-2 flex justify-between text-sm font-black">
                  <span>{track.title}</span>
                  <span>{track.progressPercent}%</span>
                </div>
                <Progress value={track.progressPercent} tone={track.accent} />
              </div>
            ))}
          </div>
        </div>
        <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
          <h2 className="brand-display text-4xl">Forum para responder</h2>
          <div className="mt-4 space-y-3">
            {forumTopics.map((topic) => (
              <div key={topic.title} className="rounded-lg bg-brand-warm p-3 text-brand-brown">
                <p className="font-black">{topic.title}</p>
                <p className="text-xs font-bold">{topic.replies} respostas - {topic.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
