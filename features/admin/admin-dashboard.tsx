"use client";

import Link from "next/link";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, ChartNoAxesColumn, ClipboardCheck, FileSpreadsheet, GraduationCap } from "lucide-react";
import { MetricCard } from "@/components/cards/metric-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { adminMetrics, bookingChartData, completionByTrack, impactChartData } from "@/lib/mock-data/ecotuca";

const shortcuts = [
  { title: "Aprovações", description: "Revise inscrições e libere o acesso a perfis pendentes.", href: "/app/admin/aprovacoes", icon: ClipboardCheck },
  { title: "Conteúdos", description: "Consulte as aulas e os materiais em revisão.", href: "/app/admin/conteudos", icon: GraduationCap },
  { title: "Relatórios", description: "Consulte a série mensal e exporte a planilha.", href: "/app/admin/relatorios", icon: FileSpreadsheet }
];
const tooltipStyle = { backgroundColor: "var(--card)", borderColor: "var(--control-border)", color: "var(--foreground)", borderRadius: 10 };
const axes = { tick: { fontSize: 12 }, tickLine: false, axisLine: false };

export function AdminDashboard({ indicatorsOnly = false }: { indicatorsOnly?: boolean }) {
  return (
    <div className="workspace-grid">
      <header className="workspace-intro">
        <div>
          <p className="section-label"><span /> Coordenação</p>
          <h1 className="text-display-lg mt-2">{indicatorsOnly ? "Indicadores de impacto" : "Visão geral"}</h1>
          <p className="mt-3 max-w-[60ch] text-[var(--muted)]">{indicatorsOnly
            ? "Acompanhe a participação dos alunos, o avanço nas trilhas e a emissão de certificados."
            : "Acompanhe as inscrições, o andamento da formação e os dados de prestação de contas."}</p>
        </div>
        {indicatorsOnly ? <Link href="/app/admin/relatorios" className={buttonVariants({ variant: "outline" })}><FileSpreadsheet size={17} /> Abrir relatórios</Link>
          : <Link href="/app/admin/aprovacoes" className={buttonVariants()}><ClipboardCheck size={17} /> Revisar inscrições</Link>}
      </header>

      {!indicatorsOnly && (
        <section className="grid gap-3 md:grid-cols-3" aria-label="Atalhos da coordenação">
          {shortcuts.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href} className="brand-card workspace-shortcut">
              <span className="workspace-icon"><Icon size={21} aria-hidden="true" /></span>
              <ArrowRight size={18} className="ml-auto" aria-hidden="true" />
              <h2>{title}</h2>
              <p>{description}</p>
            </Link>
          ))}
        </section>
      )}

      <section aria-labelledby="indicadores-resumo">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="indicadores-resumo" className="text-section-title">{indicatorsOnly ? "Resumo do período" : "Acompanhamento da formação"}</h2>
          <Badge>Dados de exemplo</Badge>
        </div>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {adminMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
      </section>

      <section className="brand-card min-w-0 p-4 sm:p-6" aria-labelledby="impacto-mensal">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-card-title" id="impacto-mensal">Evolução mensal</h2>
          {!indicatorsOnly && <Link href="/app/admin/metricas" className="inline-action text-sm"><ChartNoAxesColumn size={17} /> Ver indicadores</Link>}
        </div>
        <div className="mt-4 h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactChartData} margin={{ top: 8, right: 4, bottom: 4, left: -14 }}>
              <CartesianGrid strokeDasharray="3 4" vertical={false} />
              <XAxis {...axes} dataKey="month" />
              <YAxis {...axes} width={52} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="alunos" name="Alunos" fill="#FCC224" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="aulas" name="Aulas" fill="#6D90D1" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="certificados" name="Certificados" fill="#40A28D" radius={[3, 3, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {indicatorsOnly && (
        <div className="grid min-w-0 gap-4 xl:grid-cols-2">
          <section className="brand-card min-w-0 p-4 sm:p-6">
            <h2 className="text-card-title">Conclusão por trilha</h2>
            <div className="mt-4 h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionByTrack} margin={{ right: 4, left: -14 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 4" />
                  <XAxis {...axes} dataKey="name" />
                  <YAxis {...axes} width={52} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Bar dataKey="concluidas" name="Concluídas" fill="#40A28D" isAnimationActive={false} />
                  <Bar dataKey="andamento" name="Em andamento" fill="#FCC224" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className="brand-card min-w-0 p-4 sm:p-6">
            <h2 className="text-card-title">Solicitações de suporte</h2>
            <div className="mt-4 h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingChartData} margin={{ right: 8, left: -14 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 4" />
                  <XAxis {...axes} dataKey="week" />
                  <YAxis {...axes} width={52} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="solicitacoes" name="Solicitações" stroke="#E9635D" strokeWidth={3} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
