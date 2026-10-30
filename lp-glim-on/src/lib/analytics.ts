/*
 * Eventos do Meta Pixel. Os componentes usam estas funções e nunca chamam fbq direto.
 *
 * O evento de compra (Purchase) NÃO é disparado nesta página: ele vem da integração
 * de pixel da própria Kiwify, configurada no painel dela (o pagamento acontece lá).
 */
import { site } from "@/content/site";

type StandardEvent = "PageView" | "ViewContent";
type EventParams = Record<string, string | number>;

interface Fbq {
  (command: "init", pixelId: string): void;
  (command: "track", event: StandardEvent, params?: EventParams): void;
  (command: "trackCustom", event: string, params?: EventParams): void;
}

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

function track(event: StandardEvent, params?: EventParams): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}

export function trackPageView(): void {
  track("PageView");
}

/** Clique no play da VSL. */
export function trackViewContent(): void {
  track("ViewContent", { content_name: "VSL" });
}

/**
 * Clique em qualquer botão de compra. Vai como evento personalizado ("CliqueCheckout"),
 * não como InitiateCheckout: o InitiateCheckout padrão é disparado pela própria Kiwify
 * quando o checkout abre, no mesmo Pixel. Disparar aqui também contaria cada ida ao
 * checkout duas vezes e distorceria o custo por InitiateCheckout nos anúncios.
 */
export function trackCheckoutClick(): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", "CliqueCheckout", { value: site.checkoutValue, currency: "BRL" });
}
