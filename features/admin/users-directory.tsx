"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/auth-provider";
import { listProfiles, type ProfileListItem } from "@/lib/data/profiles";
import type { UserRole, UserStatus } from "@/types/domain";

const roles: Record<UserRole, string> = {
  visitor: "Visitante", tourist: "Visitante", student: "Aluno", teacher: "Professor", guide: "Guia",
  admin: "Coordenação", super_admin: "Administração"
};
const statuses: Record<UserStatus, string> = {
  pending: "Pendente", approved: "Aprovado", rejected: "Recusado", suspended: "Suspenso", inactive: "Inativo"
};

export function UsersDirectory() {
  const { user, loading } = useAuth();
  const [profiles, setProfiles] = useState<ProfileListItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const preview = user?.source !== "supabase";

  useEffect(() => {
    if (loading) return;
    let active = true;
    setProfiles(null);
    setFailed(false);
    listProfiles(preview)
      .then((items) => { if (active) setProfiles(items); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [loading, preview, user?.id]);

  return (
    <div className="workspace-grid">
      <header className="workspace-intro">
        <div>
          <p className="section-label"><span /> Coordenação</p>
          <h1 className="text-display-lg mt-2">Usuários</h1>
          <p className="mt-3 max-w-[58ch] text-[var(--muted)]">Consulte os perfis criados e a situação de cada acesso. As decisões sobre contas pendentes ficam na fila de aprovações.</p>
        </div>
        <Link className="inline-action" href="/app/admin/aprovacoes">Abrir aprovações</Link>
      </header>
      <section className="brand-card p-5 sm:p-7" aria-labelledby="diretorio">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="diretorio" className="text-card-title">Perfis cadastrados</h2>
          {!loading && preview && <Badge>Dados de exemplo</Badge>}
        </div>
        {failed ? <p className="mt-4" role="alert">Não foi possível carregar os perfis. Recarregue a página para tentar novamente.</p>
          : !profiles ? <p className="mt-4" role="status">Carregando perfis…</p>
          : profiles.length ? (
            <ul className="mt-4 divide-y divide-[var(--border-soft)]">
              {profiles.map(({ id, name, email, role, status }) => (
                <li key={id} className="grid gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0 [overflow-wrap:anywhere]">
                    <p className="font-bold">{name}</p><p className="text-sm text-[var(--muted)]">{email}</p>
                  </div>
                  <div className="flex flex-wrap gap-2"><Badge>{roles[role]}</Badge><Badge tone={status === "approved" ? "mint" : status === "pending" ? "yellow" : "coral"}>{statuses[status]}</Badge></div>
                </li>
              ))}
            </ul>
          ) : <p className="mt-4 text-[var(--muted)]">Nenhum perfil cadastrado.</p>}
        {profiles?.length === 100 && <p className="mt-3 text-sm text-[var(--muted)]">Exibindo os primeiros 100 perfis por nome.</p>}
      </section>
    </div>
  );
}
