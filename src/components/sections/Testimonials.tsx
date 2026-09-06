import { testimonials } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  return (
    <section className="bg-sand-50 py-20 md:py-28" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-600">
            Client feedback
          </p>
          <h2
            id="testimonials-heading"
            className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl"
          >
            What clients say after closing
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} as="div">
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-ink-900/10 bg-white p-7 shadow-sm">
                <blockquote className="font-display text-lg leading-snug text-ink-800">
                  &quot;{t.quote}&quot;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-gold-600">
                  — {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
