import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Leaf, MapPin, UsersRound } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { OfficialLogo } from "@/components/brand/official-logo";
import { buttonVariants } from "@/components/ui/button";
import { getMediaAsset } from "@/lib/mock-data/media-assets";

const territory = getMediaAsset("complexo-alemao-panorama");

const curriculum = [
  { title: "Formação de guia local", description: "Aprenda a planejar percursos, orientar grupos e contar a história do território com cuidado.", icon: Compass },
  { title: "Meio ambiente e biodiversidade", description: "Leia a paisagem, reconheça a natureza urbana e relacione o cuidado com o território à Agenda 2030.", icon: Leaf },
  { title: "Turismo comunitário e renda", description: "Desenvolva experiências que valorizam o trabalho local e ajudam a gerar renda na comunidade.", icon: UsersRound }
];

const steps = [
  { title: "Envie sua inscrição", description: "Conte um pouco sobre você, seus interesses e sua disponibilidade." },
  { title: "Aguarde o retorno", description: "A coordenação analisa a inscrição e orienta você sobre o acesso à turma." },
  { title: "Estude e pratique", description: "Avance pelas trilhas, faça as atividades e receba orientações dos professores." },
  { title: "Conclua sua formação", description: "Cumpra as etapas do curso para se qualificar à certificação." }
];

export default function HomePage() {
  return (
    <PublicShell>
      <section className="home-hero">
        <div className="site-container home-hero-grid">
          <div className="home-intro">
            <p className="section-label"><span /> Escola de ecoturismo</p>
            <h1 className="home-title">O território <em>ensina.</em></h1>
            <p className="home-lead">Formação em ecoturismo para jovens do Complexo do Alemão. Aprenda com o lugar onde você vive e descubra caminhos para atuar como guia local.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/cadastro/aluno" className={buttonVariants({ size: "lg" })}>
                Quero estudar <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="#trilhas" className="inline-action">
                Ver as trilhas <ArrowDown size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <figure className="territory-figure">
            <div className="territory-photo">
              <Image src={territory.src} alt={territory.alt} fill priority sizes="(max-width: 767px) 100vw, 650px" className="object-cover" />
              <div className="territory-pin"><MapPin size={15} aria-hidden="true" /> Zona Norte, Rio de Janeiro</div>
            </div>
            <figcaption>
              <span>Complexo do Alemão</span>
              <Link href="/creditos-imagens" className="underline decoration-current/30 underline-offset-4">Foto de Acediscovery</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="home-curriculum" id="trilhas" aria-labelledby="trilhas-titulo">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="section-label"><span /> Trilhas de aprendizagem</p>
              <h2 className="text-section-title mt-3" id="trilhas-titulo">O que você vai aprender</h2>
            </div>
            <p>Aulas e atividades que aproximam o estudo da prática no território.</p>
          </div>
          <div className="curriculum-grid">
            {curriculum.map(({ title, description, icon: Icon }) => (
              <article key={title}>
                <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-path" aria-labelledby="jornada-titulo">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="section-label"><span /> Sua jornada</p>
              <h2 className="text-section-title mt-3" id="jornada-titulo">Da inscrição ao certificado</h2>
            </div>
            <Link href="/como-funciona" className="inline-action">Como funciona a formação <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <ol className="journey-grid">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="journey-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-container home-invitation" aria-label="Outras formas de participar">
        <div>
          <h2 className="text-section-title">Outras formas de participar</h2>
          <p>Educadores podem colaborar com a formação. Visitantes podem conhecer as propostas de roteiro da Perifa Ecotour.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/cadastro/professor" className="inline-action">Quero ensinar <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link href="/roteiros" className="inline-action">Conhecer os roteiros <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <OfficialLogo brand="perifa" size="lg" />
      </section>
    </PublicShell>
  );
}
