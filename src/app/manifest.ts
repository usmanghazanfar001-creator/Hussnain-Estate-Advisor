import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf6",
    theme_color: site.themeColor,
    icons: [
      {
        src: "/logo.png",
        sizes: "819x819",
        type: "image/png",
      },
    ],
  };
}
