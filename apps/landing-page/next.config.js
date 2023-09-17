module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  images: {
    domains: [
      "images.unsplash.com",
      "cdn-icons-png.flaticon.com",
      "c5.patreon.com",
    ],
    formats: ["image/webp"],
  },
};
