import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";

const fieldsByRole: Record<string, string[]> = {
  aluno: ["Nome completo", "E-mail", "Telefone", "Data de nascimento", "Bairro/comunidade", "Escolaridade", "Interesse no projeto", "Termo de aceite", "Autorizacao de uso de dados"],
  professor: ["Nome", "E-mail", "Telefone", "Area de atuacao", "Mini bio", "Materiais que pode publicar"],
  guia: ["Nome", "E-mail", "Telefone", "Bio", "Especialidades", "Idiomas", "Certificados", "Disponibilidade"],
  turista: ["Nome", "E-mail", "Telefone", "Cidade/pais de origem", "Interesse em roteiros", "Permissao para receber contato"]
};

export default async function RegisterRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const fields = fieldsByRole[role] ?? fieldsByRole.aluno;

  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <Badge tone="mint">Cadastro {role}</Badge>
        <h1 className="brand-display mt-5 text-6xl">Entrar na ECOTUCA</h1>
        <div className="mt-8 rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field} className="block">
                <span className="text-sm font-black">{field}</span>
                <div className="mt-1 rounded-lg border border-brand-brown/15 bg-brand-warm px-4 py-3 text-sm text-brand-brown/65 dark:border-brand-yellow/20">
                  {field}
                </div>
              </label>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <EcoButton variant="coral">Enviar cadastro</EcoButton>
            <Link href="/login"><EcoButton variant="outline">Ja tenho acesso</EcoButton></Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
