"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award, Bell, BookOpen, CalendarDays, ChartNoAxesColumn, ClipboardCheck, Compass,
  FileText, Home, MapPinned, Settings, UploadCloud, UserRound, UsersRound
} from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { NavigationMenu } from "@/components/layout/navigation-menu";
import { DemoSessionPill } from "@/components/demo/demo-session-pill";
import { AppAccessGuard } from "@/features/auth/app-access-guard";
import { LogoutButton } from "@/features/auth/logout-button";
import { useAuth } from "@/features/auth/auth-provider";
import type { UserRole } from "@/types/domain";

const common = [
  { label: "Perfil", href: "/app/perfil", icon: UserRound },
  { label: "Preferências", href: "/app/configuracoes", icon: Settings }
];

const roles = {
  student: {
    name: "Área do aluno",
    links: [
      { label: "Início", href: "/app/aluno", icon: Home },
      { label: "Trilhas", href: "/app/aluno/trilhas", icon: BookOpen },
      { label: "Atividades", href: "/app/aluno/atividades", icon: ClipboardCheck },
      { label: "Certificados", href: "/app/aluno/certificados", icon: Award },
      { label: "Comunidade", href: "/app/aluno/comunidade", icon: UsersRound }
    ]
  },
  teacher: {
    name: "Área do professor",
    links: [
      { label: "Início", href: "/app/professor", icon: Home },
      { label: "Turmas", href: "/app/professor/turmas", icon: UsersRound },
      { label: "Conteúdos", href: "/app/professor/conteudos", icon: UploadCloud },
      { label: "Avaliações", href: "/app/professor/avaliacoes", icon: ClipboardCheck },
      { label: "Comunidade", href: "/app/professor/comunidade", icon: BookOpen }
    ]
  },
  guide: {
    name: "Área do guia",
    links: [
      { label: "Início", href: "/app/guia", icon: Home },
      { label: "Agenda", href: "/app/guia/agenda", icon: CalendarDays },
      { label: "Roteiros", href: "/app/guia/roteiros", icon: MapPinned }
    ]
  },
  tourist: {
    name: "Área do visitante",
    links: [
      { label: "Início", href: "/app/turista", icon: Home },
      { label: "Pedidos de visita", href: "/app/turista/reservas", icon: CalendarDays },
      { label: "Roteiros", href: "/roteiros", icon: Compass }
    ]
  },
  admin: {
    name: "Coordenação",
    links: [
      { label: "Visão geral", href: "/app/admin", icon: Home },
      { label: "Aprovações", href: "/app/admin/aprovacoes", icon: ClipboardCheck },
      { label: "Usuários", href: "/app/admin/usuarios", icon: UsersRound },
      { label: "Trilhas", href: "/app/admin/trilhas", icon: BookOpen },
      { label: "Conteúdos", href: "/app/admin/conteudos", icon: UploadCloud },
      { label: "Roteiros", href: "/app/admin/roteiros", icon: MapPinned },
      { label: "Indicadores", href: "/app/admin/metricas", icon: ChartNoAxesColumn },
      { label: "Relatórios", href: "/app/admin/relatorios", icon: FileText },
      { label: "Configurações", href: "/app/admin/configuracoes", icon: Settings }
    ]
  }
};

function resolveRole(pathname: string, context: keyof typeof roles | undefined, userRole: UserRole | undefined) {
  if (context) return context;
  if (pathname.startsWith("/app/aluno")) return "student";
  return userRole === "super_admin" ? "admin" : (userRole === "visitor" ? "student" : (userRole ?? "student"));
}

export function WorkspaceShell({ children, title, roleContext }: {
  children: React.ReactNode;
  title?: string;
  roleContext?: keyof typeof roles;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const role = roles[resolveRole(pathname, roleContext, user?.role)];
  const menu = [...role.links, ...common];
  const toMenuItem = ({ href, label, icon: Icon }: typeof menu[number]) => ({
    href, label, icon: <Icon size={19} strokeWidth={1.75} />
  });
  const currentSection = pathname.startsWith("/app/aluno/aulas/") ? "/app/aluno/trilhas" : pathname;
  const activeHref = [...menu, { href: "/app/notificacoes" }].filter(({ href }) => currentSection === href || currentSection.startsWith(href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
  const showDemo = process.env.NEXT_PUBLIC_SHOW_DEMO_CONTROLS === "true";

  return (
    <div className="workspace">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <aside className="workspace-sidebar">
        <BrandLogo />
        <nav aria-label={role.name}>
          <p className="workspace-label mb-2 px-3">{role.name}</p>
          <div className="space-y-0.5">
            {menu.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="workspace-nav-link" aria-current={activeHref === href ? "page" : undefined}>
                <Icon size={17} className="shrink-0" aria-hidden="true" />{label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="mt-auto">{user ? <LogoutButton /> : null}</div>
      </aside>
      <div className="min-w-0">
        <header className="workspace-header">
          <div className="workspace-toolbar">
            <BrandLogo className="shrink-0 lg:hidden" />
            <div className="hidden min-w-0 lg:block">
              <p className="workspace-label">{role.name}</p>
              {title ? <p className="truncate text-sm font-bold">{title}</p> : null}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {showDemo ? <div className="hidden sm:block"><DemoSessionPill /></div> : null}
              <Link href="/app/notificacoes" className="icon-control" aria-label="Notificações"><Bell size={17} aria-hidden="true" /></Link>
              <ThemeToggle />
              <NavigationMenu
                label="Menu do painel"
                title={role.name}
                activeHref={activeHref}
                groups={[
                  { items: role.links.map(toMenuItem) },
                  { label: "Minha conta", items: [{ label: "Notificações", href: "/app/notificacoes", icon: Bell }, ...common].map(toMenuItem) }
                ]}
                footer={user && <LogoutButton className="w-full" />}
              />
            </div>
          </div>
        </header>
        <main id="conteudo" className="workspace-content" tabIndex={-1}>
          <AppAccessGuard>{children}</AppAccessGuard>
        </main>
      </div>
    </div>
  );
}
