import { site } from "@/data/site";

/** Schema.org ClothingStore com apenas dados reais informados pela loja. */
export function clothingStoreSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: site.name,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    ...(site.links.instagram || site.links.googleProfile
      ? {
          sameAs: [
            ...(site.links.instagram ? [site.links.instagram] : []),
            ...(site.links.googleProfile ? [site.links.googleProfile] : []),
          ],
        }
      : {}),
  };
}
