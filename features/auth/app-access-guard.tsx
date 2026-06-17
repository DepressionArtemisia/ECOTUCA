"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/auth-provider";
import { getAccessDecision, type AccessDecision } from "@/lib/auth/access-policy";
import {
  isDemoSessionAllowedInEnforcedAccess,
  shouldEnforceAppAccess
} from "@/lib/auth/runtime";

export function AppAccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  if (!shouldEnforceAppAccess()) return <>{children}</>;

  if (loading) {
    return (
      <AccessStatePanel
        badge="Verificando acesso"
        title="Preparando sua area"
        text="Estamos validando sessao, perfil e status de aprovacao antes de abrir a plataforma."
      />
    );
  }

  const decision = getAccessDecision(user, pathname, {
    allowDemoSource: isDemoSessionAllowedInEnforcedAccess()
  });

  if (decision.allowed) return <>{children}</>;
  return <AccessDeniedPanel decision={decision} />;
}

function AccessDeniedPanel({ decision }: { decision: AccessDecision }) {
  const copy = accessDeniedCopy(decision);
  return (
    <AccessStatePanel badge="Acesso restrito" title={copy.title} text={copy.text}>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href={copy.href} className={buttonVariants({ variant: "primary" })}>
          {copy.action}
          <ArrowRight size={17} />
        </Link>
        <Link href="/contato" className={buttonVariants({ variant: "outline" })}>
          Falar com a coordenacao
        </Link>
      </div>
    </AccessStatePanel>
  );
}

function AccessStatePanel({
  badge,
  title,
  text,
  children
}: {
  badge: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl rounded-lg border border-brand-brown/10 bg-white p-6 text-brand-brown shadow-card dark:border-brand-yellow/15 dark:bg-brand-dark-soft dark:text-brand-cream sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-yellow text-brand-brown">
          <LockKeyhole size={22} />
        </span>
        <Badge tone="coral">{badge}</Badge>
      </div>
      <h1 className="brand-display mt-6 text-5xl text-brand-brown dark:text-brand-yellow sm:text-6xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm font-bold leading-relaxed text-brand-brown/75 dark:text-brand-cream/75">
        {text}
      </p>
      <div className="mt-5 rounded-lg bg-brand-mint/20 p-4 text-sm font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
        <ShieldCheck className="mb-2" size={20} />
        A plataforma abre areas internas somente para contas aprovadas e com perfil compativel.
      </div>
      {children}
    </section>
  );
}

function accessDeniedCopy(decision: AccessDecision) {
  if (decision.reason === "status_pending") {
    return {
      title: "Cadastro em analise",
      text: "Seu perfil ja foi recebido e precisa da aprovacao da coordenacao antes de acessar esta area.",
      action: "Ver status",
      href: "/aguardando-aprovacao"
    };
  }

  if (decision.reason === "role_denied") {
    return {
      title: "Perfil sem permissao",
      text: `Esta area pertence a ${decision.requirement?.label ?? "outro perfil"} e exige uma conta autorizada para seguir.`,
      action: "Entrar com outra conta",
      href: "/entrar"
    };
  }

  if (decision.reason === "demo_source_denied") {
    return {
      title: "Sessao real necessaria",
      text: "O ambiente de producao nao aceita sessao demonstrativa para areas internas.",
      action: "Entrar com Supabase",
      href: "/entrar"
    };
  }

  return {
    title: "Entrada protegida",
    text: "Entre com uma conta ECOTUCA aprovada para acessar a plataforma de ensino.",
    action: "Entrar",
    href: "/entrar"
  };
}
