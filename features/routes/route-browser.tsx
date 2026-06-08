"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { RouteCard } from "@/components/cards/route-card";
import { Badge } from "@/components/ui/badge";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export function RouteBrowser() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("todos");
  const [duration, setDuration] = useState("todos");
  const [price, setPrice] = useState("todos");

  const routes = useMemo(() => {
    return tourRoutes.filter((route) => {
      const matchesQuery = `${route.title} ${route.shortDescription} ${route.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesDifficulty = difficulty === "todos" || route.difficulty === difficulty;
      const matchesDuration =
        duration === "todos" ||
        (duration === "curto" && route.durationMinutes <= 150) ||
        (duration === "medio" && route.durationMinutes > 150 && route.durationMinutes <= 210) ||
        (duration === "longo" && route.durationMinutes > 210);
      const matchesPrice =
        price === "todos" ||
        (price === "ate-70" && route.price <= 70) ||
        (price === "ate-90" && route.price <= 90) ||
        (price === "premium" && route.price > 90);

      return matchesQuery && matchesDifficulty && matchesDuration && matchesPrice;
    });
  }, [difficulty, duration, price, query]);

  return (
    <section className="space-y-6">
      <div className="brand-card p-4 dark:bg-brand-dark-soft/90">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_180px]">
          <label className="flex min-h-12 items-center gap-3 rounded-lg bg-brand-warm px-4 text-sm font-bold text-brand-brown">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por roteiro, tag ou territorio"
              className="w-full bg-transparent outline-none placeholder:text-brand-brown/55"
            />
          </label>
          <Filter label="Dificuldade" value={difficulty} onChange={setDifficulty} options={["todos", "leve", "moderada", "intensa"]} />
          <Filter label="Duracao" value={duration} onChange={setDuration} options={["todos", "curto", "medio", "longo"]} />
          <Filter label="Preco" value={price} onChange={setPrice} options={["todos", "ate-70", "ate-90", "premium"]} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone="yellow"><SlidersHorizontal size={14} /> {routes.length} roteiros</Badge>
          <Badge tone="mint">mais procurado: Serra da Misericordia</Badge>
          <Badge tone="orange">roteiros sujeitos a validacao local</Badge>
          <Badge tone="blue">imagens licenciadas</Badge>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {routes.map((route) => (
          <RouteCard key={route.slug} route={route} />
        ))}
        {routes.length === 0 && (
          <div className="brand-card p-6 dark:bg-brand-dark-soft/90 md:col-span-2 xl:col-span-3">
            <h2 className="brand-display text-3xl">Nenhum roteiro encontrado</h2>
            <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
              Ajuste os filtros ou busque por territorio, Penha, Serra, juventude ou impacto.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Filter({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-brand-brown/15 bg-brand-warm px-3 text-sm font-black text-brand-brown outline-none focus:border-brand-mint"
      >
        {options.map((option) => (
          <option key={option} value={option}>{label}: {option}</option>
        ))}
      </select>
    </label>
  );
}
