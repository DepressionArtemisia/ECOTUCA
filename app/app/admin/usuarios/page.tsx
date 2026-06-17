import { ShieldCheck, UserCheck, UsersRound } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { AdminShell } from "@/components/layout/admin-shell";
import { Badge } from "@/components/ui/badge";
import { demoUsers } from "@/lib/mock-data/ecotuca";
import type { UserRole, UserStatus } from "@/types/domain";

const roleLabel: Record<UserRole, string> = {
  visitor: "Visitante",
  tourist: "Turista",
  student: "Aluno",
  teacher: "Professor",
  guide: "Guia",
  admin: "Admin",
  super_admin: "Super admin"
};

const statusTone: Record<UserStatus, "yellow" | "coral" | "blue" | "orange" | "mint"> = {
  pending: "yellow",
  approved: "mint",
  rejected: "coral",
  suspended: "orange",
  inactive: "blue"
};

export default function AdminUsersPage() {
  const approved = demoUsers.filter((user) => user.status === "approved").length;
  const pending = demoUsers.filter((user) => user.status === "pending").length;
  const summaryItems = [
    { label: "Usuarios mapeados", value: String(demoUsers.length), icon: UsersRound },
    { label: "Aprovados", value: String(approved), icon: UserCheck },
    { label: "Pendentes", value: String(pending), icon: ShieldCheck }
  ];

  return (
    <AdminShell>
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="brand-card bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
          <Badge tone="yellow">Gestao de usuarios</Badge>
          <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">Usuarios e permissoes</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/75">
            Controle perfis, status de aprovacao e acesso por papel. A criacao real de contas deve passar pelo fluxo Supabase aprovado.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {summaryItems.map((item) => {
            const Icon = item.icon;
            return (
            <PerifaCard key={item.label} tone="mint">
              <Icon className="text-brand-coral" size={26} />
              <p className="mt-3 text-xs font-black uppercase text-brand-coral">{item.label}</p>
              <p className="brand-display mt-1 text-4xl">{item.value}</p>
            </PerifaCard>
            );
          })}
        </div>

        <div className="brand-card overflow-hidden p-4 sm:p-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-xs font-black uppercase text-brand-brown/60 dark:text-brand-cream/60">
                  <th className="px-3 py-2">Nome</th>
                  <th className="px-3 py-2">E-mail</th>
                  <th className="px-3 py-2">Perfil</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Resumo</th>
                  <th className="px-3 py-2">Acao</th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.map((user) => (
                  <tr key={user.email} className="rounded-lg bg-brand-warm font-bold text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                    <td className="rounded-l-lg px-3 py-4 font-black">{user.name}</td>
                    <td className="px-3 py-4">{user.email}</td>
                    <td className="px-3 py-4">{roleLabel[user.role]}</td>
                    <td className="px-3 py-4"><Badge tone={statusTone[user.status]}>{user.status}</Badge></td>
                    <td className="max-w-[280px] px-3 py-4">{user.highlight}</td>
                    <td className="rounded-r-lg px-3 py-4"><EcoButton size="sm" variant="outline">Revisar</EcoButton></td>
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
