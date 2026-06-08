import Link from "next/link";
import Image from "next/image";
import { Award, Bell, BookOpen, CheckCircle2, Flame, MapPinned, PlayCircle, TimerReset } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { EcotucaOrb } from "@/components/brand/ecotuca-orb";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrackCard } from "@/components/cards/track-card";
import { EcoVideoPlayer } from "@/features/video/eco-video-player";
import { StudentJourneyMap } from "@/features/student/student-journey-map";
import { learningTracks, notices, recentActivities } from "@/lib/mock-data/ecotuca";

export function StudentDashboard() {
  const currentLesson = learningTracks[0].lessons[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        <div className="relative overflow-hidden rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
          <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#FE9440)]" />
          <BrandPattern intensity="soft" className="opacity-25" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <OfficialLogo variant="horizontal" tone="negative" size="md" />
              <div className="mt-5">
                <Badge tone="yellow">Area do aluno</Badge>
              </div>
              <h1 className="brand-display mt-5 text-5xl text-brand-yellow">Ola, Lucas</h1>
              <p className="mt-4 max-w-2xl text-brand-cream/80">
                Sua formacao conecta territorio, biodiversidade, Agenda 2030 e a chance real de atuar como guia local.
              </p>
            </div>
            <EcotucaOrb label="64%" caption="formacao geral" className="hidden md:flex" />
          </div>
          <div className="relative mt-6 max-w-xl">
            <div className="mb-2 flex justify-between text-sm font-black">
              <span>Formacao geral</span>
              <span>64%</span>
            </div>
            <Progress value={64} tone="yellow" />
          </div>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <Link href="/app/aluno/aulas/aula-guia-01">
              <EcoButton variant="mint">
                <PlayCircle size={18} />
                Continuar aula
              </EcoButton>
            </Link>
            <Link href="/app/aluno/certificados">
              <EcoButton variant="outline">
                <Award size={18} />
                Certificados
              </EcoButton>
            </Link>
          </div>
        </div>
        <PerifaCard tone="coral" className="bg-brand-yellow/95">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase">
            <Flame size={16} />
            Conquistas
          </p>
          <h2 className="brand-display mt-4 text-4xl">Protagonista do territorio</h2>
          <ul className="mt-5 space-y-3 text-sm font-bold">
            <li className="flex items-center gap-2"><CheckCircle2 size={17} />Primeiro acesso concluido</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={17} />Primeira aula finalizada</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={17} />Explorador da biodiversidade</li>
          </ul>
        </PerifaCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <PerifaCard tone="mint">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-blue">
            <TimerReset size={16} />
            Continue de onde parou
          </p>
          <h2 className="brand-display mt-4 text-4xl">{currentLesson.title}</h2>
          <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
            Seu avanco fica salvo para continuar depois.
          </p>
          <Link href={`/app/aluno/aulas/${currentLesson.id}`} className="mt-5 inline-block">
            <EcoButton variant="mint"><PlayCircle size={17} />Retomar aula</EcoButton>
          </Link>
        </PerifaCard>
        <StudentJourneyMap />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {learningTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.75fr]">
        <EcoVideoPlayer
          lessonId={currentLesson.id}
          title={currentLesson.title}
          videoId={currentLesson.videoId}
          durationSeconds={currentLesson.durationMinutes * 60}
        />
        <div className="space-y-4">
          <PerifaCard tone="mint">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-blue">
              <Bell size={16} />
              Avisos
            </p>
            <ul className="mt-4 space-y-3">
              {notices.map((notice) => (
                <li key={notice} className="rounded-lg bg-brand-warm p-3 text-sm font-bold text-brand-brown">
                  {notice}
                </li>
              ))}
            </ul>
          </PerifaCard>
          <PerifaCard tone="blue">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase">
              <BookOpen size={16} />
              Checklist da formacao
            </p>
            <div className="mt-4 space-y-3 text-sm font-bold">
              {["Assistir aulas principais", "Participar do forum", "Concluir roteiro pratico", "Emitir certificado"].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-lg bg-white/75 p-3 dark:bg-white/10">
                  <span>{item}</span>
                  <Badge tone={index < 2 ? "mint" : "yellow"}>{index < 2 ? "feito" : "pendente"}</Badge>
                </div>
              ))}
            </div>
          </PerifaCard>
          <PerifaCard tone="orange">
            <p className="text-sm font-black uppercase text-brand-orange">Atividades recentes</p>
            <ul className="mt-4 space-y-2 text-sm font-bold">
              {recentActivities.map((activity) => (
                <li key={activity} className="rounded-lg bg-white/75 p-3 dark:bg-white/10">{activity}</li>
              ))}
            </ul>
          </PerifaCard>
          <PerifaCard tone="mint">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-blue">
              <MapPinned size={16} />
              Territorio da semana
            </p>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg"
                alt="Vista do Complexo do Alemao para estudo de leitura territorial"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <h3 className="brand-display mt-4 text-3xl">Leitura de paisagem</h3>
            <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              Observe morro, cidade, acessos, areas verdes e pontos de memoria antes da aula pratica.
            </p>
          </PerifaCard>
        </div>
      </section>
    </div>
  );
}
