import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface AboutProps {
  tone: Tone;
}

export function About({ tone }: AboutProps) {
  const { eyebrow, title, text, photo } = landing.about;

  return (
    <Section tone={tone} glow="left">
      <Reveal className={cn("grid gap-10 md:items-center", photo && "md:grid-cols-[minmax(0,380px)_1fr] md:gap-14")}>
        {photo ? (
          // Foto recortada (fundo transparente) sobre um cartão escuro com brilho dourado.
          <div className="gold-ring relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-[2rem] bg-glim-cinema md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(242,183,123,0.42),rgba(242,183,123,0.08)_45%,transparent_70%)]"
            />
            <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 380px, 88vw"
              className="relative mt-6 h-auto w-full"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-glim-cinema to-transparent" />
          </div>
        ) : null}
        <div className="max-w-3xl space-y-6">
          <SectionTitle eyebrow={eyebrow} title={title} tone={tone} />
          <p className="font-display text-[1.3rem] leading-[1.4] tracking-[-0.02em] md:text-[1.75rem]">{text}</p>
          {photo ? null : <TodoNotice>{landing.todos.aboutPhoto}</TodoNotice>}
        </div>
      </Reveal>
    </Section>
  );
}
