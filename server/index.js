import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    api: 'contact-v2',
    expects: {
      required: ['email', 'appointment', 'contactName'],
      optional: ['phone', 'message', 'timeZone'],
      backwardsCompatible: ['firstName', 'lastName', 'company', 'fullName'],
    },
  });
});

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasSmtpEnv() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function buildAutoReply({ contactLabel, message, appointment, timeZone }) {
  const brand = process.env.BRAND_NAME ?? 'AMASO';
  const website = process.env.BRAND_WEBSITE ?? 'https://amaso.nl';
  const supportEmail = process.env.BRAND_SUPPORT_EMAIL ?? 'info@amaso.nl';
  const subject = process.env.AUTO_REPLY_SUBJECT ?? `We received your message — ${brand}`;

  const safe = (value) =>
    String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const submittedMessage = String(message ?? '').trim();
  const appointmentLine = appointment
    ? `Appointment: ${String(appointment).trim()}${timeZone ? ` (${timeZone})` : ''}`
    : '';

  const text = [
    `Hi ${contactLabel || 'there'},`,
    '',
    `Thanks for reaching out to ${brand}. We’ve received your message and we’ll get back to you shortly.`,
    '',
    'Summary',
    `- Contact: ${contactLabel || '-'}`,
    ...(appointmentLine ? [`- ${appointmentLine}`] : []),
    '',
    ...(submittedMessage ? ['Your message', submittedMessage, ''] : []),
    '',
    `If you need to add anything, reply to this email or contact us at ${supportEmail}.`,
    '',
    `${brand} — ${website}`,
  ].join('\n');

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0b0b10;color:#e5e7eb;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      We’ve received your message and will reply shortly.
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0b0b10;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px;width:100%;background:#0f1117;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="height:3px;background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899);"></td>
            </tr>
            <tr>
              <td style="padding:26px 26px 8px 26px;">
                <div style="font-weight:800;letter-spacing:0.2px;font-size:18px;color:#ffffff;">${safe(brand)}</div>
                <div style="margin-top:10px;font-size:20px;font-weight:800;color:#ffffff;line-height:1.25;">
                  Thanks — we got your message
                </div>
                <div style="margin-top:10px;font-size:14px;color:#9ca3af;line-height:1.6;">
                  Hi ${safe(contactLabel || 'there')}, we’ve received your note and we’ll get back to you shortly.
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 26px 18px 26px;">
                <div style="margin-top:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;">
                  <div style="font-size:12px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1.4px;">Summary</div>
                  <div style="margin-top:10px;font-size:14px;color:#e5e7eb;line-height:1.6;">
                    <div><span style="color:#9ca3af;">Contact:</span> ${safe(contactLabel || '-')}</div>
                    ${
                      appointment
                        ? `<div><span style="color:#9ca3af;">Appointment:</span> ${safe(String(appointment).trim())}${
                            timeZone ? ` <span style="color:#6b7280">(${safe(timeZone)})</span>` : ''
                          }</div>`
                        : ''
                    }
                  </div>
                </div>

                ${
                  submittedMessage
                    ? `<div style="margin-top:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;">
                  <div style="font-size:12px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1.4px;">Your message</div>
                  <div style="margin-top:10px;font-size:14px;color:#e5e7eb;line-height:1.6;white-space:pre-wrap;">${safe(submittedMessage)}</div>
                </div>`
                    : ''
                }

                <div style="margin-top:16px;font-size:13px;color:#9ca3af;line-height:1.6;">
                  Need to add more details? Just reply to this email or contact us at
                  <a href="mailto:${safe(supportEmail)}" style="color:#c4b5fd;text-decoration:none;">${safe(supportEmail)}</a>.
                </div>

                <div style="margin-top:18px;">
                  <a href="${safe(website)}" style="display:inline-block;background:linear-gradient(135deg,#6366f1 0%,#a855f7 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 14px;border-radius:10px;">
                    Visit ${safe(brand)}
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 26px 24px 26px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#6b7280;line-height:1.6;">
                You’re receiving this email because you submitted the contact form on ${safe(website)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

async function createMailTransport() {
  const transportMode = (process.env.EMAIL_TRANSPORT ?? 'smtp').toLowerCase();

  if (transportMode === 'stream') {
    // Explicit local/dev mode: doesn't require SMTP, just logs the email content.
    return {
      transport: nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      }),
      mode: 'stream',
    };
  }

  if (transportMode !== 'smtp') {
    throw new Error(`Unsupported EMAIL_TRANSPORT: ${transportMode}`);
  }

  // Default: real SMTP required.
  if (!hasSmtpEnv()) {
    throw new Error('SMTP is not configured (missing SMTP_HOST/SMTP_USER/SMTP_PASS).');
  }

  const SMTP_HOST = requiredEnv('SMTP_HOST');
  const SMTP_PORT = Number(process.env.SMTP_PORT ?? '587');
  const SMTP_USER = requiredEnv('SMTP_USER');
  const SMTP_PASS = requiredEnv('SMTP_PASS');

  return {
    transport: nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    }),
    mode: 'smtp',
  };
}

