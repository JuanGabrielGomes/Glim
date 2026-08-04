import Image from 'next/image';
import glimMarkCream from '../../../public/brand/glim-mark-cream.png';
import { SocialLinkButton } from '@/components/ui/SocialLinkButton';
import { WhatsAppIcon, InstagramIcon } from '@/components/ui/icons';
import { CONTACT_WHATSAPP_HREF, INSTAGRAM_URL, NAV_ITEMS } from '@/lib/content';

export function Footer() {
  return (
    <footer className="bg-[#0b0908] px-4 pt-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 border-t border-white/10 pt-6 text-center text-sm text-white/55 sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <a href="#topo" aria-label="Voltar ao topo da página" className="inline-flex items-center">
            <Image src={glimMarkCream} alt="glim." className="h-4 w-auto" priority />
          </a>
          <p>© {new Date().getFullYear()} glim. Engenharia de Software e Design Digital.</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <nav className="flex flex-wrap items-center justify-center gap-3 text-xs sm:justify-end" aria-label="Rodapé">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            <SocialLinkButton href={CONTACT_WHATSAPP_HREF} label="WhatsApp" icon={<WhatsAppIcon />} external />
            <SocialLinkButton href={INSTAGRAM_URL} label="Instagram" icon={<InstagramIcon />} external />
          </div>
        </div>
      </div>
    </footer>
  );
}
