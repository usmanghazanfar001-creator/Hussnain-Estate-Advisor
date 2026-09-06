import { NextResponse } from "next/server";
import { buildInquiryEmail, createTransport, type ContactPayload } from "@/lib/email";
import { site } from "@/data/site";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Very small in-memory rate limiter — resets on cold start / restart.
// Good enough to blunt naive form-spam bursts without adding infra.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, phone, property_type, message, website } = body;

  // Honeypot — silently "succeed" without sending if a bot filled this
  // hidden field.
  if (website) {
    return NextResponse.json({
      success: true,
      message: "Thanks — we will be in touch shortly.",
    });
  }

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { success: false, message: "Please fill in all required fields." },
      { status: 422 }
    );
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const transporter = createTransport();
  if (!transporter) {
    console.error(
      "Contact form: SMTP_USER / SMTP_PASS are not configured. See .env.example."
    );
    return NextResponse.json(
      {
        success: false,
        message:
          "Sorry, the message could not be sent right now. Please try WhatsApp or call us directly.",
      },
      { status: 500 }
    );
  }

  const { html, text } = buildInquiryEmail({ name, email, phone, property_type, message });

  try {
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME || site.name}" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `New property inquiry from ${name}`,
      html,
      text,
    });

    return NextResponse.json({
      success: true,
      message: "Thanks — your inquiry has been sent. We will contact you shortly.",
    });
  } catch (err) {
    console.error("Contact form mail error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "Sorry, the message could not be sent. Please try WhatsApp or call us directly.",
      },
      { status: 500 }
    );
  }
}
