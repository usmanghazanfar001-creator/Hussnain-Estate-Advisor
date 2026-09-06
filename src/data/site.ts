// Central place for identity/business facts that feed both the Metadata API
// and the JSON-LD structured data. Keeping this separate from `content.ts`
// (which holds page copy) so SEO wiring and editorial content don't tangle.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.hussnainestateadvisor.com";

export const site = {
  name: "Hussnain Estate Advisor",
  shortName: "Hussnain Estate",
  tagline: "Property Consultant in Faisalabad",
  description:
    "Hussnain Estate Advisor — trusted property consultant in Faisalabad with 23 years of experience in residential, commercial, industrial, luxury and agricultural real estate, authorized dealer for Sitara Group housing societies.",
  url: siteUrl,
  locale: "en_PK",
  themeColor: "#101a33",
  contact: {
    phone: "+92 300 7632767",
    phoneE164: "+923007632767",
    email: "Tippualijee777@gmail.com",
    whatsapp: "https://wa.me/923007632767?text=Hello%20I%20want%20property%20details",
    streetAddress: "Main Wadi-e-Sitara Road, Opp. Nimra Textile Mills",
    addressLocality: "Faisalabad",
    addressRegion: "Punjab",
    postalCode: "38000",
    addressCountry: "PK",
    latitude: 31.473639,
    longitude: 73.218306,
    mapEmbed: "https://www.google.com/maps?q=31.473639,73.218306&output=embed",
  },
  social: {
    facebook: "https://www.facebook.com/share/17F7oSv68W/",
    instagram: "https://www.instagram.com/tippu7618?igsh=MXF6ZHVhdmk2OGU0eQ==",
    youtube: "https://youtu.be/VmYNBCD0SsA?si=4MKPNkTNryt7_N-Y",
    whatsapp: "https://wa.me/923007632767?text=Hello%20I%20want%20property%20details",
  },
  founded: {
    yearsOfExperience: 23,
  },
} as const;
