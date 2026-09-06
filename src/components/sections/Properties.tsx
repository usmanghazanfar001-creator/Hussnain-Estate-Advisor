"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { properties, propertyFilters, type PropertyFilter } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function Properties() {
  const [active, setActive] = useState<PropertyFilter>("All");

  const filtered = useMemo(
    () => (active === "All" ? properties : properties.filter((p) => p.type === active)),
    [active]
  );

  return (
    <section id="properties" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold-600">
            Portfolio
          </p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
            Featured properties
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter properties by type">
          {propertyFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === f
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-900/15 text-ink-700 hover:border-ink-900/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.title + i} delay={Math.min(i, 5) * 0.06}>
              <TiltCard className="group relative overflow-hidden rounded-2xl bg-ink-900 shadow-soft">
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800">
                  {p.type}
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-sand-100/80">{p.location}</p>
                  <p className="mt-1 text-sm font-semibold text-gold-400">{p.price}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
