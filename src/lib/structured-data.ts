import { site } from "@/data/site";

/**
 * RealEstateAgent (a LocalBusiness subtype) — the most accurate schema.org
 * type for a property consultancy with a physical office and a defined
 * service area. Deliberately omits `aggregateRating`/`review` — the site
 * has text testimonials but no star-rating data, and fabricating a rating
 * would violate Google's structured-data guidelines.
 */
export function buildRealEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    image: `${site.url}/logo.png`,
    priceRange: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.streetAddress,
      addressLocality: site.contact.addressLocality,
      addressRegion: site.contact.addressRegion,
      postalCode: site.contact.postalCode,
      addressCountry: site.contact.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.latitude,
      longitude: site.contact.longitude,
    },
    areaServed: {
      "@type": "City",
      name: "Faisalabad",
    },
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
    foundingDate: `${new Date().getFullYear() - site.founded.yearsOfExperience}`,
  };
}

/** WebSite — identifies the site itself (used by Google for sitelinks search box eligibility, etc.). */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-PK",
  };
}

/** Organization — the legal/brand entity behind the site, distinct from the WebSite node. */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phoneE164,
      email: site.contact.email,
      contactType: "customer service",
      areaServed: "PK",
    },
  };
}

/**
 * Service list — the distinct property categories the agency deals in.
 * Modeled as `Service` offerings of the RealEstateAgent, which is a more
 * accurate fit than pretending each is a separate Product/Offer.
 */
export function buildServicesJsonLd() {
  const services = [
    "Residential plots and homes",
    "Commercial property",
    "Industrial land",
    "Luxury villas",
    "Agricultural land",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((name, i) => ({
      "@type": "Service",
      position: i + 1,
      name,
      provider: { "@id": `${site.url}/#business` },
      areaServed: "Faisalabad, Pakistan",
    })),
  };
}