app.post('/api/contact', async (req, res) => {
  try {
    const {
      contactName,
      firstName,
      lastName,
      company,
      email,
      phone,
      appointment,
      timeZone,
      message,
      website, // honeypot
    } = req.body ?? {};

    if (typeof website === 'string' && website.trim().length > 0) {
      return res.status(200).json({ ok: true });
    }

    const contactLabel =
      (typeof contactName === 'string' && contactName.trim()) ||
      (typeof company === 'string' && company.trim()) ||
      `${typeof firstName === 'string' ? firstName.trim() : ''} ${typeof lastName === 'string' ? lastName.trim() : ''}`.trim();

    if (!contactLabel) {
      return res.status(400).json({ ok: false, error: 'Name or company is required.' });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Valid email is required.' });
    }
    if (typeof appointment !== 'string' || appointment.trim().length < 1) {
      return res.status(400).json({ ok: false, error: 'Appointment time is required.' });
    }
    if (typeof message !== 'string' || message.trim().length < 1) {
      // message is optional
    }

    const CONTACT_TO = process.env.CONTACT_TO ?? 'info@amaso.nl';
    const SMTP_FROM = process.env.SMTP_FROM ?? 'AMASO Website <no-reply@amaso.nl>';
    const AUTO_REPLY_ENABLED = (process.env.AUTO_REPLY_ENABLED ?? '1') !== '0';
    const AUTO_REPLY_FROM = process.env.AUTO_REPLY_FROM ?? SMTP_FROM;

    const { transport, mode } = await createMailTransport();

    const subject = `New appointment request — ${contactLabel}`;
    const text = [
      `Contact: ${contactLabel}`,
      `Email: ${email.trim()}`,
      `Phone: ${typeof phone === 'string' && phone.trim() ? phone.trim() : '-'}`,
      `Appointment: ${appointment.trim()}${typeof timeZone === 'string' && timeZone.trim() ? ` (${timeZone.trim()})` : ''}`,
      '',
      ...(typeof message === 'string' && message.trim() ? ['Message:', message.trim(), ''] : []),
      '',
      `Sent at: ${new Date().toISOString()}`,
      `IP: ${req.ip}`,
      `UA: ${req.get('user-agent') ?? ''}`,
    ].join('\n');

    const info = await transport.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO,
      replyTo: email.trim(),
      subject,
      text,
    });

    if (AUTO_REPLY_ENABLED) {
      const reply = buildAutoReply({ contactLabel, message, appointment, timeZone });
      const autoInfo = await transport.sendMail({
        from: AUTO_REPLY_FROM,
        to: email.trim(),
        replyTo: CONTACT_TO,
        subject: reply.subject,
        text: reply.text,
        html: reply.html,
      });

      if (mode === 'stream') {
        const raw =
          typeof autoInfo.message === 'string' ? autoInfo.message : autoInfo.message?.toString('utf8') ?? '';
        console.log('--- Auto-reply email (dev stream) ---\n' + raw + '\n--- end ---');
      }
    }

    if (mode === 'stream') {
      const raw = typeof info.message === 'string' ? info.message : info.message?.toString('utf8') ?? '';
      console.log('--- Contact email (dev stream) ---\n' + raw + '\n--- end ---');
      return res.json({ ok: true, mode: 'dev' });
    }

    return res.json({ ok: true });
  } catch (error) {
    // Avoid leaking SMTP/config details to the client
    console.error('Contact form error:', error);
    return res.status(500).json({ ok: false, error: 'Failed to send message.' });
  }
});

const port = Number(process.env.PORT ?? '3001');
const server = app.listen(port);

server.once('listening', () => {
  console.log(`Contact API listening on http://127.0.0.1:${port}`);
});

server.on('error', (err) => {
  console.error('Failed to start Contact API:', err);
  process.exitCode = 1;
});
