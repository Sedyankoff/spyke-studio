import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { brandAssets, siteConfig } from "@/content/site";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.person.givenName} ${siteConfig.person.familyName}`;

const LOGO_HEIGHT = 64;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = getDictionary(isLocale(locale) ? locale : "bg");

  const logo = brandAssets.logoPaper;
  const logoData = await readFile(join(process.cwd(), "public", logo.src));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0a09",
        padding: 76,
        color: "#f5f2ec",
        fontFamily: "sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>; next/image cannot run here. */}
      <img
        src={logoSrc}
        alt=""
        width={Math.round((logo.width / logo.height) * LOGO_HEIGHT)}
        height={LOGO_HEIGHT}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.04,
            maxWidth: 980,
          }}
        >
          {dictionary.hero.statement}
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 32,
            color: "rgba(245,242,236,0.72)",
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
          borderTop: "2px solid #f40618",
          paddingTop: 26,
          fontSize: 22,
          color: "rgba(245,242,236,0.6)",
        }}
      >
        <div style={{ display: "flex" }}>C#/.NET · React · TypeScript</div>
        <div style={{ display: "flex" }}>{new URL(siteConfig.url).host}</div>
      </div>
    </div>,
    size,
  );
}
