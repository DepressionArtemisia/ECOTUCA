import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, GraduationCap, ShieldCheck, UsersRound } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { PublicShell } from "@/components/layout/public-shell";
import { Badge } from "@/components/ui/badge";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar | ECOTUCA",
  description: "Acesse sua conta aprovada na plataforma de ensino ECOTUCA."
};

const loginBenefits = [
  "Continuar aulas e trilhas",
  "Enviar atividades",
  "Acompanhar feedback",
  "Baixar certificados"
];

export default function LoginPage() {
  return (
    <PublicShell>
      <section className="brand-surface relative overflow-hidden">
        <BrandPattern intensity="soft" />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <LoginForm />
          <aside className="premium-context-panel p-5 sm:p-6">
            <Badge tone="mint">Acesso aprovado</Badge>
            <h2 className="brand-display mt-5 text-5xl">Sua jornada continua aqui.</h2>
            <p className="mt-4 max-w-2xl text-sm font-bold text-brand-brown/72 dark:text-brand-cream/72">
              A entrada da plataforma real e feita para alunos, professores e coordenacao com perfil aprovado. Se voce ainda nao tem acesso, comece pelo cadastro.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {loginBenefits.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/75 p-3 text-sm font-black dark:bg-white/10">
                  <CheckCircle2 size={18} className="text-brand-mint" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { label: "Aluno", icon: GraduationCap, text: "Aulas, atividades e certificados." },
                { label: "Professor", icon: UsersRound, text: "Turmas, conteudos e avaliacoes." },
                { label: "Admin", icon: ShieldCheck, text: "Aprovacoes, usuarios e relatorios." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-lg bg-brand-brown p-4 text-brand-cream">
                    <Icon size={23} className="text-brand-yellow" />
                    <h3 className="brand-display mt-3 text-3xl">{item.label}</h3>
                    <p className="mt-1 text-xs font-bold text-brand-cream/72">{item.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/cadastro/aluno">
                <EcoButton variant="mint">Quero estudar</EcoButton>
              </Link>
              <Link href="/cadastro/professor">
                <EcoButton variant="outline">Quero ensinar</EcoButton>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PublicShell>
  );
}
