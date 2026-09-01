import { testimonials } from "../data/content";

export default function Testimonials() {
  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-600">
          Client feedback
        </p>
        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
          What clients say after closing
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-ink-900/10 bg-white p-7 shadow-sm"
            >
              <blockquote className="font-display text-lg leading-snug text-ink-800">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-gold-600">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
