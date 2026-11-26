import { AppShell } from "@/components/layout/app-shell";
import { TrackCard } from "@/components/cards/track-card";
import { Badge } from "@/components/ui/badge";
import { learningTracks } from "@/lib/mock-data/ecotuca";

export default function StudentTracksPage() {
  return (
    <AppShell title="Trilhas de aprendizagem">
      <section className="mx-auto max-w-7xl">
        <Badge tone="mint">Trilhas</Badge>
        <h1 className="brand-display mt-4 text-5xl">Formação ECOTUCA</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {learningTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
