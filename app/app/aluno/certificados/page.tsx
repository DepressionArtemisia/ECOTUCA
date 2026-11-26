import { Award, QrCode } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

export default function CertificatesPage() {
  return (
    <AppShell title="Certificados">
      <section className="mx-auto max-w-5xl">
        <Badge>Certificado de exemplo</Badge>
        <h1 className="brand-display mt-4 text-5xl">Certificados</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PerifaCard tone="mint">
            <Award size={34} />
            <h2 className="brand-display mt-4 text-4xl">Guia Local em Formação</h2>
            <p className="mt-2 text-sm">A emissão depende da conclusão das atividades exigidas e da validação da coordenação.</p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-brand-brown/25 bg-brand-warm p-4 text-brand-brown">
              <p className="text-xs font-black uppercase">Status</p>
              <p className="brand-display text-3xl">Em andamento - 64%</p>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-black"><QrCode size={18} /> ECOTUCA-2026-0001</p>
          </PerifaCard>
        </div>
      </section>
    </AppShell>
  );
}
