/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  ...(isDev && {
    // Désactiver le cache en développement
    headers: async () => [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ],
  }),
};
