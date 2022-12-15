/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com'
    ]
  },

  redirects: async () => {
    return [
      {
        source: '/([^api/]+)',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
