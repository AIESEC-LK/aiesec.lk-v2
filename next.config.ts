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
    domains: ['aiesec.lk', 'www.logos.aiesec.org', 'aiesec-logos.s3.eu-west-1.amazonaws.com'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;