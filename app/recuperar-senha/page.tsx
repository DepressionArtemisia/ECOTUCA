import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { PublicShell } from "@/components/layout/public-shell";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Recuperar senha | ECOTUCA",
  description: "Solicite recuperacao de acesso para a plataforma ECOTUCA."
};

export default function RecoverPasswordPage() {
  return (
    <PublicShell>
      <section className="brand-surface relative overflow-hidden">
        <BrandPattern intensity="soft" />
        <div className="relative mx-auto grid min-h-[70vh] max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div className="brand-card p-5 dark:bg-brand-dark-soft/90 sm:p-6">
            <Badge tone="yellow">Recuperar senha</Badge>
            <h1 className="brand-display mt-5 text-5xl">Voltar para a plataforma</h1>
            <p className="mt-4 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
              Informe o e-mail usado no cadastro aprovado. A versao de producao enviara um link seguro de redefinicao pelo Supabase Auth.
            </p>
            <form className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-black">E-mail</span>
                <div className="mt-2 flex min-h-12 items-center gap-2 rounded-lg border border-brand-brown/15 bg-white px-4 text-brand-brown dark:border-brand-yellow/20">
                  <Mail size={18} />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-transparent text-sm font-bold outline-none"
                  />
                </div>
              </label>
              <EcoButton type="button" variant="mint">
                <Mail size={17} />
                Solicitar link
              </EcoButton>
            </form>
            <Link href="/entrar" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-blue dark:text-brand-mint">
              <ArrowLeft size={16} />
              Voltar para entrar
            </Link>
          </div>
          <aside className="premium-context-panel p-5 sm:p-6">
            <ShieldCheck size={30} className="text-brand-coral" />
            <h2 className="brand-display mt-4 text-4xl">Seguranca de conta</h2>
            <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
              Recuperacao real deve validar o e-mail pelo Supabase, expirar links automaticamente e nunca revelar se uma conta existe para terceiros.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Link temporario", "Sessao segura", "Sem senha por e-mail"].map((item) => (
                <div key={item} className="rounded-lg bg-brand-yellow/25 p-3 text-sm font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </PublicShell>
  );
}
