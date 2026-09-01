import { useEffect, useState } from "react";
import { contactInfo } from "../data/content";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          ↑
        </button>
      )}
      <a
        href={`mailto:${contactInfo.email}`}
        aria-label="Email us"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-lg text-white shadow-soft transition-transform hover:-translate-y-0.5"
      >
        ✉️
      </a>
      <a
        href={contactInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-soft transition-transform hover:-translate-y-0.5"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white">
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.38 1.63 6.22L3.2 28.8l6.75-1.77a12.73 12.73 0 0 0 6.05 1.54h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.36a10.5 10.5 0 0 1-5.36-1.47l-.385-.23-4 1.05 1.07-3.9-.25-.4a10.53 10.53 0 0 1-1.62-5.63c0-5.83 4.74-10.56 10.56-10.56 2.82 0 5.47 1.1 7.46 3.1a10.49 10.49 0 0 1 3.1 7.46c0 5.83-4.74 10.56-10.57 10.56zm5.79-7.9c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.72.16-.21.32-.82 1.02-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.75-.99-2.39-.26-.63-.53-.54-.72-.55l-.62-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.53 1.82.67.76.24 1.45.21 2 .13.61-.09 1.87-.77 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </a>
    </div>
  );
}
