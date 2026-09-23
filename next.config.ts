import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Optimize bundle size
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "aiesec.lk" },
      { protocol: "https", hostname: "www.logos.aiesec.org" },
      { protocol: "https", hostname: "aiesec-logos.s3.eu-west-1.amazonaws.com" },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
