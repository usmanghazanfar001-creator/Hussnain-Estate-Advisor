import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // The site is a single, deep-linkable page (all "sections" are anchors
  // on `/`, not separate routes) — see README for why we didn't invent
  // routes like /about or /services that don't exist in the source project.
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
