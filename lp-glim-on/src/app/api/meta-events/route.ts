/*
 * API de Conversões da Meta (servidor). Recebe do navegador a cópia de cada evento do
 * pixel (mesmo event_id, para a Meta não contar em dobro) e reenvia direto do servidor,
 * com IP e navegador do visitante. Isso recupera os eventos que o iOS, o navegador do
 * Instagram e os bloqueadores cortam no pixel do navegador.
 *
 * Sem META_CAPI_TOKEN configurado na Vercel, a rota só responde 204 e não envia nada.
 */
import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const TOKEN = process.env.META_CAPI_TOKEN?.trim() ?? "";
// Código de teste do Gerenciador de Eventos (aba "Eventos de teste"). Deixe vazio em produção.
const TEST_CODE = process.env.META_CAPI_TEST_CODE?.trim() ?? "";
const GRAPH_VERSION = "v21.0";

// Só eventos que a página realmente dispara (evita que alguém use a rota para injetar outros).
const ALLOWED = /^(PageView|ViewContent|CliqueCheckout|VSL_[A-Za-z0-9]+|Rolagem_\d+|Tempo_\d+s)$/;

interface RelayBody {
  event_name?: unknown;
  event_id?: unknown;
  event_source_url?: unknown;
  fbp?: unknown;
  fbc?: unknown;
  external_id?: unknown;
  custom_data?: unknown;
}

const str = (value: unknown, max = 500): string | undefined =>
  typeof value === "string" && value.length > 0 ? value.slice(0, max) : undefined;

const sha256 = (value: string): string => createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

function cleanCustomData(raw: unknown): Record<string, string | number> {
  if (typeof raw !== "object" || raw === null) return {};
  const out: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(raw).slice(0, 20)) {
    if (!/^[a-z_]{1,40}$/.test(key)) continue;
    if (typeof value === "number" && Number.isFinite(value)) out[key] = value;
    else if (typeof value === "string") out[key] = value.slice(0, 200);
  }
  return out;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!PIXEL_ID || !TOKEN) return new NextResponse(null, { status: 204 });

  let body: RelayBody;
  try {
    body = (await request.json()) as RelayBody;
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const eventName = str(body.event_name, 60);
  const eventId = str(body.event_id, 100);
  const sourceUrl = str(body.event_source_url, 1000);
  if (!eventName || !ALLOWED.test(eventName) || !eventId || !sourceUrl) {
    return new NextResponse(null, { status: 400 });
  }

  // Só aceita eventos vindos das páginas deste site.
  const host = request.headers.get("host") ?? "";
  try {
    if (new URL(sourceUrl).host !== host) return new NextResponse(null, { status: 400 });
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const externalId = str(body.external_id, 100);

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: sourceUrl,
    action_source: "website",
    user_data: {
      client_ip_address: ip,
      client_user_agent: userAgent,
      fbp: str(body.fbp, 200),
      fbc: str(body.fbc, 300),
      external_id: externalId ? [sha256(externalId)] : undefined,
    },
    custom_data: cleanCustomData(body.custom_data),
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [event], ...(TEST_CODE ? { test_event_code: TEST_CODE } : {}) }),
      },
    );
    if (!response.ok) console.error("meta-capi", response.status, (await response.text()).slice(0, 300));
  } catch (error) {
    console.error("meta-capi", error instanceof Error ? error.message : "erro");
  }

  return new NextResponse(null, { status: 204 });
}
