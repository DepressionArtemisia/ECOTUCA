import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { EcoVideoPlayer } from "@/features/video/eco-video-player";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { learningTracks } from "@/lib/mock-data/ecotuca";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const track = learningTracks.find((entry) => entry.lessons.some((lesson) => lesson.id === id));
  const lesson = track?.lessons.find((entry) => entry.id === id);
  if (!track || !lesson) notFound();
  const next = track.lessons[track.lessons.indexOf(lesson) + 1];

  return (
    <AppShell title={lesson.title} roleContext="student">
      <section className="mx-auto max-w-5xl space-y-5">
        <header className="workspace-intro">
          <div>
            <Link href={`/app/aluno/trilhas/${track.id}`} className="inline-action text-sm">Voltar à trilha</Link>
            <p><Badge>Videoaula de exemplo</Badge></p>
            <h1 className="text-display-lg mt-2">{lesson.title}</h1>
            <p className="mt-3 max-w-[70ch] text-[var(--muted)]">{lesson.description}</p>
          </div>
        </header>
        <EcoVideoPlayer lessonId={lesson.id} title={lesson.title} videoId={lesson.videoId} durationSeconds={lesson.durationMinutes * 60} />
        <div className="brand-card p-5 sm:p-6">
          <h2 className="text-card-title">Pratique o que aprendeu</h2>
          <p className="mt-2 max-w-[72ch] text-[var(--muted)]">{lesson.supportText}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/app/aluno/atividades" className={buttonVariants({ variant: "outline" })}>Ver atividades</Link>
            {next && <Link href={`/app/aluno/aulas/${next.id}`} className={buttonVariants()}>Próxima aula</Link>}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
