/** @type {import('next').NextConfig} */
const repoName = 'SCPWebWiki'; // <-- Escribe el nombre EXACTO de tu repositorio en GitHub

const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;