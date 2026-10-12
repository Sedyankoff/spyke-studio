import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // 90 is for the project screenshots only (components/work/screen-sizes.ts).
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: false }];
  },
};

export default nextConfig;
