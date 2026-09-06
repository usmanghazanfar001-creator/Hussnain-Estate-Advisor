import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "../data/content";

const SLIDE_DURATION = 5500;
const SWIPE_THRESHOLD = 40;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const goTo = useCallback((i) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Always auto-advance — restarts cleanly whenever the slide changes
  // (including manual clicks on the dots/arrows) so the timing stays in sync.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [index]);

  // Swipe support — arrows are desktop-only, so touch users get the same
  // control via a left/right swipe on the hero itself.
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="home"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-900"
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.caption}
            className={`h-full w-full object-cover ${i === index ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-24 pt-40 md:px-8 md:pb-32">
        <p
          key={`eyebrow-${index}`}
          className="mb-4 animate-slideup text-xs font-semibold uppercase tracking-widest2 text-gold-400"
        >
          Faisalabad · Sitara Group Authorized Dealer · {heroSlides[index].caption}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl">
          Land you can build a lifetime on.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-100/85 md:text-lg">
          23 years guiding families and investors through Faisalabad's most trusted housing
          societies — residential, commercial, industrial and agricultural.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-gold-400"
          >
            Book a consultation
          </a>
          <a
            href="#societies"
            className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-400"
          >
            View the societies
          </a>
        </div>
      </div>

      {/* Slide indicators with progress fill */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:left-auto md:right-8 md:translate-x-0">
        {heroSlides.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Show slide ${i + 1}: ${s.caption}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`group relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-300 ease-out ${
              i === index ? "w-9 shadow-[0_0_10px_rgba(203,167,95,0.7)]" : "w-4 hover:bg-white/40"
            }`}
          >
            {i === index && (
              <span
                key={`progress-${index}`}
                className="absolute inset-y-0 left-0 rounded-full bg-gold-400"
                style={{ animation: `fillbar ${SLIDE_DURATION}ms linear forwards` }}
              />
            )}
            {i < index && <span className="absolute inset-0 rounded-full bg-gold-400/70" />}
          </button>
        ))}
      </div>
    </section>
  );
}
