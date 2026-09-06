"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

const SLIDE_DURATION = 5500;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const reducedMotion = usePrefersReducedMotion();

  const goTo = useCallback((i: number) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Always auto-advance — restarts cleanly whenever the slide changes
  // (including manual clicks on the dots/arrows) so the timing stays in
  // sync. Skipped entirely for reduced-motion users, who get a single
  // static frame instead.
  useEffect(() => {
    if (reducedMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [index, reducedMotion]);

  return (
    <>
      {heroSlides.map((slide, i) => (
        <div
          key={slide.caption}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.caption}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index && !reducedMotion ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />

      <p
        key={`eyebrow-${index}`}
        className="absolute left-5 top-40 z-20 mb-4 max-w-3xl animate-slideup text-xs font-semibold uppercase tracking-widest2 text-gold-400 md:left-8"
      >
        Faisalabad · Sitara Group Authorized Dealer · {heroSlides[index].caption}
      </p>

      {/* Arrow controls */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="group absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 p-3 text-white backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-gold-400 md:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="group absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 p-3 text-white backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-gold-400 md:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Slide indicators with progress fill */}
      <div className="absolute bottom-6 right-5 z-20 flex gap-2 md:right-8">
        {heroSlides.map((s, i) => (
          <button
            key={s.caption}
            aria-label={`Show slide ${i + 1}: ${s.caption}`}
            onClick={() => goTo(i)}
            className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/25"
          >
            {i === index && !reducedMotion && (
              <span
                key={`progress-${index}`}
                className="absolute inset-y-0 left-0 rounded-full bg-gold-400"
                style={{ animation: `fillbar ${SLIDE_DURATION}ms linear forwards` }}
              />
            )}
            {(i < index || (i === index && reducedMotion)) && (
              <span className="absolute inset-0 rounded-full bg-gold-400" />
            )}
          </button>
        ))}
      </div>
    </>
  );
}
