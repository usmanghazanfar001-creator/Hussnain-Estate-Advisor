import { useEffect, useRef, useState } from "react";
import { stats } from "../data/content";

function Counter({ target, suffix }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const startTime = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-white md:text-5xl">
      {value}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-ink-900 py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:px-8 md:gap-20">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-400">
            About us
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
            Two decades of straight answers on Faisalabad real estate
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-sand-100/80">
            Hussnain Estate Advisor has spent 23 years meeting the specific needs of
            residential and corporate clients across Faisalabad. Our reputation rests on
            deals our clients can verify and trust — which is why so many return, and why
            we're an authorized dealer for the Sitara Group's flagship societies.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-sand-100/80">
            Whether you're buying your first residential plot or expanding an industrial
            portfolio, we walk every step of the process with you, from site visits to
            final transfer.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 self-center border-t border-white/10 pt-10 md:border-t-0 md:pt-0">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <Counter target={s.target} suffix={s.suffix} />
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-sand-100/60 md:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
