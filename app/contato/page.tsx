import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Mail, MapPinned, UsersRound } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";

export const metadata: Metadata = {
  title: "Contato | ECOTUCA",
  description: "Entre em contato com a ECOTUCA para falar sobre formação, parcerias e roteiros."
};

const topics = [
  { icon: BookOpen, title: "Inscrições e aulas", text: "Encontre orientações para se inscrever, entrar na plataforma e acompanhar a formação.", href: "/faq", action: "Consultar perguntas frequentes" },
  { icon: UsersRound, title: "Parcerias e imprensa", text: "Conheça a proposta da escola e o trabalho da Perifa Ecotour com o território.", href: "/sobre", action: "Conhecer o projeto" },
  { icon: MapPinned, title: "Roteiros e visitas", text: "Veja as propostas de percurso, os cuidados da visita e a situação de cada roteiro.", href: "/roteiros", action: "Explorar roteiros" }
];

export default function ContatoPage() {
  const email = process.env.ECOTUCA_CONTACT_EMAIL?.trim();
  const contact = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;

  return (
    <PublicShell>
      <div className="site-container space-y-6 py-9 sm:py-14">
        <RichPageHeader eyebrow="Contato" title="Fale com a ECOTUCA" description="Encontre o caminho para conversar sobre formação, parcerias, imprensa e visitas." />
        {contact ? (
          <section className="brand-card p-5 sm:p-7">
            <h2 className="text-card-title">E-mail da coordenação</h2>
            <a href={`mailto:${contact}`} className="inline-action mt-1 [overflow-wrap:anywhere]"><Mail size={17} aria-hidden="true" /> {contact}</a>
          </section>
        ) : <p className="brand-card p-5 text-[var(--muted)]">O canal direto de atendimento ainda está sendo definido.</p>}
        <div className="grid gap-4 md:grid-cols-3">
          {topics.map(({ icon: Icon, title, text, href, action }) => (
            <article className="brand-card p-5" key={href}>
              <Icon size={22} aria-hidden="true" />
              <h2 className="text-card-title mt-3">{title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
              <Link href={href} className="inline-action mt-2 text-sm">{action}</Link>
            </article>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
