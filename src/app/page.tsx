import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SocietyReel from "@/components/sections/SocietyReel";
import Properties from "@/components/sections/Properties";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/structured-data/JsonLd";
import { buildRealEstateAgentJsonLd, buildServicesJsonLd } from "@/lib/structured-data";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildRealEstateAgentJsonLd()} />
      <JsonLd data={buildServicesJsonLd()} />

      <Hero />
      <SocietyReel />
      <Properties />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
