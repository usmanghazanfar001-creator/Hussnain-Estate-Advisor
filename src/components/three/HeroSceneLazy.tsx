"use client";

import dynamic from "next/dynamic";

// `ssr:false` is only permitted inside a Client Component boundary, which is
// why this thin wrapper exists — it lets the server-rendered <Hero> stay a
// plain Server Component while still keeping the entire three.js/R3F chunk
// out of both the server bundle and the initial client bundle.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default HeroScene;
