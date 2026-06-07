import Link from "next/link";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LearningTrack } from "@/types/domain";

export function TrackCard({ track }: { track: LearningTrack }) {
  return (
    <article className="brand-card brand-card-hover p-5 dark:bg-brand-dark-soft/90">
      <div className="flex items-start justify-between gap-4">
        <Badge tone={track.accent}>{track.category}</Badge>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-yellow/45 text-brand-brown dark:bg-brand-yellow dark:text-brand-brown">
          <GraduationCap size={22} />
        </span>
      </div>
      <h3 className="brand-display mt-4 text-3xl text-brand-brown dark:text-brand-yellow">{track.title}</h3>
      <p className="mt-3 text-sm text-brand-brown/70 dark:text-brand-cream/75">{track.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm font-black">
        <span className="inline-flex items-center gap-2">
          <Clock size={16} />
          {track.estimatedHours}h
        </span>
        <span>{track.progressPercent}%</span>
      </div>
      <Progress value={track.progressPercent} tone={track.accent} className="mt-2" />
      <Link href={`/app/aluno/trilhas/${track.id}`} className="focus-ring-brand mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-black text-brand-blue dark:text-brand-mint">
        Abrir trilha
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
