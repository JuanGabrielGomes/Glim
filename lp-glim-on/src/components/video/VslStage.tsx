"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useUnlock } from "@/components/video/Unlock";
import { VslPlayer } from "@/components/video/VslPlayer";
import { trackViewContent, trackVslMilestone } from "@/lib/analytics";
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
  /** Começa a tocar sem som até a pessoa tocar para ouvir (só YouTube). */
  autoplayMuted?: boolean;
  unmuteLabel?: string;
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
  autoplayMuted,
  unmuteLabel,
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

  // Marcos de retenção já enviados nesta visita (cada um sai uma vez só).
  const milestonesRef = useRef(new Set<string>());

  const handleProgress = useCallback(
    (seconds: number, duration: number) => {
      reportedRef.current = true;
      if (!unlocked && unlockSeconds > 0 && seconds >= unlockSeconds) unlock();

      const sent = milestonesRef.current;
      const fire = (name: string) => {
        if (sent.has(name)) return;
        sent.add(name);
        trackVslMilestone(name, seconds, duration);
      };

      if (seconds >= 3) fire("VSL_3s");
      if (seconds >= 10) fire("VSL_10s");
      if (seconds >= 30) fire("VSL_30s");
      // Um evento por minuto assistido: mostra em que minuto as pessoas saem.
      for (let minute = 1; minute <= Math.floor(seconds / 60) && minute <= 20; minute += 1) {
        fire(`VSL_${minute}min`);
      }
      // Momento em que a oferta aparece na página (fim do bloqueio).
      if (unlockSeconds > 0 && seconds >= unlockSeconds) fire("VSL_Oferta");
      if (duration > 0) {
        const percent = (seconds / duration) * 100;
        [25, 50, 75, 95].forEach((mark) => {
          if (percent >= mark) fire(`VSL_${mark}`);
        });
      }
    },
    [unlock, unlocked, unlockSeconds],
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
        onProgress={handleProgress}
        autoplayMuted={autoplayMuted}
        unmuteLabel={unmuteLabel}
        className={frameClassName}
      />
    </div>
  );
}
