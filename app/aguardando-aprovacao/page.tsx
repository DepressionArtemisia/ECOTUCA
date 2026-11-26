import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Análise da inscrição | ECOTUCA", robots: { index: false } };

export default function PublicWaitingApprovalPage() {
  return (
    <PublicShell>
      <div className="site-container py-10 sm:py-16">
        <section className="brand-card mx-auto max-w-2xl p-6 sm:p-9">
          <h1 className="text-section-title">O que acontece após a inscrição?</h1>
          <p className="mt-4 text-[var(--muted)]">Se você recebeu um protocolo, a coordenação vai analisar a inscrição e orientar você pelo contato informado. Quem já recebeu acesso pode consultar a situação da conta ao entrar.</p>
          <Link href="/entrar" className={buttonVariants({ className: "mt-5" })}>Entrar na plataforma</Link>
        </section>
      </div>
    </PublicShell>
  );
}
