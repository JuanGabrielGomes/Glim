export type VslProvider = "youtube" | "vimeo" | "panda" | "mp4";

export interface ResolvedVsl {
  provider: VslProvider;
  /** youtube: id do vídeo · vimeo: id numérico · panda/mp4: URL completa. */
  source: string;
  /** Só vimeo, para vídeos não listados (parâmetro h). */
  hash?: string;
}

const PROVIDERS: readonly VslProvider[] = ["youtube", "vimeo", "panda", "mp4"];

export function parseProvider(raw: string | undefined): VslProvider | null {
  const value = raw?.trim().toLowerCase();
  return PROVIDERS.find((provider) => provider === value) ?? null;
}

function youtubeId(input: string): string | null {
  if (/^[\w-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0] || null;
    const v = url.searchParams.get("v");
    if (v) return v;
    return url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/)?.[1] ?? null;
  } catch {
    return null;
  }
}

function vimeoRef(input: string): { id: string; hash?: string } | null {
  if (/^\d+$/.test(input)) return { id: input };
  const match = input.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-z0-9]+))?/i);
  if (!match) return null;
  let hash = match[2];
  try {
    hash = hash ?? new URL(input).searchParams.get("h") ?? undefined;
  } catch {
    // URL sem protocolo: segue sem hash.
  }
  return { id: match[1], hash };
}

export function resolveVsl(provider: VslProvider | null, url: string | undefined): ResolvedVsl | null {
  const input = url?.trim();
  if (!provider || !input) return null;

  switch (provider) {
    case "youtube": {
      const id = youtubeId(input);
      return id ? { provider, source: id } : null;
    }
    case "vimeo": {
      const ref = vimeoRef(input);
      return ref ? { provider, source: ref.id, hash: ref.hash } : null;
    }
    case "panda":
    case "mp4":
      return /^(https?:\/\/|\/)/.test(input) ? { provider, source: input } : null;
  }
}

/** O provedor informa o tempo assistido? (panda não informa.) */
export function supportsProgress(provider: VslProvider): boolean {
  return provider !== "panda";
}

/** URL do iframe (youtube, vimeo, panda). `origin` é o do site, exigido pela API do YouTube. */
export function buildEmbedUrl(vsl: ResolvedVsl, origin: string): string {
  switch (vsl.provider) {
    case "youtube": {
      // rel=0 limita as sugestões do fim a vídeos do mesmo canal (o YouTube não permite zerar).
      const params = new URLSearchParams({
        autoplay: "1",
        rel: "0",
        modestbranding: "1",
        playsinline: "1",
        iv_load_policy: "3",
        enablejsapi: "1",
        origin,
      });
      return `https://www.youtube-nocookie.com/embed/${vsl.source}?${params.toString()}`;
    }
    case "vimeo": {
      const params = new URLSearchParams({
        autoplay: "1",
        title: "0",
        byline: "0",
        portrait: "0",
        dnt: "1",
        playsinline: "1",
      });
      if (vsl.hash) params.set("h", vsl.hash);
      return `https://player.vimeo.com/video/${vsl.source}?${params.toString()}`;
    }
    default: {
      // Confirme no painel do Panda se o parâmetro autoplay é aceito pelo seu player.
      const url = new URL(vsl.source);
      url.searchParams.set("autoplay", "true");
      return url.toString();
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toPayload(data: unknown): unknown {
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/** Mensagem que "assina" os eventos de tempo do player dentro do iframe. */
export function listenMessage(provider: "youtube" | "vimeo"): { message: string; targetOrigin: string } {
  return provider === "youtube"
    ? {
        message: JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
        targetOrigin: "https://www.youtube-nocookie.com",
      }
    : {
        message: JSON.stringify({ method: "addEventListener", value: "timeupdate" }),
        targetOrigin: "https://player.vimeo.com",
      };
}

/** Lê os segundos assistidos de uma mensagem do player; null se a mensagem não trouxer o tempo. */
export function readProgressSeconds(provider: "youtube" | "vimeo", data: unknown): number | null {
  const payload = toPayload(data);
  if (!isRecord(payload)) return null;

  if (provider === "youtube") {
    const info = payload.info;
    const isDelivery = payload.event === "infoDelivery" || payload.event === "initialDelivery";
    return isDelivery && isRecord(info) && typeof info.currentTime === "number" ? info.currentTime : null;
  }

  const body = payload.data;
  return payload.event === "timeupdate" && isRecord(body) && typeof body.seconds === "number"
    ? body.seconds
    : null;
}
