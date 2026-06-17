import Link from "next/link";
import { Award, Bell, BookOpen, CalendarDays, ClipboardCheck, Compass, GraduationCap, Home, MapPinned, Settings, UploadCloud, UserRound, UsersRound } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav";
import { DemoSessionPill } from "@/components/demo/demo-session-pill";
import { DataSourceBadge } from "@/components/demo/data-source-badge";
import { AppAccessGuard } from "@/features/auth/app-access-guard";

type AppRoleContext = "student" | "teacher" | "guide" | "tourist";

const navByRole = {
  student: [
    { label: "Inicio", href: "/app/aluno", icon: Home },
    { label: "Trilhas", href: "/app/aluno/trilhas", icon: BookOpen },
    { label: "Atividades", href: "/app/aluno/atividades", icon: ClipboardCheck },
    { label: "Certificados", href: "/app/aluno/certificados", icon: Award },
    { label: "Perfil", href: "/app/perfil", icon: UserRound },
    { label: "Ajustes", href: "/app/configuracoes", icon: Settings }
  ],
  teacher: [
    { label: "Inicio", href: "/app/professor", icon: Home },
    { label: "Turmas", href: "/app/professor/turmas", icon: UsersRound },
    { label: "Conteudos", href: "/app/professor/conteudos", icon: UploadCloud },
    { label: "Avaliacoes", href: "/app/professor/avaliacoes", icon: ClipboardCheck },
    { label: "Ajustes", href: "/app/configuracoes", icon: Settings }
  ],
  guide: [
    { label: "Inicio", href: "/app/guia", icon: Home },
    { label: "Agenda", href: "/app/guia/agenda", icon: CalendarDays },
    { label: "Roteiros", href: "/app/guia/roteiros", icon: MapPinned },
    { label: "Perfil", href: "/app/perfil", icon: UserRound },
    { label: "Ajustes", href: "/app/configuracoes", icon: Settings }
  ],
  tourist: [
    { label: "Inicio", href: "/app/turista", icon: Home },
    { label: "Reservas", href: "/app/turista/reservas", icon: CalendarDays },
    { label: "Roteiros", href: "/roteiros", icon: Compass },
    { label: "Perfil", href: "/app/perfil", icon: UserRound },
    { label: "Ajustes", href: "/app/configuracoes", icon: Settings }
  ]
} satisfies Record<AppRoleContext, Array<{ label: string; href: string; icon: typeof Home }>>;

const roleContexts = {
  student: {
    icon: GraduationCap,
    title: "Trilha do aluno",
    text: "Lucas ja concluiu 64% da formacao de Guia Local."
  },
  teacher: {
    icon: BookOpen,
    title: "Rede pedagogica",
    text: "Professores acompanham turmas, materiais e progresso com curadoria ECOTUCA."
  },
  guide: {
    icon: MapPinned,
    title: "Guia territorial",
    text: "Guias organizam agenda, perfil publico e roteiros validados pelo projeto."
  },
  tourist: {
    icon: Compass,
    title: "Visitante responsavel",
    text: "Turistas acompanham reservas, interesses e combinados do territorio."
  }
} satisfies Record<AppRoleContext, { icon: typeof Home; title: string; text: string }>;

function inferRoleContext(title: string): AppRoleContext {
  const normalized = title.toLowerCase();
  if (normalized.includes("professor") || normalized.includes("conteudo") || normalized.includes("turma")) return "teacher";
  if (normalized.includes("guia") || normalized.includes("agenda do guia")) return "guide";
  if (normalized.includes("turista") || normalized.includes("reserva")) return "tourist";
  return "student";
}

export function AppShell({
  children,
  title = "Area ECOTUCA",
  roleContext
}: {
  children: React.ReactNode;
  title?: string;
  roleContext?: AppRoleContext;
}) {
  const resolvedRole = roleContext ?? inferRoleContext(title);
  const nav = navByRole[resolvedRole];
  const context = roleContexts[resolvedRole];
  const ContextIcon = context.icon;
  const showDemoControls = process.env.NEXT_PUBLIC_SHOW_DEMO_CONTROLS === "true";

  return (
    <div className="min-h-screen bg-background-warm text-brand-brown dark:bg-background-dark dark:text-brand-cream">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-brand-brown/10 bg-white/90 p-5 backdrop-blur lg:block dark:border-brand-yellow/10 dark:bg-brand-dark-soft/75">
        <BrandLogo />
        <nav className="mt-8 space-y-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="focus-ring-brand flex min-h-12 items-center gap-3 rounded-lg px-4 py-3 text-sm font-black transition hover:bg-brand-yellow/35 dark:hover:bg-white/10">
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 rounded-lg bg-gradient-territory p-4 text-brand-cream shadow-card dark:bg-brand-yellow dark:text-brand-brown">
          <ContextIcon size={24} />
          <p className="mt-3 text-xs font-black uppercase opacity-75">{context.title}</p>
          <p className="mt-2 text-sm font-black">{context.text}</p>
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
              {showDemoControls ? <DataSourceBadge /> : null}
              {showDemoControls ? <DemoSessionPill /> : null}
              <Link href="/app/notificacoes" className="focus-ring-brand inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-brown/15 bg-white/60 dark:border-brand-yellow/20 dark:bg-white/10" aria-label="Notificacoes">
                <Bell size={18} />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="px-4 pb-24 pt-5 sm:px-6 lg:px-8">
          <AppAccessGuard>{children}</AppAccessGuard>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
