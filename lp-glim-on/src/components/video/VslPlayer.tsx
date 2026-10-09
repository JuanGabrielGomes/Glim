"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { listenMessage, buildEmbedUrl, readProgressSeconds, type ResolvedVsl } from "@/lib/vsl";

interface VslPlayerProps {
  vsl: ResolvedVsl;
  posterSrc: string;
  playLabel: string;
  title: string;
  /** Disparado uma vez, no clique de play (ponto de ligação do evento ViewContent). */
  onPlay?: () => void;
  /** Segundos assistidos, quando o provedor informa (mp4, youtube, vimeo). */
  onProgress?: (seconds: number) => void;
}

const FRAME_CLASS = "absolute inset-0 h-full w-full";

export function VslPlayer({ vsl, posterSrc, playLabel, title, onPlay, onProgress }: VslPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [origin, setOrigin] = useState("");
  const frameRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setOrigin(window.location.origin);
    setPlaying(true);
    onPlay?.();
  };

  // Teclado: depois do play, o foco vai para o player.
  useEffect(() => {
    if (!playing) return;
    frameRef.current?.focus();
    videoRef.current?.focus();
  }, [playing]);

  // youtube/vimeo: pede ao player, via postMessage, os eventos de tempo assistido.
  useEffect(() => {
    const frame = frameRef.current;
    if (!playing || !onProgress || !frame) return;
    if (vsl.provider !== "youtube" && vsl.provider !== "vimeo") return;

    const provider = vsl.provider;
    const { message, targetOrigin } = listenMessage(provider);
    let received = false;

    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== frame.contentWindow) return;
      const seconds = readProgressSeconds(provider, event.data);
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
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-glim-light/15 bg-black">
      {!playing ? (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={playLabel}
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glim-gold"
        >
          <Image
            src={posterSrc}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-glim-gold text-glim-dark shadow-glow transition-transform duration-200 group-hover:scale-105 md:h-24 md:w-24">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="ml-1 h-8 w-8 fill-current md:h-10 md:w-10">
              <path d="M8 5v14l11-7Z" />
            </svg>
          </span>
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
          src={buildEmbedUrl(vsl, origin)}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className={FRAME_CLASS}
        />
      )}
    </div>
  );
}
