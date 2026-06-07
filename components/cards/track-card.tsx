import Link from "next/link";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LearningTrack } from "@/types/domain";

export function TrackCard({ track }: { track: LearningTrack }) {
  return (
    <article className="rounded-lg border border-brand-brown/10 bg-white p-5 shadow-brand dark:border-brand-yellow/15 dark:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <Badge tone={track.accent}>{track.category}</Badge>
        <GraduationCap size={24} className="text-brand-brown/60 dark:text-brand-yellow" />
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
      <Link href={`/app/aluno/trilhas/${track.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-blue dark:text-brand-mint">
        Abrir trilha
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
