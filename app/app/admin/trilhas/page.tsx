import { AdminShell } from "@/components/layout/admin-shell";
import { TrackCard } from "@/components/cards/track-card";
import { learningTracks } from "@/lib/mock-data/ecotuca";

export default function AdminTracksPage() {
  return (
    <AdminShell>
      <header className="mb-5">
        <h1 className="text-section-title">Trilhas da formação</h1>
        <p className="mt-2 text-[var(--muted)]">Consulte a organização das trilhas e abra as aulas de exemplo.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {learningTracks.map((track) => <TrackCard key={track.id} track={track} />)}
      </section>
    </AdminShell>
  );
}
