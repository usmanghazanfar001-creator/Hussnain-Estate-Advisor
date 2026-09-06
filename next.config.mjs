/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Modern image formats + responsive sizes are handled automatically by
  // next/image. We only need to declare remote patterns if we ever load
  // images from an external host (the map embed is an <iframe>, not an
  // <img>, so nothing external is required here today).
  images: {
    formats: ["image/avif", "image/webp"],
  },

  eslint: {
    // Lint is run separately in CI (`npm run lint`); don't block builds on it.
    ignoreDuringBuilds: false,
  },

  async headers() {
    return [
      {
        // Long-cache the build's static assets; HTML/pages are revalidated
        // by Next.js itself.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
