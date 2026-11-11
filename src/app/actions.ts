'use server';

import nodemailer from 'nodemailer';
import { RAIO_X } from '@/lib/content';

type RaioXField = 'name' | 'company' | 'currentSite' | 'whatsapp' | 'need';

type RaioXFieldErrors = Partial<Record<RaioXField, string>>;

export type RaioXFormState = {
  status: 'idle' | 'success' | 'error' | 'validation';
  message: string;
  fieldErrors?: RaioXFieldErrors;
  /** Valores enviados, devolvidos para o formulário não apagar o que a pessoa digitou. */
  values?: Partial<Record<RaioXField, string>>;
};

interface RaioXValues {
  name: string;
  company: string;
  currentSite: string;
  whatsapp: string;
  need: string;
}

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'glim.contato@gmail.com';
const ALLOWED_NEEDS: readonly string[] = RAIO_X.needs;

function getField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildValidationErrors(values: RaioXValues): RaioXFieldErrors {
  const fieldErrors: RaioXFieldErrors = {};
  const whatsappDigits = values.whatsapp.replace(/\D/g, '');

  if (values.name.length < 2) {
    fieldErrors.name = 'Informe seu nome com pelo menos 2 caracteres.';
  }

  if (values.company.length < 2) {
    fieldErrors.company = 'Informe o nome da empresa.';
  }

  if (values.currentSite.length > 200) {
    fieldErrors.currentSite = 'Use no máximo 200 caracteres.';
  }

  if (whatsappDigits.length < 10 || whatsappDigits.length > 13) {
    fieldErrors.whatsapp = 'Informe um WhatsApp com DDD, por exemplo (54) 99999-9999.';
  }

  if (!ALLOWED_NEEDS.includes(values.need)) {
    fieldErrors.need = 'Escolha uma das opções.';
  }

  return fieldErrors;
}

function buildEmailText(values: RaioXValues) {
  const whatsappDigits = values.whatsapp.replace(/\D/g, '');
  return [
    `Novo pedido de raio-x: ${values.company}`,
    '',
    `Nome: ${values.name}`,
    `Empresa: ${values.company}`,
    `Site atual: ${values.currentSite || 'Não informado'}`,
    `WhatsApp: ${values.whatsapp} (https://wa.me/55${whatsappDigits.replace(/^55/, '')})`,
    `O que precisa: ${values.need}`,
  ].join('\n');
}

function buildEmailHtml(values: RaioXValues) {
  const whatsappDigits = values.whatsapp.replace(/\D/g, '').replace(/^55/, '');
  return `
    <div style="font-family: Arial, sans-serif; color: #1c1a18; line-height: 1.7;">
      <h1 style="margin: 0 0 16px; font-size: 22px;">Novo pedido de raio-x</h1>
      <p style="margin: 0 0 8px;"><strong>Nome:</strong> ${escapeHtml(values.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Empresa:</strong> ${escapeHtml(values.company)}</p>
      <p style="margin: 0 0 8px;"><strong>Site atual:</strong> ${escapeHtml(values.currentSite || 'Não informado')}</p>
      <p style="margin: 0 0 8px;"><strong>WhatsApp:</strong> <a href="https://wa.me/55${escapeHtml(whatsappDigits)}">${escapeHtml(values.whatsapp)}</a></p>
      <p style="margin: 0;"><strong>O que precisa:</strong> ${escapeHtml(values.need)}</p>
    </div>
  `;
}

export async function submitRaioX(
  _previousState: RaioXFormState,
  formData: FormData
): Promise<RaioXFormState> {
  // Honeypot: campo escondido que só robôs preenchem.
  if (getField(formData, 'website')) {
    return { status: 'success', message: 'Recebemos o pedido e vamos responder em breve.' };
  }

  const values: RaioXValues = {
    name: getField(formData, 'name'),
    company: getField(formData, 'company'),
    currentSite: getField(formData, 'currentSite'),
    whatsapp: getField(formData, 'whatsapp'),
    need: getField(formData, 'need'),
  };

  const fieldErrors = buildValidationErrors(values);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'validation',
      message: 'Revise os campos destacados e tente novamente.',
      fieldErrors,
      values,
    };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT ?? '587');
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? smtpUser ?? CONTACT_TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !Number.isFinite(smtpPort)) {
    return {
      status: 'error',
      message: 'O envio ainda não está configurado no servidor. Chame no WhatsApp enquanto isso.',
      values,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      to: CONTACT_TO_EMAIL,
      from: fromEmail,
      subject: `Raio-x · ${values.company}`,
      text: buildEmailText(values),
      html: buildEmailHtml(values),
    });

    return {
      status: 'success',
      message: 'Pedido enviado. Respondemos pelo WhatsApp em até um dia útil.',
    };
  } catch {
    return {
      status: 'error',
      message: 'Não conseguimos enviar agora. Tente de novo em instantes ou chame no WhatsApp.',
      values,
    };
  }
}
