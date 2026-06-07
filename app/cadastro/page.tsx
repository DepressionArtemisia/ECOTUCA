import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

const roles = [
  { label: "Aluno", href: "/cadastro/aluno", tone: "yellow" as const },
  { label: "Professor", href: "/cadastro/professor", tone: "blue" as const },
  { label: "Guia", href: "/cadastro/guia", tone: "mint" as const },
  { label: "Turista", href: "/cadastro/turista", tone: "orange" as const }
];

export default function RegisterPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
        <Badge tone="coral">Cadastro segmentado</Badge>
        <h1 className="brand-display mt-5 text-6xl">Escolha seu perfil</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <Link key={role.href} href={role.href}>
              <PerifaCard tone={role.tone}>
                <h2 className="brand-display text-4xl">{role.label}</h2>
                <p className="mt-2 text-sm">Formulario visual com status pendente quando precisa de aprovacao.</p>
              </PerifaCard>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
