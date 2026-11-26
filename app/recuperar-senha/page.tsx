import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { PasswordForm } from "@/features/auth/password-form";

export const metadata: Metadata = { title: "Recuperar senha | ECOTUCA" };

export default function RecoverPasswordPage() {
  return (
    <PublicShell>
      <div className="site-container py-10 sm:py-16">
        <section className="brand-card mx-auto max-w-xl p-6 sm:p-9">
          <h1 className="text-section-title">Recuperar senha</h1>
          <p className="mt-3 text-[var(--muted)]">Informe o e-mail da sua conta. Você receberá um link temporário para criar uma nova senha.</p>
          <PasswordForm />
        </section>
      </div>
    </PublicShell>
  );
}
