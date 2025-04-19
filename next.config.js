/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com", "lh3.googleusercontent.com"], // ✅ بدون "https://"
  },
};

module.exports = nextConfig;
