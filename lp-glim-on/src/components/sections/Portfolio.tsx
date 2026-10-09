import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface PortfolioProps {
  tone: Tone;
}

export function Portfolio({ tone }: PortfolioProps) {
  const { title, items } = landing.portfolio;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-5xl space-y-8">
        <Reveal>
          <SectionTitle title={title} />
        </Reveal>
        {items.length === 0 ? (
          <TodoNotice>{landing.todos.portfolio}</TodoNotice>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.name}>
                <Reveal className={cn("overflow-hidden rounded-2xl border", styles.line, styles.card)}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                  <div className="space-y-1 p-5">
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                    <p className={cn("text-sm", styles.muted)}>{item.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
