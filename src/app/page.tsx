'use client';

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactElement,
  type RefObject,
  type TextareaHTMLAttributes,
} from 'react';
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { submitContactForm, type ContactFormState } from './actions';

type NavItem = { href: '#abordagem' | '#servicos' | '#contato'; label: string };
type Pillar = { title: string; description: string };
type Capability = { title: string; description: string; stack: readonly string[] };
type HeaderProps = { panelOpacity: MotionValue<number>; translateY: MotionValue<number> };
type HeroProps = {
  heroRef: RefObject<HTMLElement | null>;
  glowBackground: MotionValue<string>;
  copyY: MotionValue<number>;
  haloY: MotionValue<number>;
  reduceMotion: boolean;
};

const CONTACT_WHATSAPP_NUMBER = '5554992181886';
const CONTACT_WHATSAPP_LABEL = '+55 54 99218-1886';
const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent('Ola, vim pelo site da glim. Quero iniciar um projeto.')}`;
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/glim.dev';
const HERO_TITLE = 'Do conceito ao código, o insight é claro.';
const VIEWPORT = { once: true, amount: 0.2 } as const;
const SPRING = { type: 'spring', stiffness: 150, damping: 24, mass: 0.8 } as const;
const INITIAL_FORM_STATE: ContactFormState = { status: 'idle', message: '' };

const NAV_ITEMS: readonly NavItem[] = [
  { href: '#abordagem', label: 'Abordagem' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#contato', label: 'Contato' },
];

const PILLARS: readonly Pillar[] = [
  {
    title: 'Agilidade Lúcida',
    description:
      'Ação purposeful baseada em insights claros. Transformamos complexidade em MVPs funcionais de forma transparente.',
  },
  {
    title: 'Precisão Geométrica',
    description:
      'Fundação técnica sólida e exata com uma interface humana e fluida. Beleza na matemática e no pixel-perfection.',
  },
  {
    title: 'Experiência Fluida',
    description:
      'Software sutil, intuitivo e leve. Usamos minimalismo e translucidez para oferecer clareza sem esforço.',
  },
];

const CAPABILITIES: readonly Capability[] = [
  {
    title: 'Design de Produto Digital',
    description:
      'Sistemas visuais e jornadas com clareza estratégica, hierarquia precisa e interação refinada para produtos que precisam converter e escalar.',
    stack: ['Discovery', 'UX Strategy', 'UI Systems', 'Framer Motion'],
  },
  {
    title: 'Engenharia de Software (Full-Stack)',
    description:
      'Arquitetura moderna para plataformas robustas, da interface ao backend, com foco em performance, legibilidade e evolução contínua.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'APIs & Edge'],
  },
  {
    title: 'Otimização e Resgate de Plataformas',
    description:
      'Refatoramos produtos desalinhados, reduzimos fricção operacional e recuperamos confiança técnica em bases críticas já em produção.',
    stack: ['Auditoria', 'Performance', 'Refactor', 'DX & Observability'],
  },
  {
    title: 'Consultoria em Agilidade',
    description:
      'Modelamos cadência, escopo e tomada de decisão para transformar visão em entregas enxutas, consistentes e mensuráveis.',
    stack: ['Roadmapping', 'MVP Scope', 'Ops Rituals', 'Product Delivery'],
  },
];

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: SPRING },
};

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const WORD_PARENT: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.14 } },
};

const WORD_CHILD: Variants = {
  hidden: { opacity: 0, y: '0.85em', filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 180, damping: 22, mass: 0.7 },
  },
};

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const pointerX = useMotionValue(0.42);
  const pointerY = useMotionValue(0.18);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    if (reduceMotion) return;
    const handlePointerMove = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [pointerX, pointerY, reduceMotion]);

  const headerOpacity = useTransform(scrollY, [0, 36, 128], [0.68, 0.76, 0.97]);
  const headerTranslateY = useTransform(scrollY, [0, 140], [12, 0]);
  const glowX = useTransform(pointerX, [0, 1], [16, 84]);
  const glowY = useTransform(pointerY, [0, 1], [12, 80]);
  const secondaryGlowY = useTransform(scrollYProgress, [0, 1], [18, 74]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]);
  const haloY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const glowBackground = useMotionTemplate`
    radial-gradient(circle at ${glowX}% ${glowY}%, rgba(242, 183, 123, 0.42), transparent 30%),
    radial-gradient(circle at 78% ${secondaryGlowY}%, rgba(74, 70, 67, 0.14), transparent 32%),
    linear-gradient(135deg, rgba(249, 248, 246, 0.94), rgba(249, 248, 246, 0.08) 58%, transparent 100%)
  `;

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={SPRING}>
        <div className="relative min-h-screen overflow-x-clip bg-[linear-gradient(180deg,rgba(249,248,246,0.98)_0%,rgba(249,248,246,0.92)_100%)] dark:bg-[linear-gradient(180deg,rgba(74,70,67,1)_0%,rgba(58,55,53,1)_100%)]">
          <a
            href="#conteudo"
            className="focus:bg-glim-diamond focus:text-glim-dark sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
          >
            Ir para o conteúdo principal
          </a>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,183,123,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(74,70,67,0.08),transparent_38%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(242,183,123,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(249,248,246,0.08),transparent_36%)]"
          />

          <Header panelOpacity={headerOpacity} translateY={headerTranslateY} />

          <main id="conteudo" className="relative">
            <Hero
              heroRef={heroRef}
              glowBackground={glowBackground}
              copyY={copyY}
              haloY={haloY}
              reduceMotion={reduceMotion}
            />
            <Approach />
            <Capabilities />
            <ContactSection />
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

function Header({ panelOpacity, translateY }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <m.header
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8"
      style={{ y: translateY }}
    >
      <div className="relative mx-auto max-w-7xl">
        <m.div
          aria-hidden="true"
          className="glass-panel absolute inset-0 rounded-full bg-white/80 backdrop-blur-2xl dark:bg-[#4A4643]/78"
          style={{ opacity: panelOpacity }}
        />
        <nav
          aria-label="Navegação principal"
          className="relative z-20 flex items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-6"
        >
          <Logo href="#topo" />
          <div className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-glim-dark text-sm font-medium text-[#5a5653] transition-colors dark:text-[#e3dfdb] dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <m.a
              href="#contato"
              className="border-glim-diamond/50 bg-glim-diamond text-glim-dark hidden items-center rounded-full border px-5 py-2.5 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] md:inline-flex"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Iniciar Projeto
            </m.a>
            <m.button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/55 text-[#2f2b28] shadow-[0_16px_40px_rgba(74,70,67,0.12)] backdrop-blur-xl transition-colors hover:bg-white/72 dark:border-white/10 dark:bg-white/[0.07] dark:text-[#fbfaf8] dark:hover:bg-white/[0.12] md:hidden"
              whileTap={{ scale: 0.96 }}
              onClick={toggleMenu}
            >
              <span className="relative h-4 w-5" aria-hidden="true">
                <m.span
                  className="absolute top-0 left-0 h-[1.5px] w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={SPRING}
                />
                <m.span
                  className="absolute top-[7px] left-0 h-[1.5px] w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={SPRING}
                />
                <m.span
                  className="absolute top-[14px] left-0 h-[1.5px] w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={SPRING}
                />
              </span>
            </m.button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {isMenuOpen ? (
            [
              <m.button
                key="mobile-navigation-scrim"
                type="button"
                aria-label="Fechar menu principal"
                className="fixed inset-0 z-10 bg-[#2f2b28]/12 backdrop-blur-[2px] md:hidden dark:bg-black/24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                onClick={closeMenu}
              />,
              <m.div
                key="mobile-navigation-panel"
                id="mobile-navigation"
                className="absolute inset-x-0 top-[calc(100%+0.8rem)] z-20 md:hidden"
                initial={{ opacity: 0, y: -10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.8 }}
              >
                <div className="glass-panel relative overflow-hidden rounded-[1.9rem] border border-white/55 bg-white/82 p-3 shadow-[0_28px_70px_rgba(74,70,67,0.16)] backdrop-blur-2xl dark:border-white/12 dark:bg-[#4A4643]/82">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 inset-x-8 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.42),transparent_38%,transparent_64%,rgba(242,183,123,0.14)_100%)] dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.12),transparent_38%,transparent_64%,rgba(242,183,123,0.12)_100%)]"
                  />
                  <div className="relative flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="rounded-[1.2rem] px-4 py-3 text-sm font-medium text-[#4f4945] transition-colors hover:bg-black/[0.045] hover:text-[#2f2b28] dark:text-[#ebe6e1] dark:hover:bg-white/[0.06] dark:hover:text-white"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    ))}
                    <m.a
                      href="#contato"
                      className="border-glim-diamond/45 bg-glim-diamond text-glim-dark mt-2 inline-flex items-center justify-center rounded-[1.2rem] border px-5 py-3.5 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.38)]"
                      whileTap={{ scale: 0.985 }}
                      onClick={closeMenu}
                    >
                      Iniciar Projeto
                    </m.a>
                    <p className="font-mono px-1 pt-2 text-[11px] tracking-[0.18em] text-[#7e7771] uppercase dark:text-[#bdb6b0]">
                      Design digital . engenharia full-stack . Brasil
                    </p>
                  </div>
                </div>
              </m.div>,
            ]
          ) : null}
        </AnimatePresence>
      </div>
    </m.header>
  );
}

function Hero({ heroRef, glowBackground, copyY, haloY, reduceMotion }: HeroProps) {
  const words = HERO_TITLE.split(' ');

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative px-4 pt-28 pb-20 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
    >
      <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="relative">
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-3rem] -left-12 h-[26rem] w-[26rem] rounded-full blur-3xl dark:opacity-75"
            style={{ backgroundImage: glowBackground, y: haloY }}
          />
          <m.div
            className="relative max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={STAGGER}
            style={{ y: copyY }}
          >
            <m.p
              variants={FADE_UP}
              className="font-mono text-xs tracking-[0.34em] text-[#7e7771] uppercase dark:text-[#bfb8b2]"
            >
              Boutique de engenharia de software e design digital
            </m.p>
            <m.h1
              id="hero-title"
              className="mt-6 max-w-[13.6ch] pr-[0.08em] pb-[0.08em] text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.08em] text-[#2f2b28] dark:text-[#fbfaf8]"
              variants={WORD_PARENT}
            >
              {words.map((word, index) => (
                <span key={`${word}-${index}`} className="inline-block pr-[0.16em] pb-[0.08em]">
                  <m.span className="font-google inline-block" variants={WORD_CHILD}>
                    {word}
                  </m.span>
                </span>
              ))}
            </m.h1>
            <m.p
              variants={FADE_UP}
              className="mt-8 max-w-2xl text-lg leading-8 text-[#595450] sm:text-xl dark:text-[#ded9d4]"
            >
              Interfaces transparentes, engenharia de software precisa. Somos a glim., uma boutique
              de design digital e desenvolvimento ágil de elite.
            </m.p>
            <m.div
              variants={FADE_UP}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <m.a
                href="#contato"
                className="group bg-glim-diamond text-glim-dark relative inline-flex items-center overflow-hidden rounded-full px-7 py-4 text-base font-semibold shadow-[0_18px_44px_-22px_rgba(242,183,123,0.85)]"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.46),transparent_52%)] opacity-80 transition-opacity group-hover:opacity-100"
                />
                <span className="relative">Agendar um Vislumbre</span>
              </m.a>
              <p className="font-mono text-xs tracking-[0.2em] text-[#7e7771] uppercase dark:text-[#bfb8b2]">
                Clareza visual. Engenharia precisa. Entrega sem ruído.
              </p>
            </m.div>
          </m.div>
        </div>

        <m.aside
          className="glass-panel glass-shimmer relative rounded-[2rem] p-6 sm:p-7"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={FADE_UP}
          whileHover={reduceMotion ? undefined : { y: -6 }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-glim-diamond font-mono text-xs tracking-[0.2em] uppercase">
              The Glimmer
            </p>
            <span
              aria-hidden="true"
              className="bg-glim-diamond h-3 w-3 rotate-45 rounded-[2px] shadow-[0_0_24px_rgba(242,183,123,0.65)]"
            />
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <p className="font-google text-3xl tracking-[-0.05em] text-[#2f2b28] dark:text-[#fbfaf8]">
                Clareza que acelera.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5c5652] dark:text-[#d9d3cf]">
                Do diagnóstico ao deploy, o trabalho da glim. traduz complexidade em direção
                concreta, interface refinada e software pronto para ganhar tração.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Stack" value="Next.js 16" />
              <Metric label="Compasso" value="React 19" />
              <Metric label="Base" value="TypeScript" />
              <Metric label="Polimento" value="Tailwind + Motion" />
            </div>
          </div>
        </m.aside>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section
      id="abordagem"
      aria-labelledby="abordagem-title"
      className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Manifesto"
          title="Polimos produtos digitais com velocidade lúcida e precisão emocional."
          description="Cada decisão de design e engenharia precisa reduzir ambiguidade, aumentar tração e manter a experiência leve para quem usa e para quem opera."
          titleId="abordagem-title"
        />
        <m.div
          className="mt-10 grid gap-5 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={STAGGER}
        >
          {PILLARS.map((pillar, index) => (
            <m.article
              key={pillar.title}
              className="glass-panel glass-shimmer relative rounded-[2rem] p-7"
              variants={FADE_UP}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22, delay: index * 0.03 }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-glim-diamond font-mono text-xs tracking-[0.2em] uppercase">
                  0{index + 1}
                </p>
                <span
                  aria-hidden="true"
                  className="bg-glim-diamond/80 h-2.5 w-2.5 rotate-45 rounded-[2px]"
                />
              </div>
              <h3 className="font-google mt-8 text-3xl tracking-[-0.05em] text-[#2f2b28] dark:text-[#fbfaf8]">
                {pillar.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[#5d5753] dark:text-[#d9d4cf]">
                {pillar.description}
              </p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Serviços"
          title="Design e engenharia para produtos que precisam parecer simples e funcionar com rigor."
          description="Atuamos como boutique: pouca vaidade, muita precisão. Cada frente é desenhada para gerar legibilidade estratégica, aceleração técnica e execução com acabamento premium."
          titleId="servicos-title"
        />
        <m.div
          className="mt-10 grid gap-5 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={STAGGER}
        >
          {CAPABILITIES.map((capability) => (
            <m.article
              key={capability.title}
              className="glass-panel glass-shimmer relative rounded-[2rem] p-7"
              variants={FADE_UP}
              whileHover={{ y: -5, scale: 1.008 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-black/10 px-3 py-1 font-mono text-[11px] tracking-[0.22em] text-[#7a736d] uppercase dark:border-white/10 dark:text-[#bab4af]">
                  Engenharia aplicada
                </span>
                <span className="border-glim-diamond/30 bg-glim-diamond/10 rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.22em] text-[#9b6f3e] uppercase">
                  Precisão operacional
                </span>
              </div>
              <h3 className="font-google mt-6 text-3xl tracking-[-0.05em] text-[#2f2b28] dark:text-[#fbfaf8]">
                {capability.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[#5c5652] dark:text-[#dad5d0]">
                {capability.description}
              </p>
              <ul
                className="mt-8 flex flex-wrap gap-2"
                aria-label={`Contexto técnico de ${capability.title}`}
              >
                {capability.stack.map((detail) => (
                  <StackPill key={detail}>{detail}</StackPill>
                ))}
              </ul>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL_FORM_STATE);

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset();
  }, [state.status]);

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="px-4 pt-20 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl">
        <m.div
          className="glass-panel relative overflow-hidden rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={FADE_UP}
        >
          <div
            aria-hidden="true"
            className="border-glim-diamond/40 bg-glim-diamond/10 pointer-events-none absolute top-[-4rem] right-[-4rem] h-44 w-44 rotate-45 rounded-[2rem] border blur-[2px]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,1.05fr)] lg:items-start">
            <div>
              <p className="text-glim-diamond font-mono text-xs tracking-[0.28em] uppercase">
                O Diamante
              </p>
              <h2
                id="contato-title"
                className="font-google mt-5 max-w-3xl text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.06em] text-[#2f2b28] dark:text-[#fbfaf8]"
              >
                Pronto para polir seu próximo produto digital?
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f5955] sm:text-lg dark:text-[#dbd6d1]">
                Se o desafio pede clareza, ritmo e acabamento real, a glim. entra para organizar o
                insight, desenhar a experiência e construir a base técnica certa.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <SocialLinkButton
                  href={CONTACT_WHATSAPP_HREF}
                  label="WhatsApp"
                  icon={<WhatsAppIcon />}
                  external
                />
                <SocialLinkButton
                  href={INSTAGRAM_URL}
                  label="Instagram"
                  icon={<InstagramIcon />}
                  external
                />
              </div>
              <div className="mt-8 space-y-3">
                <p className="font-mono text-xs tracking-[0.22em] text-[#7d7670] uppercase dark:text-[#bcb6b0]">
                  Carlos Barbosa, RS | Brasil
                </p>
                <p className="text-sm text-[#726a64] dark:text-[#cfc8c2]">
                  Se preferir, fale direto no WhatsApp pelo{' '}
                  <a
                    href={CONTACT_WHATSAPP_HREF}
                    className="text-glim-dark decoration-glim-diamond/50 dark:text-glim-light font-medium underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {CONTACT_WHATSAPP_LABEL}
                  </a>
                  .
                </p>
              </div>
            </div>

            <m.div
              className="glass-panel relative rounded-[2rem] p-5 sm:p-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-google text-2xl tracking-[-0.05em] text-[#2f2b28] dark:text-[#fbfaf8]">
                    Iniciar Jornada com a glim.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#655e59] dark:text-[#d2cbc6]">
                    Preencha o briefing inicial e enviamos o retorno diretamente por e-mail.
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="bg-glim-diamond hidden h-4 w-4 rotate-45 rounded-[3px] shadow-[0_0_24px_rgba(242,183,123,0.58)] sm:block"
                />
              </div>

              <form ref={formRef} action={formAction} className="space-y-4" noValidate>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    id="name"
                    name="name"
                    label="Nome"
                    placeholder="Seu nome"
                    autoComplete="name"
                    required
                    error={state.fieldErrors?.name}
                  />
                  <InputField
                    id="email"
                    name="email"
                    label="E-mail"
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                    inputMode="email"
                    required
                    error={state.fieldErrors?.email}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    id="company"
                    name="company"
                    label="Empresa"
                    placeholder="Nome da empresa"
                    autoComplete="organization"
                    error={state.fieldErrors?.company}
                  />
                  <InputField
                    id="projectType"
                    name="projectType"
                    label="Tipo de projeto"
                    placeholder="Landing page, MVP, plataforma..."
                    error={state.fieldErrors?.projectType}
                  />
                </div>
                <TextareaField
                  id="message"
                  name="message"
                  label="Mensagem"
                  placeholder="Conte o contexto, o desafio atual e o que você espera destravar."
                  required
                  error={state.fieldErrors?.message}
                />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-h-6" aria-live="polite">
                    {state.message ? (
                      <p
                        className={`text-sm ${state.status === 'success' ? 'text-[#2d6c48] dark:text-[#8fd4aa]' : 'text-[#995b27] dark:text-[#f0c49a]'}`}
                      >
                        {state.message}
                      </p>
                    ) : null}
                  </div>
                  <m.button
                    type="submit"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] disabled:cursor-not-allowed disabled:opacity-75"
                    whileHover={pending ? undefined : { scale: 1.015, y: -2 }}
                    whileTap={pending ? undefined : { scale: 0.985 }}
                    disabled={pending}
                  >
                    <m.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(242,183,123,0.18),rgba(242,183,123,0.9),rgba(242,183,123,0.12),rgba(242,183,123,0.18))]"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    />
                    <span className="text-glim-light dark:text-glim-dark relative inline-flex items-center rounded-full bg-[#2f2b28] px-7 py-4 text-sm font-semibold tracking-[0.02em] dark:bg-[#fbfaf8]">
                      {pending ? 'Enviando...' : 'Iniciar Jornada com a glim.'}
                    </span>
                  </m.button>
                </div>
              </form>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pt-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-black/[0.08] pt-6 text-sm text-[#6a645f] sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-[#c7c1bc]">
        <div className="flex items-center gap-4">
          <Logo href="#topo" compact />
          <p>© {new Date().getFullYear()} glim. Engenharia de Software e Design Digital.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <SocialLinkButton
            href={CONTACT_WHATSAPP_HREF}
            label="WhatsApp"
            icon={<WhatsAppIcon />}
            external
          />
          <SocialLinkButton
            href={INSTAGRAM_URL}
            label="Instagram"
            icon={<InstagramIcon />}
            external
          />
          <a
            href="#abordagem"
            className="hover:text-glim-dark transition-colors dark:hover:text-white"
          >
            Abordagem
          </a>
          <a
            href="#servicos"
            className="hover:text-glim-dark transition-colors dark:hover:text-white"
          >
            Serviços
          </a>
          <a
            href={CONTACT_WHATSAPP_HREF}
            className="hover:text-glim-dark transition-colors dark:hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            {CONTACT_WHATSAPP_LABEL}
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  titleId,
}: {
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
}) {
  return (
    <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={STAGGER}>
      <m.p
        variants={FADE_UP}
        className="font-mono text-xs tracking-[0.28em] text-[#7f7872] uppercase dark:text-[#bdb6b0]"
      >
        {eyebrow}
      </m.p>
      <m.h2
        id={titleId}
        variants={FADE_UP}
        className="font-google mt-4 max-w-4xl text-[clamp(2rem,4vw,4rem)] leading-[1.02] tracking-[-0.06em] text-[#2f2b28] dark:text-[#fbfaf8]"
      >
        {title}
      </m.h2>
      <m.p
        variants={FADE_UP}
        className="mt-5 max-w-3xl text-base leading-8 text-[#5d5753] sm:text-lg dark:text-[#d9d3ce]"
      >
        {description}
      </m.p>
    </m.div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-[#8a837d] uppercase dark:text-[#bab4af]">
        {label}
      </p>
      <p className="font-google mt-2 text-xl tracking-[-0.04em] text-[#2f2b28] dark:text-[#fbfaf8]">
        {value}
      </p>
    </div>
  );
}

function Logo({ href, compact = false }: { href: string; compact?: boolean }) {
  return (
    <a
      href={href}
      aria-label="Voltar ao topo da página"
      className="inline-flex items-center gap-2 text-[#2f2b28] dark:text-[#fbfaf8]"
    >
      <span className={`font-google tracking-[-0.07em] ${compact ? 'text-xl' : 'text-2xl'}`}>
        glim
      </span>
      <span
        aria-hidden="true"
        className={`${compact ? 'h-2.5 w-2.5' : 'h-3 w-3'} bg-glim-diamond rotate-45 rounded-[2px] shadow-[0_0_18px_rgba(242,183,123,0.6)]`}
      />
    </a>
  );
}

function StackPill({ children }: { children: string }) {
  return (
    <li className="rounded-full bg-black/[0.045] px-3 py-2 font-mono text-[11px] tracking-[0.18em] text-[#6a635e] uppercase dark:bg-white/[0.06] dark:text-[#d8d2ce]">
      {children}
    </li>
  );
}

function InputField({
  id,
  name,
  label,
  error,
  ...props
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#4f4a46] dark:text-[#efebe8]">
        {label}
      </span>
      <input
        id={id}
        name={name}
        className={`focus:border-glim-diamond focus:ring-glim-diamond/30 w-full rounded-[1.15rem] border bg-white/70 px-4 py-3 text-sm text-[#2f2b28] transition outline-none focus:ring-2 dark:bg-white/[0.06] dark:text-[#fbfaf8] ${error ? 'border-[#d6945a] dark:border-[#d6945a]' : 'border-black/10 dark:border-white/10'}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className="mt-2 block text-sm text-[#995b27] dark:text-[#f0c49a]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function TextareaField({
  id,
  name,
  label,
  error,
  ...props
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name'>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#4f4a46] dark:text-[#efebe8]">
        {label}
      </span>
      <textarea
        id={id}
        name={name}
        className={`focus:border-glim-diamond focus:ring-glim-diamond/30 min-h-[9.5rem] w-full rounded-[1.15rem] border bg-white/70 px-4 py-3 text-sm text-[#2f2b28] transition outline-none focus:ring-2 dark:bg-white/[0.06] dark:text-[#fbfaf8] ${error ? 'border-[#d6945a] dark:border-[#d6945a]' : 'border-black/10 dark:border-white/10'}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className="mt-2 block text-sm text-[#995b27] dark:text-[#f0c49a]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SocialLinkButton({
  href,
  label,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: ReactElement;
  external?: boolean;
}) {
  return (
    <m.a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2.5 text-sm font-medium text-[#3f3a37] transition dark:border-white/10 dark:bg-white/[0.05] dark:text-[#f1edeb]"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {icon}
      <span>{label}</span>
    </m.a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M12 21a8.94 8.94 0 0 1-4.55-1.24L3.5 21l1.3-3.78A9 9 0 1 1 12 21Z" />
      <path d="M8.9 9.25c.18-.4.37-.4.55-.41h.47c.14 0 .37.05.56.45.18.4.64 1.58.7 1.7.06.13.1.27.02.44-.08.18-.12.29-.25.44-.12.14-.26.31-.37.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.84 1.72 1.1 1.97 1.22.24.11.39.1.53-.06.17-.19.71-.82.9-1.1.19-.27.39-.23.66-.14.27.1 1.7.8 2 1 .3.2.5.3.57.47.07.17.07.98-.23 1.92-.3.95-1.74 1.81-2.4 1.9-.62.08-1.4.11-2.26-.16a9.2 9.2 0 0 1-3.73-2.27 10.3 10.3 0 0 1-2.1-2.78c-.55-.95-.98-2.14-.98-3.04 0-.9.47-1.35.64-1.54.18-.18.4-.23.54-.23Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
