/*
 * Carregador da API de iframe do YouTube, com os tipos mínimos que a VSL usa.
 * Com controls=0 o YouTube esconde a barra nativa; os controles da página ficam por cima.
 */

export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}

interface YTPlayerOptions {
  host?: string;
  videoId: string;
  width?: string;
  height?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number; target: YTPlayer }) => void;
    onError?: (event: { data: number }) => void;
  };
}

interface YTNamespace {
  Player: new (element: HTMLElement, options: YTPlayerOptions) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

/** Carrega https://www.youtube.com/iframe_api uma única vez. */
export function loadYouTubeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("sem window"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("API do YouTube indisponível"));
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("falha ao carregar a API do YouTube"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

/** Parâmetros que tiram o máximo de interface do YouTube que a plataforma permite. */
export function youtubePlayerVars(origin: string): Record<string, string | number> {
  return {
    autoplay: 1,
    controls: 0, // sem barra, engrenagem e botões nativos
    disablekb: 1, // sem atalhos de teclado (não dá para pular o vídeo)
    fs: 0,
    iv_load_policy: 3, // sem anotações
    modestbranding: 1,
    playsinline: 1,
    rel: 0, // sugestões do fim só do mesmo canal (o YouTube não permite zerar)
    origin,
  };
}
