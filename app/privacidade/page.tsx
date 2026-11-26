import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";

export const metadata: Metadata = { title: "Privacidade | ECOTUCA" };
const contents = [
  { title: "Inscrição e acompanhamento", body: "Os formulários pedem dados de contato, disponibilidade e informações necessárias para avaliar a inscrição e organizar a turma. Para menores de idade, o formulário também solicita o contato de um responsável." },
  { title: "Rascunho no navegador", body: "Ao escolher salvar seu rascunho, os dados ficam neste navegador. Em um aparelho compartilhado, use a opção Limpar rascunho quando terminar." },
  { title: "Imagem e materiais", body: "A equipe trata autorizações de uso de imagem separadamente. Antes de enviar um material, confira se você tem permissão para compartilhar o conteúdo." },
  { title: "Dúvidas sobre seus dados", body: "Use o canal da coordenação para perguntar sobre o uso de suas informações ou a correção de dados de cadastro." }
];

export default function PrivacidadePage() {
  return (
    <PublicShell>
      <div className="site-container space-y-5 py-9 sm:py-14">
        <RichPageHeader eyebrow="Informações" title="Privacidade" description="Entenda para que servem as informações pedidas na inscrição e como o rascunho fica salvo." />
        <div className="grid gap-4 md:grid-cols-2">
          {contents.map(({ title, body }) => (
            <section key={title} className="brand-card p-5">
              <h2 className="text-card-title">{title}</h2><p className="mt-2 text-[var(--muted)]">{body}</p>
            </section>
          ))}
        </div>
        <p className="text-sm text-[var(--muted)]">Orientações preliminares. A política completa está em revisão. <Link href="/contato" className="inline-action">Consultar contato</Link></p>
      </div>
    </PublicShell>
  );
}
