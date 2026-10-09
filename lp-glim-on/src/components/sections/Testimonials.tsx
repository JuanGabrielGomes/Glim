import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface TestimonialsProps {
  tone: Tone;
}

export function Testimonials({ tone }: TestimonialsProps) {
  const { title, caption, items } = landing.testimonials;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-5xl space-y-8">
        <Reveal>
          <SectionTitle title={title} />
        </Reveal>
        {items.length === 0 ? (
          <TodoNotice>{landing.todos.testimonials}</TodoNotice>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.image.src}>
                <Reveal>
                  <figure className={cn("overflow-hidden rounded-2xl border", styles.line, styles.card)}>
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                    <figcaption className={cn("px-4 py-3 font-mono text-xs", styles.muted)}>{caption}</figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
