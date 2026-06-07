"use client";

import { Clock3, MapPinned } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { listRouteBookings, type StoredRouteBooking } from "@/lib/data/bookings";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

const sourceLabels = {
  supabase: "Base conectada",
  localStorage: "Salvo para apresentacao",
  mock: "Modo demonstracao"
};

const statusLabels: Record<string, string> = {
  pending: "pendente",
  favorite: "favorito",
  approved: "aprovado",
  rejected: "rejeitado"
};

const mockBookings: StoredRouteBooking[] = [
  {
    id: "mock-serra",
    routeSlug: "serra-da-misericordia",
    name: "Camila Ferreira",
    email: "turista@ecotuca.local",
    phone: "(21) 90000-0000",
    preferredDate: "2026-07-12",
    peopleCount: 4,
    message: "A equipe ECOTUCA vai confirmar o guia.",
    status: "pending",
    createdAt: "2026-06-07T12:00:00.000Z",
    source: "mock"
  },
  {
    id: "mock-verde",
    routeSlug: "caminho-verde-do-alemao",
    name: "Camila Ferreira",
    email: "turista@ecotuca.local",
    phone: "(21) 90000-0000",
    preferredDate: "",
    peopleCount: 2,
    message: "Salvo para proxima visita.",
    status: "favorite",
    createdAt: "2026-06-07T12:05:00.000Z",
    source: "mock"
  }
];

export function TouristBookingsList() {
  const [bookings, setBookings] = useState<StoredRouteBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listRouteBookings()
      .then((items) => {
        if (!active) return;
        setBookings(items.length ? items : mockBookings);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const renderedBookings = useMemo(() => bookings.length ? bookings : mockBookings, [bookings]);

  if (loading) {
    return <div className="rounded-lg bg-white p-5 font-black shadow-brand dark:bg-white/10">Carregando reservas...</div>;
  }

  return (
    <div className="space-y-4">
      {renderedBookings.map((booking) => {
        const route = tourRoutes.find((item) => item.slug === booking.routeSlug);
        return (
          <article key={booking.id} className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
            <div className="flex flex-wrap gap-2">
              <Badge tone={booking.status === "pending" ? "coral" : "yellow"}>{statusLabels[booking.status] ?? booking.status}</Badge>
              <Badge tone={booking.source === "supabase" ? "mint" : booking.source === "localStorage" ? "orange" : "blue"}>
                {sourceLabels[booking.source]}
              </Badge>
            </div>
            <h2 className="mt-3 flex items-center gap-2 text-xl font-black">
              <MapPinned size={18} />
              {route?.title ?? "Roteiro ECOTUCA"}
            </h2>
            <p className="mt-1 text-sm text-brand-brown/70 dark:text-brand-cream/70">{booking.message}</p>
            <div className="mt-4 grid gap-3 text-sm font-bold sm:grid-cols-3">
              <span className="rounded-lg bg-brand-warm p-3 text-brand-brown">Nome: {booking.name}</span>
              <span className="rounded-lg bg-brand-warm p-3 text-brand-brown">Pessoas: {booking.peopleCount}</span>
              <span className="rounded-lg bg-brand-warm p-3 text-brand-brown">
                <Clock3 className="mr-1 inline" size={15} />
                {booking.preferredDate || "Data a combinar"}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
