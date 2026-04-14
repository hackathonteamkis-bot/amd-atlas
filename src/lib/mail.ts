import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const FROM_ADDRESS = `"Auth App" <${process.env.SMTP_FROM}>`;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await getTransporter().sendMail({
    from: FROM_ADDRESS,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code : <b>${token}</b></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${APP_URL}/auth/new-password?token=${token}`;

  await getTransporter().sendMail({
    from: FROM_ADDRESS,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${APP_URL}/auth/new-verification?token=${token}`;

  await getTransporter().sendMail({
    from: FROM_ADDRESS,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  });
};
