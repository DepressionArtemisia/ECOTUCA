import Link from "next/link";
import { ArrowUpRight, BookOpen, CircleHelp, Compass, House, MapPin, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { OfficialLogo } from "@/components/brand/official-logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { NavigationMenu } from "@/components/layout/navigation-menu";

const navigation = [
  { label: "A formação", href: "/como-funciona", icon: BookOpen },
  { label: "Roteiros", href: "/roteiros", icon: Compass },
  { label: "O projeto", href: "/sobre", icon: MapPin },
  { label: "Perguntas frequentes", href: "/faq", icon: CircleHelp }
];

const mobileNavigation = [
  { label: "Início", href: "/", icon: House },
  ...navigation,
  { label: "Contato", href: "/contato", icon: MessageCircle }
].map(({ label, href, icon: Icon }) => ({ label, href, icon: <Icon size={19} strokeWidth={1.75} /> }));

const footerSections = [
  { title: "Formação", links: [
    { label: "Como funciona", href: "/como-funciona" },
    { label: "Inscrição de aluno", href: "/cadastro/aluno" },
    { label: "Inscrição de professor", href: "/cadastro/professor" },
    { label: "Entrar", href: "/entrar" }
  ] },
  { title: "Projeto", links: [
    { label: "Sobre a ECOTUCA", href: "/sobre" },
    { label: "Roteiros", href: "/roteiros" },
    { label: "Contato", href: "/contato" },
    { label: "Perguntas frequentes", href: "/faq" }
  ] },
  { title: "Informações", links: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos", href: "/termos" },
    { label: "Créditos das imagens", href: "/creditos-imagens" },
    { label: "Mapa do site", href: "/sitemap" }
  ] }
];

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="site-container site-header-row">
          <BrandLogo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="site-nav-link">{item.label}</Link>
            ))}
          </nav>
          <div className="flex min-w-0 items-center gap-2">
            <ThemeToggle />
            <Link href="/entrar" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Entrar <ArrowUpRight className="hidden sm:block" size={14} aria-hidden="true" />
            </Link>
            <NavigationMenu
              groups={[{ items: mobileNavigation }]}
              label="Menu do site"
              title="ECOTUCA"
              footer={
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/entrar" className={buttonVariants({ variant: "outline" })}>Entrar</Link>
                  <Link href="/cadastro" className={buttonVariants()}>Inscrever-se</Link>
                </div>
              }
            />
          </div>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div className="site-container grid gap-9 lg:grid-cols-[1fr_1.45fr]">
          <div>
            <div className="flex flex-wrap items-center gap-6">
              <BrandLogo tone="negative" />
              <OfficialLogo brand="perifa" tone="negative" size="sm" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-cream/75">Escola de Ecoturismo do Complexo do Alemão, uma iniciativa da Perifa Ecotour.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-bold">{section.title}</h2>
                <ul className="mt-2">
                  {section.links.map((item) => (
                    <li key={item.href}><Link className="footer-link" href={item.href}>{item.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
