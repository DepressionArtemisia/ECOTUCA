import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { FaqAccordion } from "@/components/content/faq-accordion";

export const metadata: Metadata = { title: "Perguntas frequentes | ECOTUCA" };

const items = [
  { question: "Quem pode se inscrever para estudar?", answer: "A formação é voltada a jovens interessados em ecoturismo, educação ambiental e cultura do Complexo do Alemão. A coordenação avalia as inscrições e orienta sobre os critérios de cada turma." },
  { question: "Quando recebo acesso?", answer: "A coordenação analisa sua inscrição primeiro. Use o contato informado no formulário para receber as orientações da equipe." },
  { question: "O que vou estudar?", answer: "As trilhas abordam condução de grupos, segurança nos percursos, biodiversidade urbana, turismo comunitário e Agenda 2030." },
  { question: "Como posso colaborar como professor?", answer: "Use a inscrição de professor para apresentar sua experiência, os assuntos que pode ensinar e sua disponibilidade. A coordenação conversa com você para planejar a participação." },
  { question: "Como faço para visitar o território?", answer: "Consulte a página de roteiros para ver as propostas e os cuidados de cada percurso. A realização depende da avaliação local, da disponibilidade da equipe e das condições da visita." },
  { question: "Como recupero minha senha?", answer: "Na tela de entrada, escolha Esqueci minha senha e informe o e-mail vinculado à sua conta. Use o link de recuperação enviado para esse e-mail." }
];

export default function FaqPage() {
  return (
    <PublicShell>
      <div className="site-container space-y-5 py-9 sm:py-14">
        <RichPageHeader eyebrow="Ajuda" title="Perguntas frequentes" description="Saiba como se inscrever, participar da formação e conhecer os roteiros." />
        <FaqAccordion items={items} />
      </div>
    </PublicShell>
  );
}
