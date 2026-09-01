import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: false }];
  },
};

export default nextConfig;
