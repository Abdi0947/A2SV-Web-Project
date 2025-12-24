import nodemailer from "nodemailer";

type MailOptions = {
  to: string;
  subject: string;
  text: string;
};

function getTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT
    ? Number(process.env.SMTP_PORT)
    : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // common convention: 465 = secure
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  return { transporter, from: smtpFrom };
}

export async function sendMail({ to, subject, text }: MailOptions) {
  const result = getTransporter();

  if (!result) {
    console.warn(
      "[mailer] SMTP env vars missing. Skipping email send. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM.",
    );
    return { sent: false, error: "missing_smtp_config" };
  }

  try {
    await result.transporter.sendMail({
      from: result.from,
      to,
      subject,
      text,
    });

    return { sent: true };
  } catch (error: any) {
    console.error("[mailer] sendMail failed:", error?.message ?? error);
    return { sent: false, error: error?.message ?? "send_failed" };
  }
}

