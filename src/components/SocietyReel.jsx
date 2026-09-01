import { useCallback, useEffect, useRef, useState } from "react";
import { societyPhotos } from "../data/content";

export default function SocietyReel() {
  const trackRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [paused, setPaused] = useState(false);

  // Auto-advance the reel gently, pausing on hover/touch or when a lightbox is open
  useEffect(() => {
    if (paused || lightbox) return;
    const track = trackRef.current;
    if (!track) return;
    const id = setInterval(() => {
      if (!track) return;
      const cardWidth = track.firstChild?.offsetWidth || 300;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + cardWidth + 16,
        behavior: "smooth",
      });
    }, 3200);
    return () => clearInterval(id);
  }, [paused, lightbox]);

  const scrollBy = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth || 300;
    track.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="societies" className="bg-sand-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-600">
              On the ground
            </p>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
              Sitara Housing Societies, photographed on site
            </h2>
          </div>
          <div className="hidden gap-3 md:flex">
            <button
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-800/15 text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              ←
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-800/15 text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        className="reel mt-10 flex gap-4 overflow-x-auto scroll-smooth px-5 pb-4 md:gap-5 md:px-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {societyPhotos.map((photo, i) => (
          <button
            key={photo.src + i}
            onClick={() => setLightbox(photo)}
            style={{ scrollSnapAlign: "start" }}
            className="group relative h-64 w-52 flex-none overflow-hidden rounded-2xl bg-ink-900 shadow-soft md:h-80 md:w-64"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-xs font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              {photo.alt}
            </span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-5 backdrop-blur-sm"
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 text-3xl text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
