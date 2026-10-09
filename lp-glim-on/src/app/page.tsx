import { Fragment } from "react";
import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Guarantee } from "@/components/sections/Guarantee";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { NotIncluded } from "@/components/sections/NotIncluded";
import { Offer } from "@/components/sections/Offer";
import { Portfolio } from "@/components/sections/Portfolio";
import { Problem } from "@/components/sections/Problem";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoSection } from "@/components/sections/VideoSection";
import type { Tone } from "@/components/ui/Section";
import { StickyCta } from "@/components/ui/StickyCta";
import { landing } from "@/content/landing";
import { SHOW_TODOS } from "@/lib/dev";

// Asterisco da nota de prazo não vai para título/descrição de busca e compartilhamento.
const metaTitle = landing.hero.kicker.replace(/\*/g, "");
const metaDescription = landing.hero.subtitle.replace(/\*/g, "");

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: metaTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    images: ["/og.png"],
  },
};

interface FlowSection {
  key: string;
  show: boolean;
  render: (tone: Tone) => React.ReactNode;
}

// Seções sem dado ficam escondidas em produção; o tom alterna só entre as visíveis.
const flow: FlowSection[] = [
  { key: "problem", show: true, render: (tone) => <Problem tone={tone} /> },
  { key: "how", show: true, render: (tone) => <HowItWorks tone={tone} /> },
  {
    key: "portfolio",
    show: landing.portfolio.items.length > 0 || SHOW_TODOS,
    render: (tone) => <Portfolio tone={tone} />,
  },
  { key: "about", show: true, render: (tone) => <About tone={tone} /> },
  {
    key: "testimonials",
    show: landing.testimonials.items.length > 0 || SHOW_TODOS,
    render: (tone) => <Testimonials tone={tone} />,
  },
  { key: "offer", show: true, render: (tone) => <Offer tone={tone} /> },
  { key: "guarantee", show: true, render: (tone) => <Guarantee tone={tone} /> },
  { key: "not-included", show: true, render: (tone) => <NotIncluded tone={tone} /> },
  { key: "faq", show: true, render: (tone) => <Faq tone={tone} /> },
  { key: "final", show: true, render: (tone) => <FinalCta tone={tone} /> },
];

export default function HomePage() {
  const visible = flow.filter((section) => section.show);

  return (
    <main>
      <Hero />
      <VideoSection />
      {visible.map((section, index) => (
        <Fragment key={section.key}>{section.render(index % 2 === 0 ? "light" : "dark")}</Fragment>
      ))}
      <Footer withStickyCta />
      <StickyCta label={landing.cta.label} afterId="video" hideIds={["oferta", "fechamento"]} />
    </main>
  );
}
