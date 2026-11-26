import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, ClipboardCheck, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrackCard } from "@/components/cards/track-card";
import { StudentJourneyMap } from "@/features/student/student-journey-map";
import { learningTracks, notices } from "@/lib/mock-data/ecotuca";
import { getMediaAsset } from "@/lib/mock-data/media-assets";

const currentLesson = learningTracks[0].lessons[0];
const territory = getMediaAsset("visao-do-complexo");

export function StudentDashboard() {
  return (
    <div className="workspace-grid">
      <header className="workspace-intro">
        <div>
          <p className="section-label"><span /> Formação</p>
          <h1 className="text-display-lg mt-2">Área do aluno</h1>
          <p className="mt-3 max-w-[55ch] text-[var(--muted)]">Continue suas aulas, confira as próximas atividades e acompanhe sua formação.</p>
        </div>
        <Link href="/app/aluno/atividades" className={buttonVariants({ variant: "outline" })}><ClipboardCheck size={17} aria-hidden="true" /> Ver atividades</Link>
      </header>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,.75fr)]">
        <section className="brand-card grid overflow-hidden sm:grid-cols-[1.1fr_.9fr]">
          <div className="p-5 sm:p-6">
            <Badge tone="yellow">Próxima aula no exemplo</Badge>
            <h2 className="text-card-title mt-3">{currentLesson.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{learningTracks[0].title} · {currentLesson.durationMinutes} min</p>
            <Link className={buttonVariants({ className: "mt-5" })} href={`/app/aluno/aulas/${currentLesson.id}`}>
              <Play size={17} aria-hidden="true" /> Continuar aula
            </Link>
          </div>
          <div className="relative min-h-36 sm:min-h-full">
            <Image src={territory.src} alt={territory.alt} fill sizes="(max-width: 639px) 90vw, 400px" className="object-cover" />
          </div>
        </section>
        <section className="brand-card p-5 sm:p-6">
          <div className="flex items-center gap-3"><Bell size={20} aria-hidden="true" /><h2 className="text-card-title">Avisos da turma</h2></div>
          <ul className="mt-4 divide-y divide-[var(--border-soft)] text-sm text-[var(--muted)]">
            {notices.map((notice) => <li key={notice} className="py-2">{notice}</li>)}
          </ul>
          <Link href="/app/notificacoes" className="inline-action mt-2 text-sm">Ver notificações <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      </div>
      <section aria-labelledby="minhas-trilhas">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-section-title" id="minhas-trilhas">Minhas trilhas</h2>
          <Badge>Progresso de exemplo</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {learningTracks.map((track) => <TrackCard key={track.id} track={track} />)}
        </div>
      </section>
      <StudentJourneyMap />
    </div>
  );
}
