"use client";

import { Download, Printer } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { adminReportRows } from "@/lib/mock-data/ecotuca";

export function ReportActions() {
  function exportCsv() {
    const header = ["Período", "Alunos", "Aulas concluídas", "Certificados", "Aprovações pendentes", "Suporte"];
    const rows = adminReportRows.map((row) => [row.period, row.students, row.completedLessons, row.certificates, row.pendingApprovals, row.supportRequests]);
    const csv = [header, ...rows].map((row) => row.map((cell) => '"' + String(cell).replaceAll('"','""') + '"').join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "ecotuca-relatorio-exemplo.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <EcoButton onClick={exportCsv}><Download size={17} aria-hidden="true" /> Baixar CSV</EcoButton>
      <EcoButton variant="outline" onClick={() => window.print()}><Printer size={17} aria-hidden="true" /> Imprimir ou salvar PDF</EcoButton>
    </div>
  );
}
