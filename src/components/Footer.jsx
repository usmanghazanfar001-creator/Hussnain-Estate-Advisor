import logo from "../assets/images/logo-modified.png";
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
      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
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

const quickLinks = [
  ["Home", "#home"],
  ["Societies", "#societies"],
  ["Properties", "#properties"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const MailIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
  </svg>
);
const PinIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const ChevronIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Footer() {
  const mapLink = contactInfo.mapEmbed.replace("&output=embed", "");

  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-16 text-sand-100/80">
      {/* subtle brand-colored glow for depth */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-12 sm:grid-cols-2 md:px-8 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-2">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="Hussnain Estate Advisor logo" className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15" />
            <span className="font-display text-xl font-semibold text-white">Hussnain Estate Advisor</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Your property, our priority — 23 years guiding families and investors through
            Faisalabad's most trusted housing societies.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ background: s.gradient || s.color }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-8">
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-400">Quick links</h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-gold-400"
                >
                  <span className="text-gold-500/70 transition-transform duration-200 group-hover:translate-x-0.5">
                    {ChevronIcon}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8">
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-400">Contact</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <a
                href={contactInfo.phoneHref}
                className="group flex items-center gap-3 transition-colors hover:text-gold-400"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/5 text-gold-400 ring-1 ring-white/10 transition-colors group-hover:bg-gold-500 group-hover:text-ink-900">
                  {PhoneIcon}
                </span>
                {contactInfo.phone}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.emailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-colors hover:text-gold-400"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/5 text-gold-400 ring-1 ring-white/10 transition-colors group-hover:bg-gold-500 group-hover:text-ink-900">
                  {MailIcon}
                </span>
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-colors hover:text-gold-400"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/5 text-gold-400 ring-1 ring-white/10 transition-colors group-hover:bg-gold-500 group-hover:text-ink-900">
                  {PinIcon}
                </span>
                Faisalabad, Pakistan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5">
        <div className="mx-auto max-w-7xl px-5 text-center text-xs text-white/50 md:px-8">
          <p>© {new Date().getFullYear()} Hussnain Estate Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
