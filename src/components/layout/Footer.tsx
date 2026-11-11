import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_WHATSAPP_HREF, INSTAGRAM_URL } from '@/lib/content';
import { SERVICE_PAGES } from '@/lib/services';

const LINK = 'text-pedra-300 block py-2 transition-colors hover:text-linho-050';
const HEADING = 'text-linho-050 mb-1 block';

/** Rodapé grafite: logo gigante, quatro colunas em mono e uma linha de meta. */
export function Footer() {
  const instagramHandle = INSTAGRAM_URL.replace(
    /^https?:\/\/(www\.)?instagram\.com\//,
    '@'
  ).replace(/\/$/, '');

  return (
    <footer className="bg-grafite-950 text-linho-050 px-[var(--m)] pt-20 pb-9">
      <Link href="/" aria-label="glim., página inicial" className="block">
        <Image
          src="/brand/glim-logo-linho.svg"
          alt="glim."
          width={1874}
          height={995}
          sizes="(max-width: 820px) 78vw, 980px"
          className="mb-16 h-auto w-[min(78vw,980px)]"
        />
      </Link>

      <div className="meta border-grafite-800 grid grid-cols-2 gap-8 border-t py-8 md:grid-cols-4">
        <nav aria-label="Estúdio">
          <span className={HEADING}>Estúdio</span>
          <Link href="/#trabalhos" className={LINK}>
            Trabalhos
          </Link>
          <Link href="/#processo" className={LINK}>
            Processo
          </Link>
          <Link href="/#estudio" className={LINK}>
            Quem constrói
          </Link>
        </nav>

        <nav aria-label="Serviços">
          <span className={HEADING}>Serviços</span>
          {SERVICE_PAGES.map((service) => (
            <Link key={service.slug} href={`/servicos/${service.slug}`} className={LINK}>
              {service.name}
            </Link>
          ))}
        </nav>

        <div>
          <span className={HEADING}>Contato</span>
          <a href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noreferrer" className={LINK}>
            WhatsApp
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={LINK}>
            Instagram {instagramHandle}
          </a>
          <Link href="/#raio-x" className={LINK}>
            Raio-x gratuito
          </Link>
        </div>

        <div>
          <span className={HEADING}>Onde</span>
          <span className="text-pedra-300 mt-2.5 block">Carlos Barbosa · RS</span>
          <span className="text-pedra-300 mt-2.5 block">Atendimento em todo o Brasil</span>
        </div>
      </div>

      <div className="meta text-pedra-300 mt-6 flex flex-col gap-2.5 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} glim. · engenharia e design digital</span>
        <span className="flex gap-6">
          <Link href="/privacidade" className="hover:text-linho-050 transition-colors">
            Política de privacidade
          </Link>
          <span>glimweb.com</span>
        </span>
      </div>
    </footer>
  );
}
