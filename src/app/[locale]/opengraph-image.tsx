import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { siteConfig } from "@/content/site";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.person.givenName} ${siteConfig.person.familyName}`;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = getDictionary(isLocale(locale) ? locale : "bg");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f2ec",
          padding: 76,
          color: "#1b1917",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#dc3b33",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#6f6759",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.02,
              maxWidth: 960,
            }}
          >
            {dictionary.hero.statement}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 32,
              color: "#4d473e",
            }}
          >
            {`${dictionary.about.name} — ${dictionary.about.role}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(27,25,23,0.14)",
            paddingTop: 26,
            fontSize: 22,
            color: "#6f6759",
          }}
        >
          <div style={{ display: "flex" }}>
            TypeScript · .NET · Go · Azure
          </div>
          <div style={{ display: "flex" }}>spyke.studio</div>
        </div>
      </div>
    ),
    size,
  );
}
