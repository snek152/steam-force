const withPWA = require("next-pwa")
const withBundle = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

module.exports = withBundle(withPWA(config))
