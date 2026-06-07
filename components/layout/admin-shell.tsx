import Link from "next/link";
import { BarChart3, CheckCircle2, FileText, Route, Settings, Users } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { DemoSessionPill } from "@/components/demo/demo-session-pill";
import { DataSourceBadge } from "@/components/demo/data-source-badge";

const adminNav = [
  { label: "Dashboard", href: "/app/admin", icon: BarChart3 },
  { label: "Aprovacoes", href: "/app/admin/aprovacoes", icon: CheckCircle2 },
  { label: "Usuarios", href: "/app/admin/usuarios", icon: Users },
  { label: "Trilhas", href: "/app/admin/trilhas", icon: FileText },
  { label: "Roteiros", href: "/app/admin/roteiros", icon: Route },
  { label: "Metricas", href: "/app/admin/metricas", icon: BarChart3 },
  { label: "Config", href: "/app/admin/configuracoes", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-warm text-brand-brown dark:bg-background-dark dark:text-brand-cream">
      <aside className="fixed inset-y-0 left-0 hidden w-80 border-r border-brand-yellow/15 bg-brand-brown p-5 text-brand-cream lg:block">
        <BrandLogo tone="negative" />
        <p className="mt-5 rounded-lg bg-brand-yellow p-4 text-sm font-black text-brand-brown">
          Centro de comando para coordenacao, prestacao de contas e operacao do MVP.
        </p>
        <nav className="mt-6 space-y-2">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="focus-ring-brand flex min-h-12 items-center gap-3 rounded-lg px-4 py-3 text-sm font-black transition hover:bg-white/10">
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-80">
        <header className="sticky top-0 z-20 border-b border-brand-brown/10 bg-brand-warm/90 px-4 py-3 backdrop-blur dark:border-brand-yellow/10 dark:bg-brand-brown/90">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <BrandLogo className="lg:hidden" compact />
            <div className="hidden lg:block">
              <p className="text-xs font-black uppercase text-brand-coral">Painel Administrativo</p>
              <h1 className="brand-display text-3xl">Impacto, usuarios e roteiros</h1>
            </div>
            <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
              <DataSourceBadge />
              <DemoSessionPill />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="px-4 py-5 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
