"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buildEmbedUrl, listenMessage, readProgressSeconds, type ResolvedVsl } from "@/lib/vsl";
import { loadYouTubeApi, YT_STATE, youtubePlayerVars, type YTPlayer } from "@/lib/youtube";

interface VslPlayerProps {
  vsl: ResolvedVsl;
  posterSrc: string;
  playLabel: string;
  pauseLabel: string;
  resumeLabel: string;
  title: string;
  /** Disparado uma vez, no primeiro play (ponto de ligação do evento ViewContent). */
  onPlay?: () => void;
  /** Segundos assistidos, quando o provedor informa (mp4, youtube, vimeo). */
  onProgress?: (seconds: number) => void;
  className?: string;
}

const FRAME_CLASS = "absolute inset-0 h-full w-full";

function PlayIcon() {
  return (
    <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-glim-gold text-glim-dark shadow-[0_0_0_10px_rgba(242,183,123,0.18),0_0_50px_rgba(242,183,123,0.55)] transition-transform duration-200 group-hover:scale-105 md:h-24 md:w-24">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="ml-1 h-8 w-8 fill-current md:h-10 md:w-10">
        <path d="M8 5v14l11-7Z" />
      </svg>
    </span>
  );
}

export function VslPlayer(props: VslPlayerProps) {
  if (props.vsl.provider === "youtube") return <YouTubeVsl {...props} />;
  return <EmbedVsl {...props} />;
}

/* -------------------------------------------------------------------------- */
/* YouTube: API com controls=0 e controles próprios (play/pausa + barra).      */
/* -------------------------------------------------------------------------- */

type YtView = "poster" | "starting" | "playing" | "paused" | "ended";

