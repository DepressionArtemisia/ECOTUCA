import Link from "next/link";
import { Bell, BookOpen, GraduationCap, Home, MapPinned, Settings, UserRound } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav";
import { DemoSessionPill } from "@/components/demo/demo-session-pill";
import { DataSourceBadge } from "@/components/demo/data-source-badge";

const nav = [
  { label: "Inicio", href: "/app/aluno", icon: Home },
  { label: "Trilhas", href: "/app/aluno/trilhas", icon: BookOpen },
  { label: "Roteiros", href: "/roteiros", icon: MapPinned },
  { label: "Perfil", href: "/app/perfil", icon: UserRound },
  { label: "Ajustes", href: "/app/configuracoes", icon: Settings }
];

export function AppShell({
  children,
  title = "Area ECOTUCA"
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-brand-warm text-brand-brown dark:bg-brand-brown dark:text-brand-cream">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-brand-brown/10 bg-white/80 p-5 backdrop-blur lg:block dark:border-brand-yellow/10 dark:bg-white/10">
        <BrandLogo />
        <nav className="mt-8 space-y-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-black hover:bg-brand-yellow/35 dark:hover:bg-white/10">
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 rounded-lg bg-brand-brown p-4 text-brand-yellow dark:bg-brand-yellow dark:text-brand-brown">
          <GraduationCap size={24} />
          <p className="mt-3 text-sm font-black">Lucas ja concluiu 64% da formacao de Guia Local.</p>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-brand-brown/10 bg-brand-warm/90 px-4 py-3 backdrop-blur dark:border-brand-yellow/10 dark:bg-brand-brown/90">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="lg:hidden">
              <BrandLogo compact />
            </div>
            <h1 className="hidden text-lg font-black lg:block">{title}</h1>
            <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
              <DataSourceBadge />
              <DemoSessionPill />
              <Link href="/app/notificacoes" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-brown/15 dark:border-brand-yellow/20" aria-label="Notificacoes">
                <Bell size={18} />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="px-4 pb-24 pt-5 sm:px-6 lg:px-8">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
