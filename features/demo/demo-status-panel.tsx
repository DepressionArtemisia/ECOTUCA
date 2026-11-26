"use client";

import { CheckCircle2, Database, ShieldCheck, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { EcoLink } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";
import { checkDataSourceStatus, getDataSourceStatusSync, type DataSourceStatus } from "@/lib/data/data-source-status";

type LocalSnapshot = {
  progressItems: number;
  bookingItems: number;
  demoSession: boolean;
};

export function DemoStatusPanel() {
  const [status, setStatus] = useState<DataSourceStatus>(() => getDataSourceStatusSync());
  const [snapshot, setSnapshot] = useState<LocalSnapshot>({
    progressItems: 0,
    bookingItems: 0,
    demoSession: false
  });

  useEffect(() => {
    checkDataSourceStatus().then(setStatus).catch(() => setStatus(getDataSourceStatusSync()));

    const keys = Object.keys(window.localStorage);
    const progressItems = keys.filter((key) => key.startsWith("ecotuca:video-progress:")).length;
    const rawBookings = window.localStorage.getItem("ecotuca-route-interests");
    let bookingItems = 0;
    try {
      bookingItems = rawBookings ? JSON.parse(rawBookings).length : 0;
    } catch {
      bookingItems = 0;
    }
    setSnapshot({
      progressItems,
      bookingItems,
      demoSession: Boolean(window.localStorage.getItem("ecotuca-demo-user"))
    });
  }, []);

  const hybrid = status.supabaseConfigured ? "hibrido" : "demo";

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
      <PerifaCard tone="mint">
        <div className="flex flex-wrap gap-2">
          <Badge tone={status.supabaseReachable ? "mint" : "yellow"}>
            {status.label}
          </Badge>
          <Badge tone="blue">Modo {hybrid}</Badge>
        </div>
        <h1 className="brand-display mt-5 text-5xl">Status técnico da demo</h1>
        <p className="mt-3 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
          Diagnostico sem exibir chaves. A demo continua operando com fallback local mesmo se Supabase falhar.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <StatusItem label="Supabase configurado" ok={status.supabaseConfigured} />
          <StatusItem label="Supabase reachable" ok={Boolean(status.supabaseReachable)} />
          <StatusItem label="Fallback ativo" ok={status.usingFallback} />
          <StatusItem label="LocalStorage ativo" ok={status.localStorageActive} />
        </div>
      </PerifaCard>

      <PerifaCard tone="yellow">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-blue">
          <ShieldCheck size={16} />
          Segurança
        </p>
        <ul className="mt-4 space-y-3 text-sm font-bold">
          <li className="rounded-lg bg-white/75 p-3 dark:bg-white/10">Nenhuma chave real e mostrada nesta tela.</li>
          <li className="rounded-lg bg-white/75 p-3 dark:bg-white/10">Service role fica restrita a scripts server-side.</li>
          <li className="rounded-lg bg-white/75 p-3 dark:bg-white/10">SQL não e aplicado automaticamente pela UI.</li>
        </ul>
      </PerifaCard>

      <PerifaCard tone="blue">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase">
          <Database size={16} />
          Áreas integradas
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <StatusLine title="Auth real" detail={status.supabaseReachable ? "Tenta Supabase Auth antes do demo." : "Fallback demo ativo."} />
          <StatusLine title="Lesson progress" detail="LocalStorage sempre; Supabase quando user_id e lesson_id forem UUID reais." />
          <StatusLine title="Route bookings" detail="Tenta route_bookings; roteiros mock ficam salvos localmente." />
          <StatusLine title="Admin aprovações" detail="Tenta profiles pending/update; simula se RLS ou conexão bloquearem." />
          <StatusLine title="Storage" detail="Upload preparado para lesson-materials com fallback de apresentacao." />
          <StatusLine title="Ultimo teste" detail="Rodada 3 em 07/06/2026." />
        </div>
      </PerifaCard>

      <PerifaCard tone="coral">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase">
          <TriangleAlert size={16} />
          Snapshot local
        </p>
        <div className="mt-4 space-y-3 text-sm font-bold">
          <p className="rounded-lg bg-white/75 p-3 dark:bg-white/10">Progressos locais: {snapshot.progressItems}</p>
          <p className="rounded-lg bg-white/75 p-3 dark:bg-white/10">Reservas locais: {snapshot.bookingItems}</p>
          <p className="rounded-lg bg-white/75 p-3 dark:bg-white/10">Sessão demo ativa: {snapshot.demoSession ? "sim" : "nao"}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <EcoLink href="/demo" variant="mint">Voltar para demo</EcoLink>
          <EcoLink href="/app/aluno" variant="outline">Testar aluno</EcoLink>
        </div>
      </PerifaCard>
    </div>
  );
}

function StatusItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="rounded-lg bg-white/75 p-3 text-sm font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
      <CheckCircle2 className={ok ? "mr-2 inline text-brand-mint" : "mr-2 inline text-[var(--accent-text)]"} size={17} />
      {label}: {ok ? "sim" : "nao"}
    </div>
  );
}

function StatusLine({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg bg-white/75 p-3 dark:bg-white/10">
      <p className="font-black">{title}</p>
      <p className="mt-1 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{detail}</p>
    </div>
  );
}
