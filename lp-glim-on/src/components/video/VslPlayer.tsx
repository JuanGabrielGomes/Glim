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
  onProgress?: (seconds: number, duration: number) => void;
  /** YouTube: começa a tocar sozinho, sem som, até a pessoa tocar para ouvir. */
  autoplayMuted?: boolean;
  /** Texto do botão de ativar o som na prévia muda. */
  unmuteLabel?: string;
  className?: string;
}

const FRAME_CLASS = "absolute inset-0 h-full w-full";

function PlayIcon() {
  return (
    <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center faceta [--f:16px] bg-linho-050 text-grafite-950 transition-transform duration-200 group-hover:scale-105 md:h-24 md:w-24">
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

function YouTubeVsl({
  vsl,
  posterSrc,
  playLabel,
  pauseLabel,
  resumeLabel,
  title,
  onPlay,
  onProgress,
  autoplayMuted,
  unmuteLabel,
  className,
}: VslPlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const startedRef = useRef(false);
  const [view, setView] = useState<YtView>("poster");
  const [progress, setProgress] = useState(0);
  // Alguns celulares (iOS) bloqueiam o autoplay: aí o toque vai direto no player do YouTube.
  const [needsNativeTap, setNeedsNativeTap] = useState(false);
  // Tocando sem som antes do primeiro toque (prévia muda).
  const previewRef = useRef(false);
  const [preview, setPreview] = useState(false);

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
      if (!player || previewRef.current) return;
      const current = player.getCurrentTime();
      const duration = player.getDuration();
      if (duration > 0) setProgress(Math.min(current / duration, 1));
      onProgress?.(current, duration);
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
        if (!startedRef.current && !previewRef.current) {
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

  const createPlayer = useCallback(async (muted: boolean) => {
    if (!muted) setView("starting");
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
            if (muted) event.target.mute();
            event.target.playVideo();
            window.setTimeout(() => {
              if (event.target.getPlayerState() === YT_STATE.PLAYING) return;
              // Prévia muda barrada: volta para a capa; o clique dá o play com som.
              if (muted) setView("poster");
              // Play com som barrado (iOS): libera o toque direto no player do YouTube.
              else setNeedsNativeTap(true);
            }, muted ? 2500 : 1500);
          },
          onStateChange: (event) => handleState(event.data),
        },
      });
    } catch {
      if (!muted) setNeedsNativeTap(true);
    }
  }, [vsl.source, title, handleState]);

  // Prévia muda: o vídeo começa sozinho, sem som, e só conta como "assistido" quando a pessoa
  // toca para ativar o som (aí volta do início). Assim a retenção medida é de quem quis ver.
  useEffect(() => {
    if (!autoplayMuted) return;
    previewRef.current = true;
    setPreview(true);
    const timer = window.setTimeout(() => {
      if (!playerRef.current) createPlayer(true);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [autoplayMuted, createPlayer]);

  const start = useCallback(() => {
    const player = playerRef.current;
    if (!player) {
      previewRef.current = false;
      setPreview(false);
      createPlayer(false);
      return;
    }
    if (previewRef.current) {
      previewRef.current = false;
      setPreview(false);
      setProgress(0);
      player.unMute();
      player.seekTo(0, true);
    }
    player.playVideo();
    if (!startedRef.current && player.getPlayerState() === YT_STATE.PLAYING) {
      startedRef.current = true;
      onPlay?.();
    }
  }, [createPlayer, onPlay]);

  const togglePause = () => {
    const player = playerRef.current;
    if (!player) return;
    if (view === "playing") player.pauseVideo();
    else player.playVideo();
  };

  const coverVisible = view === "poster" || view === "paused" || view === "ended";

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-black", className)}>
      {/* O iframe do YouTube é montado aqui no primeiro play. */}
      <div ref={hostRef} className="absolute inset-0" />

      {/* Prévia muda: o vídeo roda sem som por trás; o toque ativa o som e volta do início. */}
      {preview && view === "playing" ? (
        <button
          type="button"
          onClick={start}
          aria-label={unmuteLabel ?? playLabel}
          className="group absolute inset-0 z-20 flex items-center justify-center bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ambar-400"
        >
          <span className="flex flex-col items-center gap-3">
            <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center faceta [--f:16px] bg-linho-050 text-grafite-950 transition-transform duration-200 group-hover:scale-105 md:h-24 md:w-24">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-8 w-8 fill-current md:h-10 md:w-10">
                <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z" />
              </svg>
            </span>
            <span className="faceta [--f:10px] bg-grafite-950/90 px-4 py-2 text-sm font-medium text-linho-050">
              {unmuteLabel ?? playLabel}
            </span>
          </span>
        </button>
      ) : null}

      {/* Camada transparente durante a reprodução: bloqueia o hover (título, logo) e pausa no clique. */}
      {view === "playing" && !preview ? (
        <button
          type="button"
          onClick={togglePause}
          aria-label={pauseLabel}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ambar-400"
        />
      ) : null}

      {/* Capa: antes do play, ao pausar e no fim (esconde a tela de pausa e as sugestões do YouTube). */}
      {coverVisible && !needsNativeTap ? (
        <button
          type="button"
          onClick={view === "poster" ? start : togglePause}
          aria-label={view === "poster" ? playLabel : resumeLabel}
          className="group absolute inset-0 z-20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ambar-400"
        >
          <Image src={posterSrc} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          <span className={cn("absolute inset-0", view === "poster" ? "bg-gradient-to-t from-black/45 via-black/10 to-transparent" : "bg-black/55")} />
          <span className="relative flex flex-col items-center gap-3">
            <PlayIcon />
            {view !== "poster" ? (
              <span className="meta bg-grafite-950/90 px-3 py-1.5 text-[10px] text-linho-050">
                {resumeLabel}
              </span>
            ) : null}
          </span>
        </button>
      ) : null}

      {/* Carregando o player (entre o clique e o início). */}
      {view === "starting" && !needsNativeTap ? (
        <div aria-hidden="true" className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-ambar-400/30 border-t-ambar-400" />
        </div>
      ) : null}

      {/* Barra de progresso (só leitura: não dá para avançar o vídeo). */}
      {view !== "poster" && !preview ? (
        <div
          role="progressbar"
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="absolute inset-x-0 bottom-0 z-30 h-1.5 bg-white/15"
        >
          <div className="h-full bg-ambar-400 transition-[width] duration-500 ease-linear" style={{ width: `${progress * 100}%` }} />
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
      onProgress(seconds, 0);
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
    <div className={cn("relative aspect-video w-full overflow-hidden bg-black", className)}>
      {!playing ? (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={playLabel}
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ambar-400"
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
          onTimeUpdate={(event) => onProgress?.(event.currentTarget.currentTime, event.currentTarget.duration || 0)}
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
