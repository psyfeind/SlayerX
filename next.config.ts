import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.anime-planet.com',
      'img.anime-planet.com',
      's4.anilist.co',
      'cdn.myanimelist.net',
      'artworks.thetvdb.com',
      'image.tmdb.org',
      'posteritati.com',
      'www.themoviedb.org',
      'themoviedb.org',
      'megaplay.buzz',
      'aniverseapi.vercel.app',
      'anikotoapi.site',
      // Add more domains as needed
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;