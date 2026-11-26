import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, UsersRound } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar | ECOTUCA",
  description: "Acesse sua conta na plataforma de ensino ECOTUCA."
};

export default function LoginPage() {
  return (
    <PublicShell>
      <div className="site-container grid items-start gap-6 py-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:py-16">
        <LoginForm />
        <aside className="brand-card p-6 sm:p-9">
          <h2 className="text-section-title">Primeira vez por aqui?</h2>
          <p className="mt-3 max-w-[50ch] text-[var(--muted)]">Envie sua inscrição. Após a análise, a coordenação informa como receber o acesso.</p>
          <div className="mt-4 grid gap-2">
            <Link href="/cadastro/aluno" className="inline-action"><GraduationCap size={18} aria-hidden="true" /> Inscrição de aluno</Link>
            <Link href="/cadastro/professor" className="inline-action"><UsersRound size={18} aria-hidden="true" /> Inscrição de professor</Link>
          </div>
        </aside>
      </div>
    </PublicShell>
  );
}
