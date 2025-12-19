import nodemailer from 'nodemailer';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const SMTP_HOST = requiredEnv('SMTP_HOST');
const SMTP_PORT = Number(process.env.SMTP_PORT ?? '587');
const SMTP_USER = requiredEnv('SMTP_USER');
const SMTP_PASS = requiredEnv('SMTP_PASS');

const CONTACT_TO = process.env.CONTACT_TO ?? 'info@amaso.nl';
const SMTP_FROM = process.env.SMTP_FROM ?? `AMASO Website <${SMTP_USER}>`;

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const info = await transport.sendMail({
  from: SMTP_FROM,
  to: CONTACT_TO,
  subject: 'AMASO SMTP test email',
  text: `SMTP test OK\n\nSent at: ${new Date().toISOString()}\n`,
});

console.log('Sent test email:', { messageId: info.messageId, to: CONTACT_TO, host: SMTP_HOST, port: SMTP_PORT });

