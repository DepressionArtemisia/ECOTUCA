"use client";

import Link from "next/link";
import { ExternalLink, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { Progress } from "@/components/ui/progress";
import { useCurrentUser } from "@/features/auth/use-current-user";
import { loadBestProgress, saveProgress } from "@/lib/data/progress";
import { secondsToTime } from "@/lib/utils";

type Player = {
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
};

type YouTubeAPI = { Player: new (element: HTMLIFrameElement, options: {
  events: { onReady(): void; onStateChange(event: { data: number }): void; onError(): void };
}) => Player };

let pendingApi: Promise<YouTubeAPI> | undefined;

function loadYouTubeApi() {
  const youtubeWindow = window as Window & { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void };
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  pendingApi ??= new Promise<YouTubeAPI>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    const fail = () => {
      window.clearTimeout(timeout);
      script.remove();
      pendingApi = undefined;
      reject(new Error("YouTube indisponível"));
    };
    const timeout = window.setTimeout(fail, 12000);
    script.onerror = fail;
    youtubeWindow.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timeout);
      if (youtubeWindow.YT?.Player) resolve(youtubeWindow.YT);
      else fail();
    };
    document.head.append(script);
  });
  return pendingApi;
}

export function EcoVideoPlayer({ lessonId, title, videoId, userId = "demo-student-lucas", durationSeconds = 1080 }: {
  lessonId: string;
  title: string;
  videoId: string;
  userId?: string;
  durationSeconds?: number;
}) {
  const currentUser = useCurrentUser();
  const effectiveUserId = currentUser?.id ?? userId;
  const videoArea = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const lastSaved = useRef({ seconds: 0, completed: false });
  const [activated, setActivated] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [duration, setDuration] = useState(durationSeconds);
  const [progress, setProgress] = useState({ seconds: 0, percent: 0, completed: false });

  useEffect(() => {
    let active = true;
    const savedProgress = loadBestProgress(effectiveUserId, lessonId);
    setPlayerReady(false);
    setFailed(false);
    setProgress({ seconds: 0, percent: 0, completed: false });
    setDuration(durationSeconds);
    lastSaved.current = { seconds: 0, completed: false };
    savedProgress.then(({ progress: saved }) => {
      if (!active || !saved) return;
      lastSaved.current = { seconds: saved.currentTime, completed: saved.completed };
      setProgress({ ...lastSaved.current, percent: saved.percent });
      if (saved.duration > 0) setDuration(saved.duration);
    });
    if (!activated || !videoArea.current) return () => { active = false; };

    const host = videoArea.current;
    const embed = new URL(`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`);
    embed.search = new URLSearchParams({ enablejsapi: "1", origin: window.location.origin, autoplay: "1", playsinline: "1", rel: "0" }).toString();
    const iframe = document.createElement("iframe");
    iframe.src = embed.href;
    iframe.title = title;
    iframe.className = "h-full w-full";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    host.append(iframe);
    let stateChanged = false;

    function capture(ended = false) {
      const player = playerRef.current;
      if (!player || !stateChanged || !active) return;
      const total = Math.max(1, player.getDuration() || durationSeconds);
      const seconds = Math.min(total, Math.round(player.getCurrentTime()));
      const completed = lastSaved.current.completed || ended;
      if (seconds === lastSaved.current.seconds && completed === lastSaved.current.completed) return;
      const percent = Math.min(100, Math.round(seconds / total * 100));
      lastSaved.current = { seconds, completed };
      setProgress({ seconds, percent, completed });
      setDuration(total);
      void saveProgress({ userId: effectiveUserId, lessonId, currentTime: seconds, duration: total, percent, completed, updatedAt: new Date().toISOString() });
    }

    loadYouTubeApi().then(async (api) => {
      await savedProgress;
      if (!active) return;
      playerRef.current = new api.Player(iframe, {
        events: {
          onReady() {
            if (!active) return;
            const resume = lastSaved.current;
            if (!resume.completed && resume.seconds > 0) playerRef.current?.seekTo(resume.seconds, true);
            setPlayerReady(true);
          },
          onStateChange({ data }) {
            if (data === 1) stateChanged = true;
            if (data === 0 || data === 2) capture(data === 0);
          },
          onError() { if (active) setFailed(true); }
        }
      });
    }).catch(() => { if (active) setFailed(true); });
    const interval = window.setInterval(() => {
      if (playerRef.current?.getPlayerState() === 1) capture();
    }, 5000);

    return () => {
      active = false;
      window.clearInterval(interval);
      playerRef.current?.destroy();
      playerRef.current = null;
      iframe.remove();
    };
  }, [activated, durationSeconds, effectiveUserId, lessonId, title, videoId]);

  return (
    <section className="brand-card overflow-hidden" aria-label="Vídeo da aula">
      <div className="relative grid min-h-[200px] place-items-center bg-[#211714] text-brand-cream sm:aspect-video">
        <div ref={videoArea} className="absolute inset-0" />
        {!activated && (
          <EcoButton className="relative" onClick={() => setActivated(true)}><Play size={17} aria-hidden="true" /> Carregar vídeo</EcoButton>
        )}
        {failed && <div className="absolute inset-x-0 bottom-0 bg-[#211714] p-3 text-sm" role="status">O vídeo integrado está indisponível agora. Use o link abaixo.</div>}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold">{progress.completed ? "Reprodução concluída" : progress.seconds > 0
            ? `Você parou em ${secondsToTime(progress.seconds)} de ${secondsToTime(duration)}.`
            : "Seu avanço aparece aqui depois de iniciar o vídeo."}</p>
          {playerReady && !failed && <EcoButton variant="outline" size="sm" onClick={() => playerRef.current?.seekTo(0, true)}><RotateCcw size={15} aria-hidden="true" /> Rever do início</EcoButton>}
        </div>
        <Progress className="mt-3" value={progress.completed ? 100 : progress.percent} label="Progresso do vídeo" />
        <Link className="inline-action mt-2 text-sm" href={`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`} target="_blank" rel="noreferrer">
          Abrir no YouTube (nova aba) <ExternalLink size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
