'use client';

import { useActionState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { LiquidLogo } from '@/components/logo/LiquidLogo';
import { InputField, TextareaField } from '@/components/ui/FormFields';
import { SocialLinkButton } from '@/components/ui/SocialLinkButton';
import { WhatsAppIcon, InstagramIcon } from '@/components/ui/icons';
import { CONTACT_WHATSAPP_HREF, INSTAGRAM_URL } from '@/lib/content';
import { FADE_UP, STAGGER, VIEWPORT } from '@/lib/motion';

const INITIAL_FORM_STATE: ContactFormState = { status: 'idle', message: '' };

export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL_FORM_STATE);

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset();
  }, [state.status]);

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="dark relative overflow-hidden bg-[#0b0908] px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
    >
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,183,123,0.16),transparent_70%)] blur-3xl"
      />

      <m.div
        className="relative mx-auto max-w-4xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
      >
        <m.div variants={FADE_UP} className="mx-auto flex justify-center">
          <LiquidLogo className="h-20 w-64 sm:h-28 sm:w-80 lg:h-36 lg:w-[26rem]" />
        </m.div>

        <m.p
          variants={FADE_UP}
          className="mt-6 font-mono text-[10px] tracking-[0.32em] text-[#c9a15a] uppercase sm:text-xs"
        >
          O Diamante
        </m.p>
        <m.h2
          id="contato-title"
          variants={FADE_UP}
          className="font-google mx-auto mt-5 max-w-2xl text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.055em] text-[#f7f3ee]"
        >
          Vamos entender o que precisa ser construído.
        </m.h2>
        <m.p
          variants={FADE_UP}
          className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-lg"
        >
          Seja para lançar o primeiro site, reposicionar a apresentação da empresa ou melhorar uma
          experiência que já existe, começamos entendendo contexto, objetivo e prioridade.
        </m.p>

        <m.div variants={FADE_UP} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SocialLinkButton href={CONTACT_WHATSAPP_HREF} label="WhatsApp" icon={<WhatsAppIcon />} external />
          <SocialLinkButton href={INSTAGRAM_URL} label="Instagram" icon={<InstagramIcon />} external />
        </m.div>
        <m.p variants={FADE_UP} className="mt-4 text-sm text-white/45">
          Serra Gaúcha - Todo o Brasil
        </m.p>
      </m.div>

      <m.div
        className="relative mx-auto mt-16 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ type: 'spring', stiffness: 140, damping: 22 }}
      >
        <p className="font-google text-2xl tracking-[-0.05em] text-[#f7f3ee]">Conte o contexto</p>
        <p className="mt-2 text-sm leading-7 text-white/55">
          Preencha o briefing inicial. Queremos entender o momento da empresa, o objetivo do
          projeto e o que precisa ser criado, organizado ou revisto.
        </p>

        <form ref={formRef} action={formAction} className="mt-6 space-y-4" noValidate>
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
          <InputField
            id="currentIssue"
            name="currentIssue"
            label="O que você precisa criar, organizar ou melhorar agora?"
            placeholder="Ex.: ainda não temos site, o atual não representa a empresa, a mensagem está confusa ou queremos aumentar a conversão."
            required
            error={state.fieldErrors?.currentIssue}
          />
          <TextareaField
            id="message"
            name="message"
            label="Mensagem"
            placeholder="Descreva o contexto da empresa, o estágio do projeto e o que seria uma boa entrega para você."
            required
            error={state.fieldErrors?.message}
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-6" aria-live="polite">
              {state.message ? (
                <p
                  className={`text-sm ${state.status === 'success' ? 'text-[#8fd4aa]' : 'text-[#f0c49a]'}`}
                >
                  {state.message}
                </p>
              ) : null}
            </div>
            <m.button
              type="submit"
              data-cursor-hover
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
              <span className="relative inline-flex items-center rounded-full bg-[#f5f0ea] px-7 py-4 text-sm font-semibold tracking-[0.02em] text-[#14100e]">
                {pending ? 'Enviando...' : 'Iniciar Projeto com a glim.'}
              </span>
            </m.button>
          </div>
        </form>
      </m.div>
    </section>
  );
}
