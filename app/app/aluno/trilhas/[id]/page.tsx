import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayCircle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { learningTracks } from "@/lib/mock-data/ecotuca";

export default async function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const track = learningTracks.find((item) => item.id === id);
  if (!track) notFound();

  return (
    <AppShell title={track.title}>
      <section className="mx-auto max-w-5xl">
        <Badge tone={track.accent}>{track.category}</Badge>
        <h1 className="brand-display mt-4 text-5xl">{track.title}</h1>
        <p className="mt-3 max-w-3xl text-brand-brown/75 dark:text-brand-cream/75">{track.description}</p>
        <div className="mt-5 max-w-xl">
          <Progress value={track.progressPercent} tone={track.accent} />
        </div>
        <div className="mt-8 space-y-4">
          {track.lessons.map((lesson) => {
            return (
            <article key={lesson.id} className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge tone={lesson.status === "completed" ? "mint" : "yellow"}>{{ completed: "Concluída", in_progress: "Em andamento", not_started: "A iniciar" }[lesson.status]}</Badge>
                  <h2 className="mt-3 text-xl font-black">{lesson.title}</h2>
                  <p className="mt-1 text-sm text-brand-brown/70 dark:text-brand-cream/70">{lesson.description}</p>
                  <p className="mt-2 text-xs font-black text-[var(--accent-text)]">{lesson.durationMinutes} min - {lesson.progressPercent}%</p>
                </div>
                <Link href={`/app/aluno/aulas/${lesson.id}`} className={buttonVariants({ variant: "outline", className: "shrink-0" })}>
                  <PlayCircle size={16} aria-hidden="true" /> Abrir aula
                </Link>
              </div>
            </article>
          );
          })}
        </div>
      </section>
    </AppShell>
  );
}
