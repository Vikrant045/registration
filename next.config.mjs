// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com", // Allowing Imgur
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig; // Use export default instead of module.exports
