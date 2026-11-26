"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { RouteCard } from "@/components/cards/route-card";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().toLowerCase();
}

export function RouteBrowser() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const routes = tourRoutes.filter((route) => {
    const searchable = normalize(`${route.title} ${route.shortDescription} ${route.tags.join(" ")}`);
    return searchable.includes(normalize(query))
      && (!difficulty || route.difficulty === difficulty)
      && (!duration || (duration === "curto" ? route.durationMinutes <= 150 : route.durationMinutes > 150));
  });

  return (
    <section className="space-y-4" aria-label="Explore os roteiros">
      <div className="brand-card p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block min-w-0 text-sm font-bold">
            <span className="inline-flex items-center gap-2"><Search size={16} aria-hidden="true" /> Buscar roteiro</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: Serra da Misericórdia" className="field-control mt-1 w-full" />
          </label>
          <label className="block min-w-0 text-sm font-bold">
            Dificuldade
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="field-control mt-1 w-full">
              <option value="">Todas</option><option value="leve">Leve</option><option value="moderada">Moderada</option><option value="intensa">Intensa</option>
            </select>
          </label>
          <label className="block min-w-0 text-sm font-bold">
            Duração estimada
            <select value={duration} onChange={(event) => setDuration(event.target.value)} className="field-control mt-1 w-full">
              <option value="">Todas</option><option value="curto">Até 2h30</option><option value="longo">Mais de 2h30</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]" role="status">{routes.length} {routes.length === 1 ? "roteiro encontrado" : "roteiros encontrados"}</p>
      </div>
      {routes.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {routes.map((route) => <RouteCard key={route.slug} route={route} />)}
        </div>
      ) : (
        <div className="brand-card p-5">
          <h2 className="text-card-title">Nenhum roteiro encontrado</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Experimente outro nome ou ajuste os filtros.</p>
          <button type="button" className="inline-action mt-2 text-sm" onClick={() => { setQuery(""); setDifficulty(""); setDuration(""); }}>Limpar filtros</button>
        </div>
      )}
    </section>
  );
}
