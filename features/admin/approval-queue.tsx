"use client";

import { CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { getApprovalQueue, setApprovalStatus, type ApprovalQueueItem } from "@/lib/data/admin";
import type { UserStatus } from "@/types/domain";

export function ApprovalQueue() {
  const [rows, setRows] = useState<ApprovalQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"supabase" | "prepared">("prepared");
  const [message, setMessage] = useState("Carregando fila de aprovacoes.");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const queue = await getApprovalQueue();
      if (!active) return;
      setRows(queue);
      setSource(queue.some((item) => item.source === "supabase") ? "supabase" : "prepared");
      setMessage(queue.length ? "Fila pronta para validacao da coordenacao." : "Nenhum cadastro pendente encontrado.");
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  async function update(row: ApprovalQueueItem, status: Extract<UserStatus, "approved" | "rejected">) {
    const result = await setApprovalStatus(row, status);
    setRows((current) => current.map((item) => (item.id === row.id ? { ...item, status } : item)));
    setSource(result.source === "supabase" ? "supabase" : "prepared");
    setMessage(
      result.source === "supabase"
        ? `Cadastro ${status === "approved" ? "aprovado" : "rejeitado"} na base conectada.`
        : `Cadastro ${status === "approved" ? "aprovado" : "rejeitado"} no painel preparado.`
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-4">
      <div className="rounded-lg bg-brand-yellow p-5 text-brand-brown shadow-brand">
        <div className="flex flex-wrap gap-2">
          <Badge tone="coral">Fila de aprovacoes</Badge>
          <Badge tone={source === "supabase" ? "mint" : "yellow"}>
            {source === "supabase" ? "Base conectada" : "Fila preparada"}
          </Badge>
        </div>
        <h1 className="brand-display mt-4 text-5xl">Fila de aprovacoes</h1>
        <p className="mt-2 text-sm font-bold">{message}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["Validar perfil", "Conferir vinculo, contato e consentimentos."],
            ["Liberar acesso", "Criar usuario real somente quando Auth estiver autorizado."],
            ["Registrar decisao", "Guardar motivo, data e responsavel em producao."]
          ].map(([item, text]) => (
            <div key={item} className="rounded-lg bg-brand-brown p-4 text-brand-cream">
              <p className="text-sm font-black uppercase text-brand-yellow">{item}</p>
              <p className="mt-2 text-xs font-bold text-brand-cream/75">{text}</p>
            </div>
          ))}
        </div>
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
              {row.phone ? <p className="text-sm text-brand-brown/70 dark:text-brand-cream/70">{row.phone}</p> : null}
              <p className="mt-2 max-w-2xl text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{row.highlight}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge tone="blue">{row.role}</Badge>
                <Badge tone={row.kind === "signup_application" ? "mint" : "yellow"}>
                  {row.kind === "signup_application" ? "Cadastro publico" : "Perfil pendente"}
                </Badge>
                <Badge tone={row.status === "pending" ? "coral" : row.status === "approved" ? "mint" : "brown"}>{row.status}</Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <EcoButton variant="mint" onClick={() => update(row, "approved")} disabled={row.status === "approved"}>
                <CheckCircle2 size={16} />
                Aprovar
              </EcoButton>
              <EcoButton variant="outline" onClick={() => update(row, "rejected")} disabled={row.status === "rejected"}>
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
