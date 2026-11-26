import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Inscrições | ECOTUCA",
  description: "Envie sua inscrição para estudar ou ensinar na escola de ecoturismo do Complexo do Alemão."
};

const roles = [
  { title: "Quero estudar", description: "Para jovens que querem conhecer o ecoturismo, cuidar do território e aprender a conduzir roteiros locais.", href: "/cadastro/aluno", label: "Inscrição de aluno" },
  { title: "Quero ensinar", description: "Para educadores e facilitadores interessados em preparar aulas e acompanhar a formação dos jovens.", href: "/cadastro/professor", label: "Inscrição de professor" }
];

export default function RegisterPage() {
  return (
    <PublicShell>
      <div className="site-container space-y-5 py-9 sm:py-14">
        <RichPageHeader eyebrow="Inscrições" title="Como você quer participar?" description="Escolha seu perfil e preencha a inscrição. A coordenação analisa os dados e orienta você sobre os próximos passos." />
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map(({ title, description, href, label }, index) => (
            <section key={href} className="brand-card flex flex-col items-start p-5 sm:p-8">
              <h2 className="text-section-title">{title}</h2>
              <p className="mb-5 mt-3 max-w-[50ch] flex-1 text-[var(--muted)]">{description}</p>
              <Link href={href} className={buttonVariants({ variant: index === 0 ? "primary" : "outline" })}>{label}</Link>
            </section>
          ))}
        </div>
        <p className="text-sm text-[var(--muted)]">Já recebeu as orientações de acesso? <Link href="/entrar" className="inline-action">Entre na plataforma</Link>.</p>
      </div>
    </PublicShell>
  );
}
