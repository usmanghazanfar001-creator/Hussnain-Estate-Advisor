import { useEffect, useState } from "react";
import logo from "../assets/images/logo-modified.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#societies", label: "Societies" },
  { href: "#properties", label: "Properties" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-ink-800/95 backdrop-blur shadow-soft" : "bg-gradient-to-b from-ink-900/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Hussnain Estate Advisor logo" className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12" />
          <span className="font-display text-lg leading-tight text-white md:text-xl">
            Hussnain Estate <span className="text-gold-400">Advisor</span>
          </span>
        </a>

        <nav className="hidden md:flex md:items-center md:gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-sand-100/90 transition-colors hover:text-gold-400"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-400"
          >
            Book a visit
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden bg-ink-800 transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-5 pb-6 pt-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={handleLinkClick}
                className="rounded-lg px-3 py-3 text-base font-medium text-sand-100 transition-colors hover:bg-white/5 hover:text-gold-400"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-2 rounded-full bg-gold-500 px-4 py-3 text-center text-sm font-semibold text-ink-900"
            >
              Book a visit
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
