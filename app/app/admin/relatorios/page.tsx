import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { ReportActions } from "@/features/admin/report-actions";
import { adminReportRows, adminReportSnapshots } from "@/lib/mock-data/ecotuca";

const columns = ["Período", "Alunos", "Aulas concluídas", "Certificados", "Aprovações pendentes", "Suporte"];

export default function AdminReportsPage() {
  return (
    <AdminShell>
      <div className="workspace-grid">
        <header className="workspace-intro">
          <div>
            <p className="section-label"><span /> Prestação de contas</p>
            <h1 className="text-display-lg mt-2">Relatórios</h1>
            <p className="mt-3 max-w-[58ch] text-[var(--muted)]">Consulte a evolução mensal da formação. A planilha e a impressão usam os dados de exemplo exibidos aqui.</p>
          </div>
          <ReportActions />
        </header>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {adminReportSnapshots.map((item) => (
            <article key={item.label} className="brand-card p-5">
              <h2 className="text-sm font-bold">{item.label}</h2>
              <p className="brand-display mt-2 text-4xl tabular-nums">{item.value}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.detail}</p>
            </article>
          ))}
        </div>
        <section className="brand-card min-w-0 overflow-hidden p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-card-title" id="serie-mensal">Série mensal de formação</h2>
            <Badge>Dados de exemplo</Badge>
          </div>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-labelledby="serie-mensal">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead><tr className="border-b border-[var(--border-soft)]">
                {columns.map((column) => <th scope="col" key={column} className="px-2 py-3">{column}</th>)}
              </tr></thead>
              <tbody>
                {adminReportRows.map((row) => (
                  <tr key={row.period} className="border-b border-[var(--border-soft)] last:border-0">
                    <th scope="row" className="px-2 py-3">{row.period}</th>
                    {[row.students, row.completedLessons, row.certificates, row.pendingApprovals, row.supportRequests]
                      .map((value, index) => <td key={columns[index+1]} className="px-2 py-3 tabular-nums">{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
