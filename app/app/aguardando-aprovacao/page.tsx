import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";

export default function WaitingApprovalPage() {
  return (
    <AppShell title="Aguardando aprovacao">
      <section className="mx-auto max-w-3xl rounded-lg bg-brand-yellow p-6 text-brand-brown shadow-brand">
        <Badge tone="coral">Cadastro pendente</Badge>
        <h1 className="brand-display mt-4 text-5xl">Aguardando aprovacao</h1>
        <p className="mt-3 font-bold">
          Seu cadastro foi recebido e precisa de validacao da coordenacao ECOTUCA antes do acesso completo.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <EcoButton variant="mint">Voltar ao inicio</EcoButton>
        </Link>
      </section>
    </AppShell>
  );
}
