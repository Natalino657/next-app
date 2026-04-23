import nodemailer from "nodemailer";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export type SendReservationEmailInput = {
  toCustomer: string;
  ownerEmail: string;
  subject: string;
  customerHtml: string;
  ownerHtml: string;
};

export async function sendReservationEmails(input: SendReservationEmailInput) {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  const fromName = process.env.MAIL_FROM_NAME || "Transfer Ilha do Sal";
  const fromEmail = requiredEnv("MAIL_FROM_EMAIL");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const from = `"${fromName.replaceAll('"', "")}" <${fromEmail}>`;

  await transporter.sendMail({
    from,
    to: input.toCustomer,
    subject: input.subject,
    html: input.customerHtml,
  });

  await transporter.sendMail({
    from,
    to: input.ownerEmail,
    subject: `NOVA RESERVA — ${input.subject}`,
    html: input.ownerHtml,
  });
}

