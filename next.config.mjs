/** @type {import('next').NextConfig} */
console.log("--- NEXT CONFIG LOADED ---");

const nextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "broadwayinfosys.com",
        pathname: "/uploads/**",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
