"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import type { UserRole, UserStatus } from "@/types/domain";

const roleNames: Record<UserRole, string> = {
  student: "Aluno", teacher: "Professor", guide: "Guia", tourist: "Visitante",
  visitor: "Visitante", admin: "Coordenação", super_admin: "Administração"
};
const statusCopy: Record<UserStatus, { title: string; detail: string }> = {
  pending: { title: "Cadastro em análise", detail: "A coordenação vai informar os próximos passos pelo contato indicado na inscrição." },
  approved: { title: "Acesso aprovado", detail: "Use o menu do painel para abrir sua área." },
  rejected: { title: "Acesso não aprovado", detail: "Fale com a coordenação se precisar de mais informações sobre a decisão." },
  suspended: { title: "Acesso suspenso", detail: "Fale com a coordenação para saber como regularizar o acesso." },
  inactive: { title: "Acesso inativo", detail: "Fale com a coordenação para saber como reativar sua conta." }
};

export function AccountSummary({ statusOnly = false }: { statusOnly?: boolean }) {
  const { user, loading } = useAuth();
  if (loading) return <p role="status">Carregando sua conta…</p>;
  if (!user) return <Link href="/entrar" className="inline-action">Entre para consultar sua conta</Link>;
  const status = statusCopy[user.status];

  return (
    <section className="brand-card max-w-3xl p-5 sm:p-8">
      <h1 className="text-section-title">{statusOnly ? status.title : "Meu perfil"}</h1>
      {!statusOnly && (
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><dt className="workspace-label">Nome</dt><dd className="font-bold">{user.name}</dd></div>
          <div><dt className="workspace-label">E-mail</dt><dd className="font-bold [overflow-wrap:anywhere]">{user.email}</dd></div>
          <div><dt className="workspace-label">Perfil</dt><dd className="mt-1"><Badge>{roleNames[user.role]}</Badge></dd></div>
          <div><dt className="workspace-label">Situação</dt><dd className="mt-1"><Badge tone={user.status === "approved" ? "mint" : "yellow"}>{status.title}</Badge></dd></div>
        </dl>
      )}
      <p className="mt-5 text-[var(--muted)]">{statusOnly ? status.detail : "Se precisar corrigir algum dado do seu cadastro, fale com a coordenação."}</p>
      <Link href="/contato" className="inline-action mt-2 text-sm">Consultar contato</Link>
    </section>
  );
}
