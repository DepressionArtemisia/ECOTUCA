import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LearningTrack } from "@/types/domain";

export function TrackCard({ track }: { track: LearningTrack }) {
  return (
    <article className="brand-card flex min-w-0 flex-col items-start p-5">
      <Badge>{track.category}</Badge>
      <h3 className="text-card-title mt-3 [overflow-wrap:anywhere]">{track.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{track.description}</p>
      <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 text-sm font-bold">
        <span className="inline-flex items-center gap-2"><Clock size={16} aria-hidden="true" /> {track.estimatedHours} h</span>
        <span>{track.progressPercent}%</span>
      </div>
      <Progress value={track.progressPercent} label={`Progresso em ${track.title}`} className="mt-2" />
      <Link href={`/app/aluno/trilhas/${track.id}`} className="inline-action mt-3 text-sm" aria-label={`Abrir trilha ${track.title}`}>
        Abrir trilha <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
