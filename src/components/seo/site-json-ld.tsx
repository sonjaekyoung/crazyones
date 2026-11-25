import { NEWSLETTER_URL, SITE } from "@/config/site";

const organizationId = `${SITE.url}/#organization`;
const websiteId = `${SITE.url}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE.name,
      alternateName: [SITE.alternateName, "Crazy Ones"],
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}${SITE.logo}`,
        width: 400,
        height: 400,
      },
      image: `${SITE.url}${SITE.logo}`,
      description: SITE.description,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: SITE.email,
        contactType: "inquiries",
        availableLanguage: ["Korean", "English"],
      },
      sameAs: [NEWSLETTER_URL],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE.name,
      alternateName: SITE.alternateName,
      url: SITE.url,
      description: SITE.description,
      inLanguage: ["ko-KR", "en-US"],
      publisher: { "@id": organizationId },
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
