import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, ShieldCheck } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { PublicShell } from "@/components/layout/public-shell";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Aguardando aprovacao | ECOTUCA",
  description: "Seu cadastro ECOTUCA foi recebido e aguarda validacao da coordenacao."
};

export default function PublicWaitingApprovalPage() {
  return (
    <PublicShell>
      <section className="brand-surface relative overflow-hidden">
        <BrandPattern intensity="soft" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl items-center px-5 py-12 sm:px-6">
          <div className="brand-card w-full p-5 text-center dark:bg-brand-dark-soft/90 sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-brand-yellow text-brand-brown">
              <Clock3 size={30} />
            </div>
            <Badge tone="coral" className="mt-5">Cadastro recebido</Badge>
            <h1 className="brand-display mx-auto mt-5 max-w-3xl text-5xl sm:text-6xl">
              Agora a coordenacao valida seu acesso.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-bold text-brand-brown/72 dark:text-brand-cream/72">
              A ECOTUCA usa aprovacao para proteger estudantes, professores, turmas e dados. Voce recebera retorno pelo contato informado no cadastro.
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {[
                { title: "Analise", text: "Perfil e dados conferidos pela equipe.", icon: ShieldCheck },
                { title: "Contato", text: "Retorno por e-mail ou WhatsApp informado.", icon: Mail },
                { title: "Entrada", text: "Acesso liberado depois da aprovacao.", icon: Clock3 }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg bg-brand-warm p-4 text-left text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                    <Icon size={22} className="text-brand-coral" />
                    <h2 className="brand-display mt-3 text-3xl">{item.title}</h2>
                    <p className="mt-1 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{item.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/">
                <EcoButton variant="mint">Voltar ao inicio</EcoButton>
              </Link>
              <Link href="/contato">
                <EcoButton variant="outline">Falar com a equipe</EcoButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
