/*
 * Eventos do Meta Pixel. Os componentes usam estas funções e nunca chamam fbq direto.
 *
 * Cada evento sai duas vezes com o mesmo event_id: pelo navegador (fbq) e pelo servidor
 * (rota /api/meta-events → API de Conversões). A Meta junta os dois pelo event_id, então
 * não conta em dobro, e o servidor recupera o que bloqueadores e o iOS cortam no navegador.
 *
 * O evento de compra (Purchase) NÃO é disparado nesta página: ele vem da integração
 * de pixel da própria Kiwify, configurada no painel dela (o pagamento acontece lá).
 */
import { site } from "@/content/site";
import { captureAttribution } from "@/lib/attribution";

type StandardEvent = "PageView" | "ViewContent";
type EventParams = Record<string, string | number>;

interface Fbq {
  (command: "init", pixelId: string): void;
  (command: "track", event: StandardEvent, params?: EventParams, options?: { eventID: string }): void;
  (command: "trackCustom", event: string, params?: EventParams, options?: { eventID: string }): void;
}

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

const RELAY_URL = "/api/meta-events";

export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Identificador anônimo deste navegador (sem dado pessoal), para a Meta ligar os eventos. */
function visitorId(): string {
  const key = "glim_vid";
  try {
    const stored = window.localStorage.getItem(key);
    if (stored) return stored;
    const created = newEventId();
    window.localStorage.setItem(key, created);
    return created;
  } catch {
    return "";
  }
}

/** fbc a partir do fbclid, quando o cookie _fbc ainda não existe (primeira página). */
function clickId(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = captureAttribution().fbclid;
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/** Envia a cópia do evento para o servidor. sendBeacon sobrevive ao fechamento da aba. */
function relay(eventName: string, eventId: string, params?: EventParams): void {
  const body = JSON.stringify({
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    fbp: readCookie("_fbp"),
    fbc: clickId(),
    external_id: visitorId(),
    custom_data: { ...params, ...captureAttribution() },
  });
  try {
    if (navigator.sendBeacon?.(RELAY_URL, new Blob([body], { type: "application/json" }))) return;
  } catch {
    // Sem sendBeacon: segue pelo fetch.
  }
  fetch(RELAY_URL, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
}

function send(kind: "track" | "trackCustom", event: string, params?: EventParams, eventId = newEventId()): void {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    if (kind === "track") window.fbq("track", event as StandardEvent, params, { eventID: eventId });
    else window.fbq("trackCustom", event, params, { eventID: eventId });
  }
  relay(event, eventId, params);
}

/** PageView das navegações internas (o da primeira carga sai no script do pixel). */
export function trackPageView(): void {
  send("track", "PageView");
}

/** Só a cópia do servidor do PageView da primeira carga (o navegador já disparou com este id). */
export function relayInitialPageView(eventId: string): void {
  if (typeof window === "undefined") return;
  relay("PageView", eventId);
}

/** Clique no play da VSL. */
export function trackViewContent(): void {
  send("track", "ViewContent", { content_name: "VSL" });
}

/**
 * Clique em qualquer botão de compra. Vai como evento personalizado ("CliqueCheckout"),
 * não como InitiateCheckout: o InitiateCheckout padrão é disparado pela própria Kiwify
 * quando o checkout abre, no mesmo Pixel. Disparar aqui também contaria cada ida ao
 * checkout duas vezes e distorceria o custo por InitiateCheckout nos anúncios.
 */
export function trackCheckoutClick(): void {
  send("trackCustom", "CliqueCheckout", { value: site.checkoutValue, currency: "BRL" });
}

/**
 * Retenção da VSL. Cada marco vira um evento com nome próprio (VSL_10s, VSL_25, VSL_1min…),
 * para aparecer contado no Gerenciador de Eventos e virar coluna e público.
 */
export function trackVslMilestone(name: string, seconds: number, duration: number): void {
  send("trackCustom", name, { segundos: Math.round(seconds), duracao: Math.round(duration) });
}

/** Rolagem e tempo na página (Rolagem_50, Tempo_60s…). */
export function trackEngagement(name: string): void {
  send("trackCustom", name);
}
