/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modules: true,
  images: {
    domains: ["arka-vehicle-rental.herokuapp.com"],
  },
};

module.exports = nextConfig;
