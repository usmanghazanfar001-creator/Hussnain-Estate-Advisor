import { useState } from "react";
import { contactInfo } from "../data/content";

const propertyTypes = ["Residential", "Commercial", "Plot", "Luxury", "Apartment", "Industrial"];

/** Consistent icon-badge row used for the email/phone/address cards below
 * the form — swaps the old raw emoji for crisp, theme-colored SVGs. */
function InfoRow({ icon, label, value, href, as: Tag = "a", ...rest }) {
  const content = (
    <>
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gold-50 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-white">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-800/50">{label}</span>
        <span className="text-sm font-medium text-ink-800">{value}</span>
      </span>
    </>
  );
  const className =
    "group flex items-center gap-4 rounded-xl border border-ink-900/10 px-5 py-4 transition-colors hover:border-gold-500";
  return Tag === "a" ? (
    <a href={href} className={className} {...rest}>
      {content}
    </a>
  ) : (
    <Tag className={className} {...rest}>
      {content}
    </Tag>
  );
}

const MailIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
  </svg>
);
const PinIcon = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

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
            <InfoRow
              icon={MailIcon}
              label="Email"
              value={contactInfo.email}
              href={contactInfo.emailHref}
              target="_blank"
              rel="noopener noreferrer"
            />
            <InfoRow icon={PhoneIcon} label="Phone" value={contactInfo.phone} href={contactInfo.phoneHref} />
            <InfoRow icon={PinIcon} label="Office" value={contactInfo.address} as="div" />
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
