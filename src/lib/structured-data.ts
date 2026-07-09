import { siteConfig, socialLinks } from "@/constants/site";

export function buildStructuredData() {
  const personId = `${siteConfig.url}/#person`;
  const organizationId = `${siteConfig.url}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.author.name,
        jobTitle: siteConfig.author.role,
        email: `mailto:${siteConfig.author.email}`,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/portrait.jpg`,
        worksFor: { "@id": organizationId },
        address: {
          "@type": "PostalAddress",
          addressCountry: "BG",
        },
        sameAs: socialLinks
          .filter((link) => link.platform !== "email")
          .map((link) => link.href),
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/icons/icon-512.png`,
        founder: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": organizationId },
        inLanguage: "en",
      },
    ],
  };
}
