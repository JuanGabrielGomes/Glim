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
          <div className="gold-ring mx-auto w-full max-w-[22rem] rounded-[2rem] p-1.5 shadow-glow-lg md:max-w-none">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 380px, 88vw"
              className="h-auto w-full rounded-[1.65rem]"
            />
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
