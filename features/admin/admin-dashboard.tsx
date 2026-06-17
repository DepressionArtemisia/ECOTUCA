"use client";

import Image from "next/image";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2, Download, FileCheck2, UserCheck } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { ImpactRibbon } from "@/components/brand/impact-ribbon";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { MetricCard } from "@/components/cards/metric-card";
import { Badge } from "@/components/ui/badge";
import { adminMetrics, bookingChartData, completionByTrack, demoUsers, impactChartData, learningTracks } from "@/lib/mock-data/ecotuca";

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
    link.download = "ecotuca-impacto.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto min-w-0 max-w-7xl space-y-6">
      <section className="relative min-w-0 overflow-hidden rounded-lg bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
        <Image
          src="/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg"
          alt="Panorama da Zona Norte usado como imagem institucional no painel administrativo"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/90 to-brand-blue/60" />
        <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#FE9440)]" />
        <div className="relative">
          <OfficialLogo variant="horizontal" tone="negative" size="md" />
        </div>
        <p className="relative mt-5 text-sm font-black uppercase text-brand-mint">Centro de comando</p>
        <h1 className="brand-display relative mt-2 text-4xl text-brand-yellow sm:text-5xl">Ensino, usuarios e impacto</h1>
        <p className="relative mt-3 max-w-3xl text-brand-cream/78">
          Visao executiva para coordenacao, aprovacoes, turmas, trilhas, certificados e acompanhamento da jornada ECOTUCA.
        </p>
        <ImpactRibbon
          className="relative mt-5 max-w-4xl"
          items={[
            { label: "aprovacoes na fila", value: String(pending.length) },
            { label: "trilhas ativas", value: String(learningTracks.length) },
            { label: "relatorio CSV", value: "pronto" }
          ]}
        />
      </section>

      <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 xl:grid-cols-5">
        {adminMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="brand-card min-w-0 overflow-hidden p-4 sm:p-5 dark:bg-brand-dark-soft/90">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-blue dark:text-brand-mint">
              <FileCheck2 size={16} />
              Indicadores para edital
            </p>
            <h2 className="brand-display mt-2 text-4xl">Impacto que pode virar evidencia</h2>
            <p className="mt-2 max-w-3xl text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
              Indicadores organizados para gestao e prestacao de contas: formacao, conclusao, certificados, atividades, atendimento, potencial de renda e ODS relacionados.
            </p>
          </div>
          <Badge tone="yellow">gestao educacional</Badge>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {["Jovens inscritos", "Horas de formacao", "Certificados", "Potencial de renda"].map((item) => (
            <div key={item} className="rounded-lg bg-brand-warm p-4 text-sm font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {[
          ["Banco", "Manter SQL, RLS, policies e seeds alinhados ao fluxo de aprovacao."],
          ["Usuarios", "Liberar Auth real apenas para perfis aprovados pela coordenacao."],
          ["Operacao", "Definir turmas, calendario, responsaveis, termos e autorizacoes."],
          ["Identidade", "Substituir logos/imagens por pacote oficial quando enviado."]
        ].map(([item, text]) => (
          <PerifaCard key={item} tone="mint">
            <h2 className="brand-display text-3xl">{item}</h2>
            <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{text}</p>
          </PerifaCard>
        ))}
      </section>

      <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)]">
        <div className="brand-card min-w-0 overflow-hidden p-4 sm:p-5 dark:bg-brand-dark-soft/90">
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
          <div className="mt-6 h-80 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactChartData}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(58,26,22,.15)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alunos" fill="#FCC224" radius={[6, 6, 0, 0]} />
                <Bar dataKey="aulas" fill="#2ACCB5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="certificados" fill="#E9635D" radius={[6, 6, 0, 0]} />
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
                    <div className="min-w-0">
                      <p className="font-black">{user.name}</p>
                      <p className="truncate text-sm">{user.email}</p>
                    </div>
                    <Badge className="shrink-0" tone="coral">{user.status}</Badge>
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
            <p className="text-sm font-black uppercase text-brand-orange">Trilhas acompanhadas</p>
            <div className="mt-4 space-y-3">
              {learningTracks.map((track) => (
                <div key={track.id} className="flex min-w-0 items-center justify-between gap-2 rounded-lg bg-white/80 p-3 text-sm font-bold dark:bg-white/10">
                  <span className="min-w-0 truncate">{track.title}</span>
                  <Badge className="shrink-0 px-2 sm:px-3" tone={track.progressPercent > 50 ? "yellow" : "blue"}>{track.progressPercent}%</Badge>
                </div>
              ))}
            </div>
          </PerifaCard>
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="brand-card min-w-0 overflow-hidden p-4 sm:p-5 dark:bg-brand-dark-soft/90">
          <p className="text-sm font-black uppercase text-brand-orange">Conclusao por trilha</p>
          <div className="mt-5 h-72 min-w-0">
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
        <div className="brand-card min-w-0 overflow-hidden p-4 sm:p-5 dark:bg-brand-dark-soft/90">
          <p className="text-sm font-black uppercase text-brand-coral">Solicitacoes de suporte</p>
          <div className="mt-5 h-72 min-w-0">
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
