import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeToggle } from "@/components/brand/theme-toggle";

export default function SettingsPage() {
  return (
    <AppShell title="Preferências">
      <section className="brand-card max-w-3xl space-y-5 p-5 sm:p-8">
        <h1 className="text-section-title">Preferências</h1>
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-[var(--border-soft)] py-4">
          <div>
            <h2 className="font-bold">Aparência</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Escolha o tema claro ou escuro para este navegador.</p>
          </div>
          <ThemeToggle />
        </div>
        <Link href="/privacidade" className="inline-action text-sm">Consultar informações de privacidade</Link>
      </section>
    </AppShell>
  );
}
