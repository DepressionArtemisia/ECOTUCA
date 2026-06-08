"use client";

import { CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { getApprovalQueue, setApprovalStatus } from "@/lib/data/admin";
import type { DemoUser, UserStatus } from "@/types/domain";

type Row = {
  email: string;
  name: string;
  role: string;
  status: UserStatus;
};

export function ApprovalQueue() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"supabase" | "demo">("demo");
  const [message, setMessage] = useState("Carregando fila de aprovacoes.");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const queue = await getApprovalQueue();
      if (!active) return;
      setRows(queue.map(toRow));
      setSource(queue.some((user) => user.password === "") ? "supabase" : "demo");
      setMessage(queue.length ? "Fila pronta para validacao da coordenacao." : "Nenhum cadastro pendente encontrado.");
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  async function update(email: string, status: Extract<UserStatus, "approved" | "rejected">) {
    const result = await setApprovalStatus(email, status);
    setRows((current) => current.map((row) => (row.email === email ? { ...row, status } : row)));
    setSource(result.source === "supabase" ? "supabase" : "demo");
    setMessage(
      result.source === "supabase"
        ? `Usuario ${status === "approved" ? "aprovado" : "rejeitado"} na base conectada.`
        : `Usuario ${status === "approved" ? "aprovado" : "rejeitado"} na fila de apresentacao.`
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-4">
      <div className="rounded-lg bg-brand-yellow p-5 text-brand-brown shadow-brand">
        <div className="flex flex-wrap gap-2">
          <Badge tone="coral">Fila de aprovacoes</Badge>
          <Badge tone={source === "supabase" ? "mint" : "yellow"}>
            {source === "supabase" ? "Base conectada" : "Fila de apresentacao"}
          </Badge>
        </div>
        <h1 className="brand-display mt-4 text-5xl">Fila de aprovacoes</h1>
        <p className="mt-2 text-sm font-bold">{message}</p>
      </div>
      {loading ? (
        <div className="rounded-lg bg-white p-5 font-black shadow-brand dark:bg-white/10">
          <RefreshCw className="mr-2 inline animate-spin" size={16} />
          Buscando cadastros pendentes
        </div>
      ) : null}
      {!loading && rows.length === 0 ? (
        <div className="rounded-lg bg-white p-5 font-black shadow-brand dark:bg-white/10">
          Nenhum cadastro pendente no modo atual.
        </div>
      ) : null}
      {rows.map((row) => (
        <article key={row.email} className="rounded-lg border border-brand-brown/10 bg-white p-5 shadow-brand dark:border-brand-yellow/15 dark:bg-white/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-black">{row.name}</p>
              <p className="text-sm text-brand-brown/70 dark:text-brand-cream/70">{row.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge tone="blue">{row.role}</Badge>
                <Badge tone={row.status === "pending" ? "coral" : row.status === "approved" ? "mint" : "brown"}>{row.status}</Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <EcoButton variant="mint" onClick={() => update(row.email, "approved")} disabled={row.status === "approved"}>
                <CheckCircle2 size={16} />
                Aprovar
              </EcoButton>
              <EcoButton variant="outline" onClick={() => update(row.email, "rejected")} disabled={row.status === "rejected"}>
                <XCircle size={16} />
                Rejeitar
              </EcoButton>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function toRow(user: DemoUser): Row {
  return {
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status
  };
}
