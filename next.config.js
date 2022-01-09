const withPWA = require("next-pwa")

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"]
  },
  pwa: {
    dest: "public"
  }
})