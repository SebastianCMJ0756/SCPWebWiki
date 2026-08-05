/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
    basePath: '/SCPWebWiki',
};

module.exports = nextConfig;