"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { propertyTypeOptions } from "@/data/content";
import { site } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

type FormState = {
  name: string;
  email: string;
  phone: string;
  property_type: string;
  message: string;
  website: string; // honeypot
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  property_type: "",
  message: "",
  website: "",
};

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const sendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `New inquiry from ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterested in: ${form.property_type}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/923007632767?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setStatus("success");
        setForm(initialForm);
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
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-600">
            Get in touch
          </p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
            Contact &amp; booking
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Reveal direction="left" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-4 rounded-2xl border border-ink-900/10 bg-sand-50 p-6 sm:grid-cols-2 md:p-8"
              aria-describedby={status === "error" ? "contact-form-error" : undefined}
            >
              {/* Honeypot field — hidden from real visitors, catches simple bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={update("website")}
                className="hidden"
                aria-hidden="true"
              />

              <label className="col-span-1 sm:col-span-2" htmlFor="contact-name">
                <span className="sr-only">Your name</span>
                <input
                  id="contact-name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                  className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500"
                />
              </label>

              <label className="col-span-1" htmlFor="contact-email">
                <span className="sr-only">Email address</span>
                <input
                  id="contact-email"
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500"
                />
              </label>

              <label className="col-span-1" htmlFor="contact-phone">
                <span className="sr-only">Phone number</span>
                <input
                  id="contact-phone"
                  required
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={update("phone")}
                  className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500"
                />
              </label>

              <label className="col-span-1 sm:col-span-2" htmlFor="contact-property-type">
                <span className="sr-only">Property type</span>
                <select
                  id="contact-property-type"
                  required
                  value={form.property_type}
                  onChange={update("property_type")}
                  className="w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500"
                >
                  <option value="">Select property type</option>
                  {propertyTypeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="col-span-1 sm:col-span-2" htmlFor="contact-message">
                <span className="sr-only">Your message</span>
                <textarea
                  id="contact-message"
                  required
                  placeholder="Your message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  className="w-full resize-none rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500"
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="col-span-1 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-700 disabled:opacity-60 sm:col-span-2"
              >
                {status === "sending" ? "Sending…" : "Send inquiry"}
              </button>

              {status === "success" && (
                <p role="status" className="col-span-1 text-sm text-gold-600 sm:col-span-2">
                  Thanks — your inquiry has been sent. We&apos;ll be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <div
                  id="contact-form-error"
                  role="alert"
                  className="col-span-1 flex flex-wrap items-center gap-3 text-sm text-red-600 sm:col-span-2"
                >
                  <span>Couldn&apos;t send that just now.</span>
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
          </Reveal>

          <Reveal direction="right" className="lg:col-span-2 flex flex-col gap-4">
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-3 rounded-xl border border-ink-900/10 px-5 py-4 text-sm font-medium text-ink-800 transition-colors hover:border-gold-500"
            >
              ✉️ {site.contact.email}
            </a>
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="flex items-center gap-3 rounded-xl border border-ink-900/10 px-5 py-4 text-sm font-medium text-ink-800 transition-colors hover:border-gold-500"
            >
              📞 {site.contact.phone}
            </a>
            <p className="flex items-start gap-3 rounded-xl border border-ink-900/10 px-5 py-4 text-sm font-medium text-ink-800">
              📍 {site.contact.streetAddress}, {site.contact.addressLocality}
            </p>
            <div className="overflow-hidden rounded-xl border border-ink-900/10">
              <iframe
                src={site.contact.mapEmbed}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office location map"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
