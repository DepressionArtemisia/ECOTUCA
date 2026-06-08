"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { OfficialLogo } from "@/components/brand/official-logo";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCurrentUser } from "@/features/auth/use-current-user";
import { loadBestProgress, saveProgress, type VideoProgressPayload } from "@/lib/data/progress";
import { secondsToTime } from "@/lib/utils";

export function EcoVideoPlayer({
  lessonId,
  title,
  videoId,
  userId = "demo-student-lucas",
  durationSeconds = 1080
}: {
  lessonId: string;
  title: string;
  videoId: string;
  userId?: string;
  durationSeconds?: number;
}) {
  const currentUser = useCurrentUser();
  const effectiveUserId = currentUser?.id ?? userId;
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [ready, setReady] = useState(false);
  const [progressSource, setProgressSource] = useState<"supabase" | "localStorage">("localStorage");
  const percent = Math.min(100, Math.round((seconds / durationSeconds) * 100));
  const completed = percent >= 90;

  const persist = useCallback((nextSeconds: number) => {
    const nextPercent = Math.min(100, Math.round((nextSeconds / durationSeconds) * 100));
    const payload: VideoProgressPayload = {
      currentTime: nextSeconds,
      duration: durationSeconds,
      percent: nextPercent,
      completed: nextPercent >= 90,
      lessonId,
      userId: effectiveUserId,
      updatedAt: new Date().toISOString()
    };
    void saveProgress(payload).then((result) => setProgressSource(result.source));
  }, [durationSeconds, effectiveUserId, lessonId]);

  useEffect(() => {
    let active = true;

    async function load() {
      const result = await loadBestProgress(effectiveUserId, lessonId);
      if (!active) return;
      if (result.progress) {
        setSeconds(Math.min(result.progress.currentTime ?? 0, durationSeconds));
      }
      setProgressSource(result.source);
      setReady(true);
    }

    load();
    return () => {
      active = false;
    };
  }, [durationSeconds, effectiveUserId, lessonId]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setSeconds((current) => {
        const next = Math.min(durationSeconds, current + 5);
        persist(next);
        return next;
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [durationSeconds, persist, playing]);

  useEffect(() => {
    if (!ready) return;
    persist(seconds);
  }, [persist, ready, seconds]);

  useEffect(() => {
    function saveBeforeExit() {
      persist(seconds);
    }
    window.addEventListener("beforeunload", saveBeforeExit);
    return () => window.removeEventListener("beforeunload", saveBeforeExit);
  }, [persist, seconds]);

  function togglePlayback() {
    if (!playing && seconds === 0) {
      setSeconds(5);
      persist(5);
    } else {
      persist(seconds);
    }
    setPlaying((value) => !value);
  }

  function reset() {
    setPlaying(false);
    setSeconds(0);
    persist(0);
  }

  return (
    <section className="overflow-hidden rounded-lg border border-brand-yellow/20 bg-brand-brown text-brand-cream shadow-glow">
      <div className="relative aspect-video bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-brand-brown/80 to-transparent p-4">
          <OfficialLogo variant="horizontal" tone="negative" size="sm" />
          <span className="rounded-lg bg-brand-mint px-3 py-1 text-xs font-black text-brand-brown">{completed ? "Aula concluida" : "Em andamento"}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-black text-brand-yellow">{title}</h3>
            <p className="mt-1 text-sm text-brand-cream/75">Voce parou em {secondsToTime(seconds)} de {secondsToTime(durationSeconds)}.</p>
            <div className="mt-2">
              <Badge tone={progressSource === "supabase" ? "mint" : "yellow"}>
                {progressSource === "supabase" ? "Base conectada + avanco local" : "Seu avanco fica salvo para continuar depois"}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <EcoButton variant="mint" onClick={togglePlayback}>
              {playing ? <Pause size={17} /> : <Play size={17} />}
              {seconds > 0 ? "Continuar de onde parei" : "Iniciar aula"}
            </EcoButton>
            <EcoButton variant="outline" onClick={reset}>
              <RotateCcw size={17} />
              Reiniciar
            </EcoButton>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm font-black">
            <span>Progresso salvo</span>
            <span>{completed ? "Aula concluida" : `${percent}%`}</span>
          </div>
          <Progress value={percent} tone={percent >= 90 ? "yellow" : "mint"} />
        </div>
      </div>
    </section>
  );
}
