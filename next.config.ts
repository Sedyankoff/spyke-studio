import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // 90 is for the project screenshots, logos, the portrait and the hero
    // sculpture.
    qualities: [75, 90],
    // WebP only. Next encodes AVIF at 5/8 of the requested quality (90 → 56),
    // which smears the small UI text and texture in the screenshots — they
    // are already lossy WebP, so it is a second, heavier generation of loss.
    formats: ["image/webp"],
    // The defaults plus 1440. A 2× display with the monitor 623–720px wide
    // (a 1440–1728px window) otherwise jumps from 1200 to 1920: about 40%
    // more bytes for each project screenshot, for pixels it cannot show.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
  },
  async redirects() {
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: false }];
  },
};

export default nextConfig;
