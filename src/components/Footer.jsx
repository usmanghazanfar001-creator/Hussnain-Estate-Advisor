import { contactInfo } from "../data/content";

const socialLinks = [
  {
    label: "Facebook",
    href: contactInfo.facebook,
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: contactInfo.instagram,
    color: "#E1306C",
    gradient: "linear-gradient(135deg,#4f5bd5,#962fbf,#d62976,#fa7e1e,#feda75)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 0 0-2.34 1.17 1.17 0 0 0 0 2.34z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: contactInfo.whatsapp,
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.38 1.63 6.22L3.2 28.8l6.75-1.77a12.73 12.73 0 0 0 6.05 1.54h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.36a10.5 10.5 0 0 1-5.36-1.47l-.385-.23-4 1.05 1.07-3.9-.25-.4a10.53 10.53 0 0 1-1.62-5.63c0-5.83 4.74-10.56 10.56-10.56 2.82 0 5.47 1.1 7.46 3.1a10.49 10.49 0 0 1 3.1 7.46c0 5.83-4.74 10.56-10.57 10.56zm5.79-7.9c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.72.16-.21.32-.82 1.02-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.75-.99-2.39-.26-.63-.53-.54-.72-.55l-.62-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.53 1.82.67.76.24 1.45.21 2 .13.61-.09 1.87-.77 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: contactInfo.youtube,
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 pt-16 text-sand-100/80">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-12 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div>
          <h3 className="font-display text-xl font-semibold text-white">Hussnain Estate Advisor</h3>
          <p className="mt-3 text-sm">Your property, our priority.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Quick links</h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {[
              ["Home", "#home"],
              ["Societies", "#societies"],
              ["Properties", "#properties"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-gold-400">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Contact</h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <a href={contactInfo.phoneHref} className="transition-colors hover:text-gold-400">
                {contactInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-gold-400">
                {contactInfo.email}
              </a>
            </li>
            <li>Faisalabad, Pakistan</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">Follow</h4>
          <div className="mt-4 flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ background: s.gradient || s.color }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Hussnain Estate Advisor. All rights reserved.
      </div>
    </footer>
  );
}
