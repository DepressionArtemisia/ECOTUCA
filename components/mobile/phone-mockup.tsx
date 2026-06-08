"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, BookOpen, CalendarCheck, ChevronRight, Home, MapPinned, PlayCircle, UserRound } from "lucide-react";
import { useState } from "react";
import { OfficialLogo } from "@/components/brand/official-logo";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EcoButton } from "@/components/brand/eco-button";
import { guides, learningTracks, tourRoutes } from "@/lib/mock-data/ecotuca";
import { cn } from "@/lib/utils";

const screens = ["Home mobile", "Roteiros", "Detalhe", "Guia", "Solicitacao enviada", "Aluno", "Video"] as const;

export function PhoneMockup() {
  const [screen, setScreen] = useState<(typeof screens)[number]>("Home mobile");
  const route = tourRoutes[0];
  const guide = guides[0];

  return (
    <section className="grid min-w-0 gap-6 overflow-hidden lg:grid-cols-[.75fr_1fr] lg:items-center">
      <div className="min-w-0 space-y-3">
        <p className="text-sm font-black uppercase text-brand-coral">Visualizacao mobile</p>
        <h1 className="brand-display text-4xl text-brand-brown dark:text-brand-yellow sm:text-5xl">App com cara de produto real</h1>
        <p className="max-w-xl text-brand-brown/75 dark:text-brand-cream/75">
          Navegue entre telas para mostrar turista, guia, aluno e videoaula com imagens reais do territorio e linguagem de produto pronto para evoluir.
        </p>
        <div className="flex flex-wrap gap-2">
          {screens.map((item) => (
            <button
              key={item}
              onClick={() => setScreen(item)}
              className={
                screen === item
                  ? "focus-ring-brand rounded-lg bg-brand-brown px-3 py-2 text-xs font-black text-brand-yellow shadow-soft dark:bg-brand-yellow dark:text-brand-brown"
                  : "focus-ring-brand rounded-lg border border-brand-brown/15 bg-white px-3 py-2 text-xs font-black hover:bg-brand-yellow dark:border-brand-yellow/20 dark:bg-white/10"
              }
            >
              {item}
            </button>
          ))}
        </div>
        <Link href="/roteiros/serra-da-misericordia" className="inline-block">
          <EcoButton variant="mint">Abrir tela real</EcoButton>
        </Link>
      </div>

      <div className="mx-auto w-full min-w-0 max-w-[19rem] rounded-mobile border-8 border-brand-brown bg-brand-brown p-2 shadow-mobile sm:max-w-sm sm:border-[12px] sm:p-3">
        <div className="relative h-[640px] max-h-[78vh] min-h-[540px] overflow-hidden rounded-[1.35rem] bg-brand-cream text-brand-brown sm:h-[680px] sm:min-h-[560px] sm:rounded-[1.45rem]">
          <div className="flex items-center justify-between bg-brand-yellow px-5 py-2 text-[10px] font-black">
            <span>09:41</span>
            <span className="h-3 w-16 rounded-lg bg-brand-brown/80" />
          </div>
          <div className="flex items-center justify-between bg-brand-yellow px-5 pb-3 pt-2">
            <OfficialLogo variant="horizontal" size="sm" />
            <Badge tone="brown">demo</Badge>
          </div>
          <div className="h-[calc(100%-148px)] overflow-y-auto px-4 pb-6 pt-4 transition duration-300">
            {screen === "Home mobile" && (
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg bg-brand-brown p-4 text-brand-cream">
                  <Image
                    src={route.coverUrl}
                    alt={route.coverAlt}
                    fill
                    className="object-cover opacity-30"
                    sizes="320px"
                  />
                  <div className="relative">
                    <Badge tone="mint">Perifa Ecotour</Badge>
                    <h2 className="brand-display mt-3 text-4xl text-brand-yellow">Explore o territorio</h2>
                    <p className="mt-2 text-sm text-brand-cream/80">Roteiros, guias e formacao em um app mobile-first.</p>
                  </div>
                </div>
                {tourRoutes.slice(0, 2).map((item) => (
                  <RouteMini key={item.slug} title={item.title} image={item.coverUrl} alt={item.coverAlt} slug={item.slug} />
                ))}
              </div>
            )}
            {screen === "Roteiros" && (
              <div className="space-y-3">
                {tourRoutes.map((item) => (
                  <RouteMini key={item.slug} title={item.title} image={item.coverUrl} alt={item.coverAlt} slug={item.slug} />
                ))}
              </div>
            )}
            {screen === "Detalhe" && (
              <div className="space-y-4">
                <Image src={route.coverUrl} alt={route.coverAlt} width={360} height={230} className="rounded-lg object-cover" />
                <Badge tone="yellow">R$ {route.price}</Badge>
                <h2 className="brand-display text-4xl">{route.title}</h2>
                <p className="text-sm">{route.description}</p>
                <p className="rounded-lg bg-brand-yellow/45 p-3 text-xs font-black">{route.validationNote}</p>
                <EcoButton variant="mint">Tenho interesse</EcoButton>
              </div>
            )}
            {screen === "Guia" && (
              <div className="space-y-4">
                <Image src={guide.avatar} alt={`Simbolo temporario do perfil de ${guide.name}`} width={96} height={96} className="rounded-lg" />
                <h2 className="brand-display text-4xl">{guide.name}</h2>
                <p className="text-sm">{guide.bio}</p>
                <div className="flex flex-wrap gap-2">{guide.certificates.map((item) => <Badge key={item} tone="blue">{item}</Badge>)}</div>
              </div>
            )}
            {screen === "Solicitacao enviada" && (
              <div className="space-y-3">
                <Badge tone="mint">Solicitacao enviada</Badge>
                <h2 className="brand-display text-4xl">Equipe ECOTUCA acionada</h2>
                <p className="text-sm font-bold">A equipe entrara em contato para confirmar agenda, guia, ponto de encontro e orientacoes de preparo.</p>
                {["Nome", "Telefone", "Data preferida", "Pessoas"].map((field) => (
                  <div key={field} className="rounded-lg border border-brand-brown/15 bg-white p-3 text-sm font-bold">{field}</div>
                ))}
                <EcoButton variant="coral"><CalendarCheck size={16} />Solicitar outro roteiro</EcoButton>
              </div>
            )}
            {screen === "Aluno" && (
              <div className="space-y-4">
                <h2 className="brand-display text-4xl">Oi, Lucas</h2>
                <Progress value={64} tone="yellow" />
                {learningTracks.map((track) => (
                  <div key={track.id} className="rounded-lg bg-white p-4 shadow-brand">
                    <Badge tone={track.accent}>{track.category}</Badge>
                    <p className="mt-2 font-black">{track.title}</p>
                  </div>
                ))}
              </div>
            )}
            {screen === "Video" && (
              <div className="space-y-4">
                <div className="flex aspect-video items-center justify-center rounded-lg bg-brand-brown text-brand-yellow">
                  <PlayCircle size={52} />
                </div>
                <h2 className="brand-display text-3xl">Como contar o territorio</h2>
                <Progress value={72} tone="mint" />
                <p className="text-sm font-bold">Continuar de onde parei: 03:42</p>
              </div>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 border-t border-brand-brown/10 bg-white/95 px-2 py-2">
            <div className="grid grid-cols-5 gap-1">
              {[
                { label: "Inicio", icon: Home },
                { label: "Trilhas", icon: BookOpen },
                { label: "Roteiros", icon: MapPinned },
                { label: "Avisos", icon: Bell },
                { label: "Perfil", icon: UserRound }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className={cn(
                      "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-black",
                      index === 0 ? "bg-brand-yellow text-brand-brown" : "text-brand-brown/70"
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteMini({ title, image, alt, slug }: { title: string; image: string; alt: string; slug: string }) {
  return (
    <Link href={`/roteiros/${slug}`} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-brand transition hover:-translate-y-0.5">
      <Image src={image} alt={alt} width={78} height={78} className="h-20 w-20 rounded-lg object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-black">{title}</p>
        <p className="mt-1 flex items-center gap-1 text-xs font-bold text-brand-brown/70"><MapPinned size={13} />Complexo do Alemao</p>
      </div>
      <ChevronRight size={18} />
    </Link>
  );
}
