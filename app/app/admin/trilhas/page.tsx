import { AdminShell } from "@/components/layout/admin-shell";
import { TrackCard } from "@/components/cards/track-card";
import { learningTracks } from "@/lib/mock-data/ecotuca";

export default function AdminTracksPage() {
  return (
    <AdminShell>
      <section className="grid gap-4 md:grid-cols-3">
        {learningTracks.map((track) => <TrackCard key={track.id} track={track} />)}
      </section>
    </AdminShell>
  );
}
