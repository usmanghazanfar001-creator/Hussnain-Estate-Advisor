import nodemailer from "nodemailer";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  property_type?: string;
  message: string;
  website?: string; // honeypot — should always be empty for real visitors
};

/**
 * Lazily creates a Nodemailer transporter from environment variables.
 * Never hardcode credentials here — set SMTP_USER / SMTP_PASS in your
 * hosting provider's environment variable settings (or .env.local for
 * local development, which is git-ignored).
 */
export function createTransport() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function buildInquiryEmail(payload: ContactPayload) {
  const { name, email, phone, property_type, message } = payload;
  const html = `
    <h3>New inquiry from the website</h3>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Property type:</strong> ${escapeHtml(property_type || "-")}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;
  const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProperty type: ${
    property_type || "-"
  }\nMessage: ${message}`;

  return { html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
