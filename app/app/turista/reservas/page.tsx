import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { TouristBookingsList } from "@/features/routes/tourist-bookings-list";

export default function TouristBookingsPage() {
  return (
    <AppShell title="Reservas" roleContext="tourist">
      <section className="mx-auto max-w-5xl space-y-4">
        <Badge tone="mint">Histórico de solicitações</Badge>
        <h1 className="brand-display text-5xl">Reservas e interesses</h1>
        <TouristBookingsList />
      </section>
    </AppShell>
  );
}
