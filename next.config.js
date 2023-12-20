/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   // {
    //   //   protocol: "https",
    //   //   hostname: "xsgames.co",
    //   //   port: "",
    //   //   pathname: "/randomusers/**",
    //   // },
    // ],
    domains: ["xsgames.co", "res.cloudinary.com"],
  },
};

module.exports = nextConfig
