const withPWA = require("next-pwa")
// const withBundle = require("@next/bundle-analyzer")

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"]
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === 'development'
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
})