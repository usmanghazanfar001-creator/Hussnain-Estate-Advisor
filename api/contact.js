// Vercel serverless function — handles the contact form and emails the
// enquiry via Nodemailer/SMTP. Deployed automatically at /api/contact
// because it lives in the /api folder (Vercel's convention, no extra config).

import nodemailer from "nodemailer";

// Only these origins may POST here. Add your custom domain once you have one.
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://hussnain-estate-advisor.vercel.app",
];

function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const { name, email, phone, property_type, message, website } = req.body || {};

  // Honeypot — silently "succeed" without sending if a bot filled this hidden field
  if (website) {
    return res.status(200).json({ success: true, message: "Thanks — we will be in touch shortly." });
  }

  if (!name || !email || !phone || !message) {
    return res.status(422).json({ success: false, message: "Please fill in all required fields." });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(422).json({ success: false, message: "Please enter a valid email address." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // STARTTLS on port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "Hussnain Estate Advisor"}" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `New property inquiry from ${name}`,
      html: `
        <h3>New inquiry from the website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Property type:</strong> ${property_type || "-"}</p>
        <p><strong>Message:</strong><br>${String(message).replace(/\n/g, "<br>")}</p>
      `,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProperty type: ${property_type || "-"}\nMessage: ${message}`,
    });

    return res.status(200).json({
      success: true,
      message: "Thanks — your inquiry has been sent. We will contact you shortly.",
    });
  } catch (err) {
    console.error("Contact form mail error:", err);
    return res.status(500).json({
      success: false,
      message: "Sorry, the message could not be sent. Please try WhatsApp or call us directly.",
    });
  }
}
