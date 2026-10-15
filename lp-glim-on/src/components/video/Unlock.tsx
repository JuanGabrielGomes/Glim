"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/*
 * Bloqueio da página pela VSL: o conteúdo abaixo do vídeo só aparece depois de
 * `site.unlockSeconds` assistidos. Quem já liberou não precisa assistir de novo
 * (fica guardado neste navegador).
 */

const STORAGE_KEY = "glim_on_liberado";

interface UnlockContextValue {
  unlocked: boolean;
  unlock: () => void;
}

const UnlockContext = createContext<UnlockContextValue>({ unlocked: true, unlock: () => {} });

interface UnlockProviderProps {
  /** true quando não há como medir o tempo assistido (sem VSL, ou provedor sem progresso). */
  initiallyUnlocked: boolean;
  children: React.ReactNode;
}

export function UnlockProvider({ initiallyUnlocked, children }: UnlockProviderProps) {
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);

  useEffect(() => {
    if (initiallyUnlocked) return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      // Armazenamento indisponível: segue bloqueado até o tempo do vídeo.
    }
  }, [initiallyUnlocked]);

  const unlock = useCallback(() => {
    setUnlocked(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Sem armazenamento: libera só nesta visita.
    }
  }, []);

  const value = useMemo(() => ({ unlocked, unlock }), [unlocked, unlock]);
  return <UnlockContext.Provider value={value}>{children}</UnlockContext.Provider>;
}

export function useUnlock(): UnlockContextValue {
  return useContext(UnlockContext);
}

interface LockedProps {
  children: React.ReactNode;
  /** O que aparece enquanto está bloqueado (opcional). */
  fallback?: React.ReactNode;
}

/** Esconde o conteúdo até a liberação. Ele continua no HTML (busca e leitores de tela no desbloqueio). */
export function Locked({ children, fallback = null }: LockedProps) {
  const { unlocked } = useUnlock();
  return (
    <>
      {unlocked ? null : fallback}
      <div hidden={!unlocked}>{children}</div>
    </>
  );
}
