'use server';

import nodemailer from 'nodemailer';

type ContactField = 'name' | 'email' | 'company' | 'projectType' | 'currentIssue' | 'message';

type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactFormState = {
  status: 'idle' | 'success' | 'error' | 'validation';
  message: string;
  fieldErrors?: ContactFieldErrors;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'glim.contato@gmail.com';

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

function buildValidationErrors(values: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  currentIssue: string;
  message: string;
}) {
  const fieldErrors: ContactFieldErrors = {};

  if (values.name.length < 2) {
    fieldErrors.name = 'Informe seu nome com pelo menos 2 caracteres.';
  }

  if (!EMAIL_REGEX.test(values.email)) {
    fieldErrors.email = 'Informe um e-mail valido para retornarmos.';
  }

  if (values.company.length > 0 && values.company.length < 2) {
    fieldErrors.company = 'Se preencher a empresa, use pelo menos 2 caracteres.';
  }

  if (values.projectType.length > 0 && values.projectType.length < 3) {
    fieldErrors.projectType = 'Descreva melhor o tipo de projeto.';
  }

  if (values.currentIssue.length < 10) {
    fieldErrors.currentIssue =
      'Conte em poucas palavras o que hoje nao esta funcionando como deveria.';
  }

  if (values.message.length < 20) {
    fieldErrors.message = 'Conte um pouco mais sobre o desafio. Minimo de 20 caracteres.';
  }

  return fieldErrors;
}

function buildEmailText(values: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  currentIssue: string;
  message: string;
}) {
  return [
    'Novo contato enviado pelo site da glim.',
    '',
    `Nome: ${values.name}`,
    `E-mail: ${values.email}`,
    `Empresa: ${values.company || 'Nao informado'}`,
    `Tipo de projeto: ${values.projectType || 'Nao informado'}`,
    `O que nao esta funcionando: ${values.currentIssue}`,
    '',
    'Mensagem:',
    values.message,
  ].join('\n');
}

function buildEmailHtml(values: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  currentIssue: string;
  message: string;
}) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #2f2b28; line-height: 1.7;">
      <h1 style="margin: 0 0 16px; font-size: 24px;">Novo contato enviado pelo site da glim.</h1>
      <p style="margin: 0 0 8px;"><strong>Nome:</strong> ${escapeHtml(values.name)}</p>
      <p style="margin: 0 0 8px;"><strong>E-mail:</strong> ${escapeHtml(values.email)}</p>
      <p style="margin: 0 0 8px;"><strong>Empresa:</strong> ${escapeHtml(
        values.company || 'Nao informado'
      )}</p>
      <p style="margin: 0 0 16px;"><strong>Tipo de projeto:</strong> ${escapeHtml(
        values.projectType || 'Nao informado'
      )}</p>
      <p style="margin: 0 0 16px;"><strong>O que nao esta funcionando:</strong> ${escapeHtml(
        values.currentIssue
      )}</p>
      <div style="padding: 16px; border-radius: 16px; background: #f9f8f6; border: 1px solid rgba(74, 70, 67, 0.12);">
        <p style="margin: 0 0 8px;"><strong>Mensagem:</strong></p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(values.message)}</p>
      </div>
    </div>
  `;
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const website = getField(formData, 'website');

  if (website) {
    return {
      status: 'success',
      message: 'Recebemos sua mensagem e vamos responder em breve.',
    };
  }

  const values = {
    name: getField(formData, 'name'),
    email: getField(formData, 'email'),
    company: getField(formData, 'company'),
    projectType: getField(formData, 'projectType'),
    currentIssue: getField(formData, 'currentIssue'),
    message: getField(formData, 'message'),
  };

  const fieldErrors = buildValidationErrors(values);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'validation',
      message: 'Revise os campos destacados e tente novamente.',
      fieldErrors,
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
      message:
        'O formulario esta pronto, mas a configuracao de envio de e-mail ainda nao foi concluida no servidor.',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      to: CONTACT_TO_EMAIL,
      from: fromEmail,
      replyTo: values.email,
      subject: `[glim] Novo contato de ${values.name}`,
      text: buildEmailText(values),
      html: buildEmailHtml(values),
    });

    return {
      status: 'success',
      message: 'Mensagem enviada. Vamos retornar o contato em breve.',
    };
  } catch {
    return {
      status: 'error',
      message:
        'Nao conseguimos enviar agora. Tente novamente em instantes ou use o contato direto.',
    };
  }
}
