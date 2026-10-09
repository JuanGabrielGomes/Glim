import { parseProvider, type VslProvider } from "@/lib/vsl";

export const PRODUCT_NAME = "glim. On";
export const AGENCY_NAME = "glim.";

interface CompanyInfo {
  /** CNPJ ou CPF da glim. null = TODO. */
  document: string | null;
  /** E-mail de contato e para pedidos de privacidade (LGPD). null = TODO. */
  email: string | null;
}

interface SiteConfig {
  /** Checkout externo (Kiwify). Vazio = botões apontam para "#" até configurar. */
  checkoutUrl: string;
  /** Valor do produto enviado no evento InitiateCheckout do pixel (em reais). */
  checkoutValue: number;
  /** Página de agendamento da Reunião 1 no Google Agenda (usada em /obrigado). */
  bookingUrl: string;
  /** Link do WhatsApp da glim. */
  whatsappUrl: string;
  /** Número do WhatsApp como deve aparecer escrito (ex.: "(11) 99999-9999"). null = TODO. */
  whatsappDisplay: string | null;
  company: CompanyInfo;
  /** Número real de vagas. null = a linha de vagas não aparece. */
  spotsAvailable: number | null;
  /** Provedor da VSL (NEXT_PUBLIC_VSL_PROVIDER). null = player não configurado. */
  vslProvider: VslProvider | null;
  /** URL ou ID do vídeo (NEXT_PUBLIC_VSL_URL). */
  vslUrl: string;
  /**
   * Segundos assistidos para o botão logo abaixo do vídeo aparecer. 0 = sempre visível.
   * Para ligar, troque por um valor (ex.: 480 = 8 min). Funciona com mp4, youtube e vimeo;
   * com panda (que não informa o tempo) o botão aparece normalmente. Os outros botões
   * da página ficam sempre visíveis.
   */
  ctaRevealSeconds: number;
}

export const site: SiteConfig = {
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || "#",
  checkoutValue: 997,
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  whatsappDisplay: null,
  company: {
    document: null,
    email: null,
  },
  spotsAvailable: null,
  vslProvider: parseProvider(process.env.NEXT_PUBLIC_VSL_PROVIDER),
  vslUrl: process.env.NEXT_PUBLIC_VSL_URL || "",
  ctaRevealSeconds: 0,
};
