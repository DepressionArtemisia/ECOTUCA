import { BookOpen, FileUp, MessageCircle, UsersRound } from "lucide-react";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { forumTopics, learningTracks } from "@/lib/mock-data/ecotuca";

export function TeacherDashboard() {
  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div className="rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
        <Badge tone="yellow">Professor</Badge>
        <h1 className="brand-display mt-4 text-5xl text-brand-yellow">Prof. Mariana Costa</h1>
        <p className="mt-3 max-w-2xl text-brand-cream/80">
          Acompanhe turmas, publique materiais e responda duvidas da comunidade ECOTUCA.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <PerifaCard tone="yellow"><UsersRound size={26} /><p className="mt-3 text-3xl font-black">3 turmas</p><p className="text-sm">128 alunos</p></PerifaCard>
        <PerifaCard tone="mint"><BookOpen size={26} /><p className="mt-3 text-3xl font-black">18 aulas</p><p className="text-sm">12 publicadas</p></PerifaCard>
        <PerifaCard tone="coral"><MessageCircle size={26} /><p className="mt-3 text-3xl font-black">16 duvidas</p><p className="text-sm">5 pendentes</p></PerifaCard>
        <PerifaCard tone="blue"><FileUp size={26} /><p className="mt-3 text-3xl font-black">9 PDFs</p><p className="text-sm">materiais preparados</p></PerifaCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
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
        <div className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
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
