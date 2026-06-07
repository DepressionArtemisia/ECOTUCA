import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { EcoVideoPlayer } from "@/features/video/eco-video-player";
import { Badge } from "@/components/ui/badge";
import { EcoButton } from "@/components/brand/eco-button";
import { learningTracks } from "@/lib/mock-data/ecotuca";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = learningTracks.flatMap((track) => track.lessons).find((item) => item.id === id);
  if (!lesson) notFound();

  return (
    <AppShell title={lesson.title}>
      <section className="mx-auto max-w-5xl space-y-6">
        <div>
          <Badge tone="yellow">Videoaula</Badge>
          <h1 className="brand-display mt-4 text-5xl">{lesson.title}</h1>
          <p className="mt-3 text-brand-brown/75 dark:text-brand-cream/75">{lesson.description}</p>
        </div>
        <EcoVideoPlayer lessonId={lesson.id} title={lesson.title} videoId={lesson.videoId} durationSeconds={lesson.durationMinutes * 60} />
        <div className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
          <h2 className="text-xl font-black">Texto de apoio</h2>
          <p className="mt-2 text-brand-brown/75 dark:text-brand-cream/75">{lesson.supportText}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Assistir video", "Baixar material PDF", "Responder checklist"].map((item, index) => (
              <div key={item} className="rounded-lg bg-brand-warm p-3 text-sm font-black text-brand-brown">
                {index + 1}. {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <EcoButton variant="mint">Marcar como concluida</EcoButton>
            <EcoButton variant="outline">Proxima aula</EcoButton>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
