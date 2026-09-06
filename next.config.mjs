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
    // Disengaja terbuka: cover anime berasal dari hasil scrape artikel
    // Kusonime (og:image / .post-thumb) yang host-nya arbitrer dan baru
    // diketahui saat runtime. Allowlist statis akan merusak gambar.
    // Jika suatu saat cover di-proxy sendiri, ganti dengan allowlist eksplisit.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
