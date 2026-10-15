import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // 90 is for the project screenshots, logos and the portrait.
    qualities: [75, 90],
    // WebP only. Next encodes AVIF at 5/8 of the requested quality (90 → 56),
    // which smears the small UI text and texture in the screenshots — they
    // are already lossy WebP, so it is a second, heavier generation of loss.
    formats: ["image/webp"],
  },
  async redirects() {
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: false }];
  },
};

export default nextConfig;
