import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // Every root layout lives under [locale]; unmatched URLs get
    // app/global-not-found.tsx instead of the framework's default page.
    globalNotFound: true,
  },
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: false }];
  },
};

export default nextConfig;
