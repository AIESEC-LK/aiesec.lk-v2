/** @type {import('next').NextConfig} */
const nextConfig = {
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
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;