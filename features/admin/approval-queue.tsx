"use client";

import { Check, ClipboardCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/auth-provider";
import { shouldEnforceAppAccess } from "@/lib/auth/runtime";
import { getApprovalQueue, setApprovalStatus, type ApprovalQueueItem, type ReviewDecision } from "@/lib/data/admin";
import type { UserRole } from "@/types/domain";

const roles: Record<UserRole, string> = {
  student: "Aluno", teacher: "Professor", guide: "Guia", tourist: "Visitante",
  visitor: "Visitante", admin: "Coordenação", super_admin: "Administração"
};

export function ApprovalQueue() {
  const { user, loading: authLoading } = useAuth();
  const preview = user?.source === "demo" || (!user && !shouldEnforceAppAccess());
  const [rows, setRows] = useState<ApprovalQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    let active = true;
    setLoading(true);
    setFailed(false);
    setMessage("");
    getApprovalQueue(preview)
      .then((items) => { if (active) setRows(items); })
      .catch(() => { if (active) setFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [authLoading, preview, attempt, user?.id]);

  async function review(row: ApprovalQueueItem, decision: ReviewDecision) {
    if (saving !== null) return;
    if (decision === "rejected" && !window.confirm(`Recusar a solicitação de ${row.name}?`)) return;
    setSaving(row.id);
    try {
      const recorded = preview || await setApprovalStatus(row, decision);
      setRows((current) => current.filter((item) => item.id !== row.id || item.kind !== row.kind));
      setMessage(!recorded ? "Esta solicitação já foi revisada. A fila foi atualizada."
        : preview ? "Decisão simulada nesta demonstração."
          : decision === "rejected" ? "Solicitação recusada."
            : row.kind === "profile" ? "Acesso liberado para este perfil."
              : "Inscrição aprovada. A coordenação ainda precisa criar e comunicar o acesso.");
    } catch {
      setMessage("A decisão não foi registrada. Tente novamente.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <section className="mx-auto max-w-6xl space-y-4">
      <header className="brand-card p-5 sm:p-8">
        <p className="section-label"><span /> Coordenação</p>
        <h1 className="text-display-lg mt-3">Aprovações</h1>
        <p className="mt-3 max-w-[62ch] text-[var(--muted)]">Revise as inscrições e os perfis pendentes. Ao aprovar uma inscrição, combine com a pessoa como ela receberá o acesso.</p>
        {!authLoading && preview && <Badge className="mt-3" tone="yellow">Fila de demonstração</Badge>}
      </header>
      {message && <p className="brand-card p-4 text-sm" role="status">{message}</p>}
      {loading ? (
        <p className="brand-card p-5" role="status">Buscando solicitações…</p>
      ) : failed ? (
        <div className="brand-card p-5">
          <p role="alert">Não foi possível carregar as solicitações.</p>
          <EcoButton className="mt-3" variant="outline" onClick={() => setAttempt(attempt + 1)}>Tentar novamente</EcoButton>
        </div>
      ) : rows.length ? rows.map((row) => (
        <article key={`${row.kind}:${row.id}`} className="brand-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <h2 className="text-xl font-bold">{row.name}</h2>
            <p className="text-sm text-[var(--muted)]">{row.email}</p>
            {row.phone && <p className="text-sm text-[var(--muted)]">{row.phone}</p>}
            {row.highlight && <p className="mt-2 max-w-[60ch] text-sm">{row.highlight}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{roles[row.role]}</Badge>
              <Badge tone="yellow">{row.kind === "signup_application" ? "Nova inscrição" : "Perfil com conta criada"}</Badge>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <EcoButton onClick={() => review(row, "approved")} disabled={saving !== null}><Check size={16} /> Aprovar</EcoButton>
            <EcoButton variant="outline" onClick={() => review(row, "rejected")} disabled={saving !== null}><X size={16} /> Recusar</EcoButton>
          </div>
        </article>
      )) : (
        <div className="brand-card p-5"><ClipboardCheck size={22} aria-hidden="true" /><p className="mt-2">Nenhuma solicitação pendente.</p></div>
      )}
    </section>
  );
}