function YouTubeVsl({ vsl, posterSrc, playLabel, pauseLabel, resumeLabel, title, onPlay, onProgress, className }: VslPlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const startedRef = useRef(false);
  const [view, setView] = useState<YtView>("poster");
  const [progress, setProgress] = useState(0);
  // Alguns celulares (iOS) bloqueiam o autoplay: aí o toque vai direto no player do YouTube.
  const [needsNativeTap, setNeedsNativeTap] = useState(false);

  // Pré-carrega a API depois que a página assenta, para o play responder na hora.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadYouTubeApi().catch(() => {});
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => () => playerRef.current?.destroy(), []);

  // Tempo assistido e barra de progresso.
  useEffect(() => {
    if (view !== "playing") return;
    const tick = () => {
      const player = playerRef.current;
      if (!player) return;
      const current = player.getCurrentTime();
      const duration = player.getDuration();
      if (duration > 0) setProgress(Math.min(current / duration, 1));
      onProgress?.(current);
    };
    tick();
    const timer = window.setInterval(tick, 500);
    return () => window.clearInterval(timer);
  }, [view, onProgress]);

  const handleState = useCallback(
    (state: number) => {
      if (state === YT_STATE.PLAYING) {
        setNeedsNativeTap(false);
        setView("playing");
        if (!startedRef.current) {
          startedRef.current = true;
          onPlay?.();
        }
      } else if (state === YT_STATE.PAUSED) {
        setView("paused");
      } else if (state === YT_STATE.ENDED) {
        setProgress(1);
        setView("ended");
      }
    },
    [onPlay],
  );

  const start = useCallback(async () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      return;
    }
    setView("starting");
    try {
      const YT = await loadYouTubeApi();
      const host = hostRef.current;
      if (!host) return;
      const target = document.createElement("div");
      host.appendChild(target);
      playerRef.current = new YT.Player(target, {
        host: "https://www.youtube-nocookie.com",
        videoId: vsl.source,
        width: "100%",
        height: "100%",
        playerVars: youtubePlayerVars(window.location.origin),
        events: {
          onReady: (event) => {
            const frame = event.target.getIframe();
            frame.title = title;
            frame.className = FRAME_CLASS;
            event.target.playVideo();
            // Se em 1,5 s não começou, o navegador barrou o autoplay: libera o toque no player.
            window.setTimeout(() => {
              if (event.target.getPlayerState() !== YT_STATE.PLAYING) setNeedsNativeTap(true);
            }, 1500);
          },
          onStateChange: (event) => handleState(event.data),
        },
      });
    } catch {
      setNeedsNativeTap(true);
    }
  }, [vsl.source, title, handleState]);

  const togglePause = () => {
    const player = playerRef.current;
    if (!player) return;
    if (view === "playing") player.pauseVideo();
    else player.playVideo();
  };

  const coverVisible = view === "poster" || view === "paused" || view === "ended";

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-2xl bg-black", className)}>
      {/* O iframe do YouTube é montado aqui no primeiro play. */}
      <div ref={hostRef} className="absolute inset-0" />

      {/* Camada transparente durante a reprodução: bloqueia o hover (título, logo) e pausa no clique. */}
      {view === "playing" ? (
        <button
          type="button"
          onClick={togglePause}
          aria-label={pauseLabel}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glim-gold"
        />
      ) : null}

      {/* Capa: antes do play, ao pausar e no fim (esconde a tela de pausa e as sugestões do YouTube). */}
      {coverVisible && !needsNativeTap ? (
        <button
          type="button"
          onClick={view === "poster" ? start : togglePause}
          aria-label={view === "poster" ? playLabel : resumeLabel}
          className="group absolute inset-0 z-20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glim-gold"
        >
          <Image src={posterSrc} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          <span className={cn("absolute inset-0", view === "poster" ? "bg-gradient-to-t from-black/45 via-black/10 to-transparent" : "bg-black/55")} />
          <span className="relative flex flex-col items-center gap-3">
            <PlayIcon />
            {view !== "poster" ? (
              <span className="rounded-full bg-black/50 px-3 py-1 font-mono text-[11px] text-glim-cream/90 backdrop-blur-sm">
                {resumeLabel}
              </span>
            ) : null}
          </span>
        </button>
      ) : null}

      {/* Carregando o player (entre o clique e o início). */}
      {view === "starting" && !needsNativeTap ? (
        <div aria-hidden="true" className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-glim-gold/30 border-t-glim-gold" />
        </div>
      ) : null}

      {/* Barra de progresso (só leitura: não dá para avançar o vídeo). */}
      {view !== "poster" ? (
        <div
          role="progressbar"
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="absolute inset-x-0 bottom-0 z-30 h-1.5 bg-white/15"
        >
          <div className="h-full bg-glim-gold transition-[width] duration-500 ease-linear" style={{ width: `${progress * 100}%` }} />
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Vimeo, Panda e mp4: capa + player do provedor no clique.                    */
/* -------------------------------------------------------------------------- */

function EmbedVsl({ vsl, posterSrc, playLabel, title, onPlay, onProgress, className }: VslPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    onPlay?.();
  };

  // Teclado: depois do play, o foco vai para o player.
  useEffect(() => {
    if (!playing) return;
    frameRef.current?.focus();
    videoRef.current?.focus();
  }, [playing]);

  // vimeo: pede ao player, via postMessage, os eventos de tempo assistido.
  useEffect(() => {
    const frame = frameRef.current;
    if (!playing || !onProgress || !frame || vsl.provider !== "vimeo") return;

    const { message, targetOrigin } = listenMessage();
    let received = false;

    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== frame.contentWindow) return;
      const seconds = readProgressSeconds(event.data);
      if (seconds === null) return;
      received = true;
      onProgress(seconds);
    };
    const send = () => frame.contentWindow?.postMessage(message, targetOrigin);

    window.addEventListener("message", onMessage);
    frame.addEventListener("load", send);
    // O iframe pode demorar a aceitar a assinatura: repete por até 10 s.
    const retry = window.setInterval(() => {
      if (received) window.clearInterval(retry);
      else send();
    }, 1000);
    const stop = window.setTimeout(() => window.clearInterval(retry), 10000);

    return () => {
      window.removeEventListener("message", onMessage);
      frame.removeEventListener("load", send);
      window.clearInterval(retry);
      window.clearTimeout(stop);
    };
  }, [playing, vsl.provider, onProgress]);

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-2xl bg-black", className)}>
      {!playing ? (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={playLabel}
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glim-gold"
        >
          <Image src={posterSrc} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <PlayIcon />
        </button>
      ) : vsl.provider === "mp4" ? (
        <video
          ref={videoRef}
          src={vsl.source}
          title={title}
          controls
          autoPlay
          playsInline
          className={FRAME_CLASS}
          onTimeUpdate={(event) => onProgress?.(event.currentTarget.currentTime)}
        />
      ) : (
        <iframe
          ref={frameRef}
          src={buildEmbedUrl(vsl)}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className={FRAME_CLASS}
        />
      )}
    </div>
  );
}
