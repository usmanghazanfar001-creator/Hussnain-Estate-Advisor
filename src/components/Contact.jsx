import { useState } from "react";
import { contactInfo } from "../data/content";

const propertyTypes = ["Residential", "Commercial", "Plot", "Luxury", "Apartment", "Industrial"];

// Where the contact API lives. Defaults to the Vercel serverless function at
// /api/contact (works automatically once deployed on Vercel — no config
// needed). Override via VITE_CONTACT_ENDPOINT in a .env file if you deploy
// the API elsewhere (e.g. the PHP version in backend/).
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", property_type: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const sendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `New inquiry from ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterested in: ${form.property_type}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/923007632767?text=${text}`, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", property_type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      // Backend not deployed yet, or network/CORS issue — fail gracefully.
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-600">
          Get in touch
        </p>
        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
          Contact &amp; booking
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 grid grid-cols-1 gap-4 rounded-2xl border border-ink-900/10 bg-sand-50 p-6 sm:grid-cols-2 md:p-8"
          >
            {/* Honeypot field — hidden from real visitors, catches simple bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website || ""}
              onChange={update("website")}
              className="hidden"
              aria-hidden="true"
            />
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={update("name")}
              className="col-span-1 rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500 sm:col-span-2"
            />
            <input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={update("email")}
              className="rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500"
            />
            <input
              required
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={update("phone")}
              className="rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500"
            />
            <select
              required
              value={form.property_type}
              onChange={update("property_type")}
              className="col-span-1 rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500 sm:col-span-2"
            >
              <option value="">Select property type</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <textarea
              required
              placeholder="Your message"
              rows={4}
              value={form.message}
              onChange={update("message")}
              className="col-span-1 resize-none rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500 sm:col-span-2"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="col-span-1 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-700 disabled:opacity-60 sm:col-span-2"
            >
              {status === "sending" ? "Sending…" : "Send inquiry"}
            </button>

            {status === "success" && (
              <p className="col-span-1 text-sm text-gold-600 sm:col-span-2">
                Thanks — your inquiry has been sent. We'll be in touch shortly.
              </p>
            )}
            {status === "error" && (
              <div className="col-span-1 flex flex-wrap items-center gap-3 text-sm text-red-600 sm:col-span-2">
                <span>Couldn't send that just now.</span>
                <button
                  type="button"
                  onClick={sendViaWhatsApp}
                  className="rounded-full border border-red-600/30 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Send via WhatsApp instead
                </button>
              </div>
            )}
          </form>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 rounded-xl border border-ink-900/10 px-5 py-4 text-sm font-medium text-ink-800 transition-colors hover:border-gold-500"
            >
              ✉️ {contactInfo.email}
            </a>
            <a
              href={contactInfo.phoneHref}
              className="flex items-center gap-3 rounded-xl border border-ink-900/10 px-5 py-4 text-sm font-medium text-ink-800 transition-colors hover:border-gold-500"
            >
              📞 {contactInfo.phone}
            </a>
            <p className="flex items-start gap-3 rounded-xl border border-ink-900/10 px-5 py-4 text-sm font-medium text-ink-800">
              📍 {contactInfo.address}
            </p>
            <div className="overflow-hidden rounded-xl border border-ink-900/10">
              <iframe
                src={contactInfo.mapEmbed}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office location map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
