import Link from "next/link";
import { LogIn, MapPinned, Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { BrandGradient } from "@/components/brand/brand-gradient";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { EcoButton } from "@/components/brand/eco-button";
import { publicNav } from "@/lib/constants/brand";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-warm text-brand-brown dark:bg-background-dark dark:text-brand-cream">
      <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-brand-warm/95 backdrop-blur dark:border-brand-yellow/10 dark:bg-brand-brown/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <BrandLogo />
          <nav className="hidden items-center gap-1 md:flex">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring-brand rounded-lg px-4 py-2 text-sm font-black transition hover:bg-brand-yellow/40 dark:hover:bg-white/10">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:block">
              <EcoButton size="sm">
                <LogIn size={16} />
                Entrar
              </EcoButton>
            </Link>
            <Link href="/roteiros" className="sm:hidden" aria-label="Roteiros">
              <EcoButton size="sm" variant="mint">
                <MapPinned size={16} />
              </EcoButton>
            </Link>
            <button className="focus-ring-brand inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-brown/15 bg-white/60 md:hidden dark:border-brand-yellow/20 dark:bg-white/10" aria-label="Menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-brand-yellow/10 bg-brand-brown px-5 py-8 text-brand-cream">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo tone="negative" />
          <p className="max-w-xl text-sm text-brand-cream/75">
            ECOTUCA conecta educacao ambiental, juventude, turismo comunitario e prestacao de contas em uma experiencia digital pronta para evoluir.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PublicHero({ children }: { children: React.ReactNode }) {
  return <BrandGradient className="min-h-[calc(100vh-76px)]">{children}</BrandGradient>;
}
