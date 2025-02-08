/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Si tu utilises des images locales sans un backend
  },
};

module.exports = nextConfig;


// output: 'export' est utile pour un déploiement sans backend.
// trailingSlash: true permet d'éviter certains problèmes de navigation.
// images.unoptimized: true est utile si tu utilises next/image mais sans backend.