import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { PasswordForm } from "@/features/auth/password-form";

export const metadata: Metadata = { title: "Criar nova senha | ECOTUCA", robots: { index: false } };

export default function NewPasswordPage() {
  return (
    <PublicShell>
      <div className="site-container py-10 sm:py-16">
        <section className="brand-card mx-auto max-w-xl p-6 sm:p-9">
          <h1 className="text-section-title">Crie uma nova senha</h1>
          <p className="mt-3 text-[var(--muted)]">Escolha uma senha com pelo menos oito caracteres.</p>
          <PasswordForm reset />
        </section>
      </div>
    </PublicShell>
  );
}
