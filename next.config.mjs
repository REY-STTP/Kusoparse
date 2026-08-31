/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Legacy English and Japanese guide slugs from the first deployment.
      { source: "/en/panduan", destination: "/en/guide", permanent: true },
      { source: "/ja/panduan", destination: "/ja/guide", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
