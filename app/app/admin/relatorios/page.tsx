import { BarChart3, Download, FileCheck2, TrendingUp } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { adminReportRows, adminReportSnapshots } from "@/lib/mock-data/ecotuca";

export default function AdminReportsPage() {
  return (
    <AdminShell>
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="brand-card bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
          <Badge tone="yellow">Prestacao de contas</Badge>
          <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">Relatorios</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/75">
            Consolide indicadores de aprendizagem, aprovacoes, certificados, suporte e impacto para coordenacao, parceiros e editais.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <EcoButton variant="mint">
              <Download size={17} />
              Exportar CSV
            </EcoButton>
            <EcoButton variant="outline">
              <FileCheck2 size={17} />
              Preparar PDF
            </EcoButton>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminReportSnapshots.map((item) => (
            <PerifaCard key={item.label} tone={item.tone}>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase text-brand-coral">
                <TrendingUp size={15} />
                {item.label}
              </p>
              <p className="brand-display mt-2 text-4xl">{item.value}</p>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{item.detail}</p>
            </PerifaCard>
          ))}
        </div>

        <div className="brand-card overflow-hidden p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-blue dark:text-brand-mint">
                <BarChart3 size={18} />
                Serie mensal
              </p>
              <h2 className="brand-display mt-2 text-4xl">Evolucao do ciclo formativo</h2>
            </div>
            <Badge tone="mint">pronto para integracao</Badge>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-xs font-black uppercase text-brand-brown/60 dark:text-brand-cream/60">
                  <th className="px-3 py-2">Periodo</th>
                  <th className="px-3 py-2">Alunos</th>
                  <th className="px-3 py-2">Aulas concluidas</th>
                  <th className="px-3 py-2">Certificados</th>
                  <th className="px-3 py-2">Aprovacoes pendentes</th>
                  <th className="px-3 py-2">Suporte</th>
                </tr>
              </thead>
              <tbody>
                {adminReportRows.map((row) => (
                  <tr key={row.period} className="rounded-lg bg-brand-warm font-bold text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                    <td className="rounded-l-lg px-3 py-4 font-black">{row.period}</td>
                    <td className="px-3 py-4">{row.students}</td>
                    <td className="px-3 py-4">{row.completedLessons}</td>
                    <td className="px-3 py-4">{row.certificates}</td>
                    <td className="px-3 py-4">{row.pendingApprovals}</td>
                    <td className="rounded-r-lg px-3 py-4">{row.supportRequests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
