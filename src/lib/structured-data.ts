import type { Dictionary } from "@/content/dictionary";
import { siteConfig, socialLinks } from "@/content/site";
import { stackGroups } from "@/content/stack";
import { htmlLang, type Locale } from "@/i18n/config";

export function buildStructuredData(locale: Locale, dictionary: Dictionary) {
  const personId = `${siteConfig.url}/#person`;
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
        telephone: siteConfig.phone.display,
        url: `${siteConfig.url}/${locale}`,
        knowsAbout: stackGroups.flatMap((group) =>
          group.technologies.map((technology) => technology.name),
        ),
        worksFor: {
          "@type": "Organization",
          name: dictionary.experience.entries.orak.company,
        },
        // Currently enrolled — an affiliation, not (yet) an alumnus.
        affiliation: {
          "@type": "CollegeOrUniversity",
          name:
            locale === "bg"
              ? "Пловдивски университет „Паисий Хилендарски“"
              : "Plovdiv University “Paisii Hilendarski”",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: locale === "bg" ? "Пловдив" : "Plovdiv",
          addressCountry: "BG",
        },
        sameAs: socialLinks
          .filter((link) => link.platform !== "email" && link.href)
          .map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: dictionary.meta.description,
        author: { "@id": personId },
        inLanguage: htmlLang[locale],
      },
    ],
  };
}
