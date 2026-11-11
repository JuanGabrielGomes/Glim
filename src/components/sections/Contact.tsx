'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitRaioX, type RaioXFormState } from '@/app/actions';
import { Button, TextLink } from '@/components/ui/Button';
import { FitText } from '@/components/ui/FitText';
import { InputField, SelectField } from '@/components/ui/FormFields';
import { Reveal } from '@/components/ui/Reveal';
import { CONTACT_WHATSAPP_HREF, RAIO_X } from '@/lib/content';

const INITIAL_STATE: RaioXFormState = { status: 'idle', message: '' };

/** Raio-x: o formulário curto de conversão (cinco campos) e o atalho para o WhatsApp. */
export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, formAction, pending] = useActionState(submitRaioX, INITIAL_STATE);
  const [lead, emphasis, tail] = RAIO_X.heading;

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset();
  }, [state.status]);

  return (
    <section
      id="raio-x"
      aria-labelledby="raio-x-title"
      className="bg-linho-100 px-[var(--m)] py-[clamp(80px,9vw,140px)]"
    >
      <Reveal>
        <div className="grid gap-[clamp(32px,6vw,96px)] md:grid-cols-2">
          <div>
            <FitText
              as="h2"
              id="raio-x-title"
              lines={[...RAIO_X.title]}
              className="mega text-[15vw] md:text-[clamp(44px,7.6vw,112px)]"
            />
            <h3 className="mt-[30px] mb-[22px] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]">
              {lead}{' '}
              <em className="font-serif text-[1.1em] leading-[0.9] font-normal tracking-[-0.01em]">{emphasis}</em>{' '}
              {tail}
            </h3>
            <p className="text-pedra-500 max-w-[34em] text-[clamp(18px,1.5vw,21px)] leading-[1.5]">{RAIO_X.text}</p>
            <p className="mt-[34px]">
              <TextLink href={CONTACT_WHATSAPP_HREF} external>
                {RAIO_X.whatsappLabel}
              </TextLink>
            </p>
          </div>

          {state.status === 'success' ? (
            <div role="status" className="self-start border-pedra-300 border-t pt-8">
              <p className="meta text-ambar-700">Pedido enviado</p>
              <p className="mt-4 max-w-[28em] text-2xl leading-[1.2] font-medium tracking-[-0.03em]">{state.message}</p>
              <p className="mt-8">
                <TextLink href={CONTACT_WHATSAPP_HREF} external>
                  Adiantar pelo WhatsApp
                </TextLink>
              </p>
            </div>
          ) : (
            <form ref={formRef} action={formAction} noValidate className="grid gap-3.5">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <InputField
                id="name"
                name="name"
                label="Nome"
                placeholder="Seu nome"
                autoComplete="name"
                defaultValue={state.values?.name}
                required
                error={state.fieldErrors?.name}
              />
              <InputField
                id="company"
                name="company"
                label="Empresa"
                placeholder="Nome da empresa"
                autoComplete="organization"
                defaultValue={state.values?.company}
                required
                error={state.fieldErrors?.company}
              />
              <InputField
                id="currentSite"
                name="currentSite"
                label="Site atual"
                placeholder="www.suaempresa.com.br ou só o Instagram"
                autoComplete="url"
                inputMode="url"
                defaultValue={state.values?.currentSite}
                error={state.fieldErrors?.currentSite}
              />
              <InputField
                id="whatsapp"
                name="whatsapp"
                label="WhatsApp"
                placeholder="(54) 99999-9999"
                autoComplete="tel"
                inputMode="tel"
                defaultValue={state.values?.whatsapp}
                required
                error={state.fieldErrors?.whatsapp}
              />
              <SelectField
                id="need"
                name="need"
                label="O que precisa"
                options={RAIO_X.needs}
                defaultValue={state.values?.need ?? RAIO_X.needs[0]}
                error={state.fieldErrors?.need}
              />

              <div className="mt-[18px] flex flex-col items-start gap-3">
                <Button type="submit" disabled={pending}>
                  {pending ? 'Enviando...' : RAIO_X.submit}
                </Button>
                <p
                  role={state.status === 'error' || state.status === 'validation' ? 'alert' : undefined}
                  aria-live="polite"
                  className="text-ambar-700 min-h-6 text-sm"
                >
                  {state.status === 'error' || state.status === 'validation' ? state.message : ''}
                </p>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
