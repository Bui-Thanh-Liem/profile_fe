/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailingSlash: true,
  // Thêm cấu hình này
  async rewrites() {
    return [
      {
        source: "/storage/back-end",
        destination: "/storage/back-end/",
      },
    ];
  },
};

export default nextConfig;
