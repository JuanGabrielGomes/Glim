/*
 * Origem da visita (utm_* e fbclid): guardada na sessão e repassada ao link do checkout,
 * para a origem da venda aparecer no painel da Kiwify.
 */
type Attribution = Record<string, string>;

const STORAGE_KEY = "glim_attribution";

function isTrackingParam(key: string): boolean {
  return key === "fbclid" || /^utm_[a-z_]+$/.test(key);
}

function readStored(): Attribution {
  try {
    const parsed: unknown = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "{}");
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] => isTrackingParam(entry[0]) && typeof entry[1] === "string",
      ),
    );
  } catch {
    return {};
  }
}

/** Lê utm_* / fbclid da URL atual (se houver, substituem os guardados) e devolve o que vale. */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const fromUrl: Attribution = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (value && isTrackingParam(key)) fromUrl[key] = value;
  });

  if (Object.keys(fromUrl).length === 0) return readStored();

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    // Sessão indisponível (ex.: modo privado restrito): usa só a URL atual.
  }
  return fromUrl;
}

/** Acrescenta a origem da visita a uma URL externa (o link do checkout). */
export function withAttribution(url: string): string {
  if (!/^https?:\/\//.test(url)) return url;
  const params = captureAttribution();
  if (Object.keys(params).length === 0) return url;

  const target = new URL(url);
  Object.entries(params).forEach(([key, value]) => target.searchParams.set(key, value));
  return target.toString();
}
