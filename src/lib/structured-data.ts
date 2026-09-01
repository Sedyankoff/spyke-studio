import type { Dictionary } from "@/content/dictionary";
import { educationEntries } from "@/content/cv";
import { siteConfig, socialLinks } from "@/content/site";
import { stackGroups } from "@/content/stack";
import { htmlLang, type Locale } from "@/i18n/config";

export function buildStructuredData(locale: Locale, dictionary: Dictionary) {
  const personId = `${siteConfig.url}/#person`;
  const organizationId = `${siteConfig.url}/#organization`;
  const fullName = `${siteConfig.person.givenName} ${siteConfig.person.familyName}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: dictionary.about.name,
        alternateName: fullName,
        givenName: siteConfig.person.givenName,
        familyName: siteConfig.person.familyName,
        jobTitle: dictionary.about.role,
        email: `mailto:${siteConfig.email}`,
        url: `${siteConfig.url}/${locale}`,
        knowsAbout: stackGroups.flatMap((group) =>
          group.technologies.map((technology) => technology.name),
        ),
        alumniOf: educationEntries.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: dictionary.education.entries[entry.id].institution,
        })),
        worksFor: { "@id": organizationId },
        address: { "@type": "PostalAddress", addressCountry: "BG" },
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
        foundingDate: "2024",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: dictionary.meta.description,
        publisher: { "@id": organizationId },
        inLanguage: htmlLang[locale],
      },
    ],
  };
}
