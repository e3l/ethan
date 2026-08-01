/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Turbopack infers the workspace root by walking up for lockfiles, so any
  // package-lock.json sitting above the checkout can claim it. Pinning the
  // root keeps the build independent of whatever lives outside this repo.
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
