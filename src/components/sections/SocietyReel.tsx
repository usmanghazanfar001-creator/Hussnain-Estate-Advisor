"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { societyPhotos, type SocietyPhoto } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";

export default function SocietyReel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<SocietyPhoto | null>(null);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Auto-advance the reel gently, pausing on hover/touch, when a lightbox
  // is open, or for users who prefer reduced motion.
  useEffect(() => {
    if (paused || lightbox || reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;
    const id = setInterval(() => {
      if (!track) return;
      const firstCard = track.firstElementChild as HTMLElement | null;
      const cardWidth = firstCard?.offsetWidth || 300;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + cardWidth + 16,
        behavior: "smooth",
      });
    }, 3200);
    return () => clearInterval(id);
  }, [paused, lightbox, reducedMotion]);

  const scrollBy = useCallback((dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 300;
    track.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="societies" className="bg-sand-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-600">
              On the ground
            </p>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
              Sitara Housing Societies, photographed on site
            </h2>
          </Reveal>
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
            key={photo.alt + i}
            onClick={() => setLightbox(photo)}
            style={{ scrollSnapAlign: "start" }}
            className="group relative h-64 w-52 flex-none overflow-hidden rounded-2xl bg-ink-900 shadow-soft md:h-80 md:w-64"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 256px, 208px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
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
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-5 backdrop-blur-sm"
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 text-3xl text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <div
            className="relative h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              sizes="90vw"
              className="rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
