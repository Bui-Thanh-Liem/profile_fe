/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "liemdev.info.vn",
        port: "9000",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
