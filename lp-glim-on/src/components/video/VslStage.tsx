"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useUnlock } from "@/components/video/Unlock";
import { VslPlayer } from "@/components/video/VslPlayer";
import { trackViewContent } from "@/lib/analytics";
import type { ResolvedVsl } from "@/lib/vsl";

interface VslStageProps {
  vsl: ResolvedVsl;
  posterSrc: string;
  playLabel: string;
  pauseLabel: string;
  resumeLabel: string;
  title: string;
  /** Segundos assistidos para liberar o resto da página (site.unlockSeconds). */
  unlockSeconds: number;
  /** Moldura em volta do player (borda, sombra). */
  wrapperClassName?: string;
  /** Classes extras do quadro 16:9 (ex.: arredondamento). */
  frameClassName?: string;
}

// Se o player não informar nenhum tempo depois do play, libera mesmo assim (não trava a venda).
const NO_PROGRESS_FALLBACK_MS = 10000;

export function VslStage({
  vsl,
  posterSrc,
  playLabel,
  pauseLabel,
  resumeLabel,
  title,
  unlockSeconds,
  wrapperClassName,
  frameClassName,
}: VslStageProps) {
  const { unlocked, unlock } = useUnlock();
  const [started, setStarted] = useState(false);
  const reportedRef = useRef(false);

  const handlePlay = useCallback(() => {
    setStarted(true);
    trackViewContent();
  }, []);

  const handleProgress = useCallback(
    (seconds: number) => {
      reportedRef.current = true;
      if (seconds >= unlockSeconds) unlock();
    },
    [unlock, unlockSeconds],
  );

  useEffect(() => {
    if (unlocked || !started) return;
    const timer = window.setTimeout(() => {
      if (!reportedRef.current) unlock();
    }, NO_PROGRESS_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [unlocked, started, unlock]);

  return (
    <div className={wrapperClassName}>
      <VslPlayer
        vsl={vsl}
        posterSrc={posterSrc}
        playLabel={playLabel}
        pauseLabel={pauseLabel}
        resumeLabel={resumeLabel}
        title={title}
        onPlay={handlePlay}
        onProgress={unlocked ? undefined : handleProgress}
        className={frameClassName}
      />
    </div>
  );
}
