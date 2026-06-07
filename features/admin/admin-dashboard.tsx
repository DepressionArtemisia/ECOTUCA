"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2, Download, UserCheck } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { ImpactRibbon } from "@/components/brand/impact-ribbon";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { MetricCard } from "@/components/cards/metric-card";
import { Badge } from "@/components/ui/badge";
import { adminMetrics, bookingChartData, completionByTrack, demoUsers, impactChartData, tourRoutes } from "@/lib/mock-data/ecotuca";

export function AdminDashboard() {
  const pending = demoUsers.filter((user) => user.status === "pending");

  function exportCsv() {
    const rows = [
      ["metric", "value", "detail"],
      ...adminMetrics.map((metric) => [metric.label, metric.value, metric.detail])
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ecotuca-impacto-demo.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
        <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#FE9440)]" />
        <OfficialLogo variant="horizontal" tone="negative" size="md" />
        <p className="mt-5 text-sm font-black uppercase text-brand-mint">Centro de comando</p>
        <h1 className="brand-display mt-2 text-5xl text-brand-yellow">Impacto, usuarios e roteiros</h1>
        <p className="mt-3 max-w-3xl text-brand-cream/78">
          Visao executiva para coordenacao, aprovacoes, prestacao de contas e acompanhamento da jornada ECOTUCA.
        </p>
        <ImpactRibbon
          className="mt-5 max-w-4xl"
          items={[
            { label: "aprovacoes na fila", value: String(pending.length) },
            { label: "roteiros ativos", value: String(tourRoutes.length) },
            { label: "relatorio CSV", value: "pronto" }
          ]}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {adminMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase text-brand-coral">Prestacao de contas</p>
              <h2 className="brand-display text-4xl">Impacto mensal</h2>
            </div>
            <EcoButton variant="outline" onClick={exportCsv}>
              <Download size={17} />
              CSV
            </EcoButton>
          </div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactChartData}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(58,26,22,.15)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alunos" fill="#FCC224" radius={[6, 6, 0, 0]} />
                <Bar dataKey="aulas" fill="#2ACCB5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="roteiros" fill="#E9635D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <PerifaCard tone="coral">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-coral">
              <UserCheck size={16} />
              Fila de aprovacoes
            </p>
            <div className="mt-4 space-y-3">
              {pending.map((user) => (
                <div key={user.email} className="rounded-lg bg-brand-warm p-4 text-brand-brown">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black">{user.name}</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                    <Badge tone="coral">{user.status}</Badge>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <EcoButton size="sm" variant="mint">
                      <CheckCircle2 size={15} />
                      Aprovar
                    </EcoButton>
                    <EcoButton size="sm" variant="outline">Revisar</EcoButton>
                  </div>
                </div>
              ))}
            </div>
          </PerifaCard>

          <PerifaCard tone="orange">
            <p className="text-sm font-black uppercase text-brand-orange">Roteiros publicados</p>
            <div className="mt-4 space-y-3">
              {tourRoutes.slice(0, 4).map((route) => (
                <div key={route.slug} className="flex items-center justify-between rounded-lg bg-white/80 p-3 text-sm font-bold dark:bg-white/10">
                  <span>{route.title}</span>
                  <Badge tone={route.featured ? "yellow" : "blue"}>{route.featured ? "destaque" : "publicado"}</Badge>
                </div>
              ))}
            </div>
          </PerifaCard>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
          <p className="text-sm font-black uppercase text-brand-orange">Conclusao por trilha</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionByTrack}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(58,26,22,.15)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="concluidas" fill="#2ACCB5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="andamento" fill="#FCC224" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
          <p className="text-sm font-black uppercase text-brand-coral">Solicitacoes de roteiros</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingChartData}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(58,26,22,.15)" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="solicitacoes" stroke="#E9635D" strokeWidth={4} dot={{ fill: "#FCC224", r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
