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
  const { title, text, photo } = landing.about;

  return (
    <Section tone={tone}>
      <Reveal className={cn("mx-auto grid max-w-4xl gap-8 md:items-center", photo && "md:grid-cols-[240px_1fr] md:gap-12")}>
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 768px) 240px, 60vw"
            className="h-auto w-48 rounded-2xl md:w-full"
          />
        ) : null}
        <div className="space-y-5">
          <SectionTitle title={title} />
          <p className="text-base leading-relaxed md:text-lg">{text}</p>
          {photo ? null : <TodoNotice>{landing.todos.aboutPhoto}</TodoNotice>}
        </div>
      </Reveal>
    </Section>
  );
}
