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
   * Segundos de VSL assistidos para liberar o resto da página e a oferta (3:36 = 216).
   * 0 = página sempre aberta. Com panda (que não informa o tempo) a página fica sempre aberta.
   */
  unlockSeconds: number;
}

export const site: SiteConfig = {
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || "#",
  checkoutValue: 939,
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  whatsappDisplay: "(54) 99218-1886",
  company: {
    document: "65.587.567/0001-51",
    email: "glim.contato@gmail.com",
  },
  spotsAvailable: null,
  vslProvider: parseProvider(process.env.NEXT_PUBLIC_VSL_PROVIDER),
  vslUrl: process.env.NEXT_PUBLIC_VSL_URL || "",
  unlockSeconds: 216,
};
