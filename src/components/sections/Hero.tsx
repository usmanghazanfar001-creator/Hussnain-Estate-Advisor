import HeroSlideshow from "./HeroSlideshow";
import HeroScene from "@/components/three/HeroSceneLazy";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-900"
    >
      <HeroSlideshow />

      {/* Subtle 3D land-grid layer — a low, quiet accent along the base of
          the hero, not a full-bleed background. Clipped to the bottom
          portion of the section (with a soft fade) so it can never
          compete with the headline for attention, and simply doesn't
          render at all if WebGL/reduced-motion rule it out (see
          HeroScene). */}
      <HeroScene
        className="absolute inset-x-0 bottom-0 z-[15] h-[42%] [mask-image:linear-gradient(to_bottom,transparent,black_35%)]"
      />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-24 pt-40 md:px-8 md:pb-32">
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl">
          Land you can build a lifetime on.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-100/85 md:text-lg">
          23 years guiding families and investors through Faisalabad&apos;s most
          trusted housing societies — residential, commercial, industrial and
          agricultural.
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
    </section>
  );
}
