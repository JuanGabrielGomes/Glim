"use client";

import { useCallback, useEffect, useState } from "react";
import { VslPlayer } from "@/components/video/VslPlayer";
import { trackViewContent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { supportsProgress, type ResolvedVsl } from "@/lib/vsl";

interface VslStageProps {
  vsl: ResolvedVsl;
  posterSrc: string;
  playLabel: string;
  title: string;
  /** Segundos assistidos para liberar `children` (o botão sob o vídeo). 0 = sempre visível. */
  revealSeconds: number;
  children: React.ReactNode;
}

// Sem nenhuma leitura de tempo depois do play, o botão aparece mesmo assim.
const NO_PROGRESS_FALLBACK_MS = 10000;

export function VslStage({ vsl, posterSrc, playLabel, title, revealSeconds, children }: VslStageProps) {
  const [started, setStarted] = useState(false);
  const [reported, setReported] = useState(false);
  const [watched, setWatched] = useState(0);
  const [fallback, setFallback] = useState(false);

  const gated = revealSeconds > 0 && supportsProgress(vsl.provider);
  const showCta = !gated || fallback || watched >= revealSeconds;

  const handlePlay = useCallback(() => {
    setStarted(true);
    trackViewContent();
  }, []);
  const handleProgress = useCallback((seconds: number) => {
    setReported(true);
    setWatched((prev) => Math.max(prev, seconds));
  }, []);

  useEffect(() => {
    if (!gated || !started || reported) return;
    const timer = window.setTimeout(() => setFallback(true), NO_PROGRESS_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [gated, started, reported]);

  return (
    <>
      <VslPlayer
        vsl={vsl}
        posterSrc={posterSrc}
        playLabel={playLabel}
        title={title}
        onPlay={handlePlay}
        onProgress={gated ? handleProgress : undefined}
      />
      {/* invisible mantém o espaço: o botão não empurra o layout quando aparece. */}
      <div
        aria-hidden={!showCta}
        className={cn("transition-opacity duration-300", !showCta && "invisible opacity-0")}
      >
        {children}
      </div>
    </>
  );
}
