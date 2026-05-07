'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { anikotoApi } from '@/services/anikoto';
import { AnimeCarousel } from '@/components/AnimeCarousel';
import { HeroBanner } from '@/components/HeroBanner';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const featuredGenres = ['Action', 'Fantasy', 'Sci-Fi', 'Thriller', 'Adventure'];

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { data: recentAnime, isLoading } = useQuery({
    queryKey: ['recent-anime'],
    queryFn: () => anikotoApi.getRecentAnime(1, 24),
  });

  const recentList = recentAnime?.data || [];
  const featuredAnime = recentList.slice(0, 5);
  const latestReleases = recentList.slice(5, 15);
  const trendingAnime = recentList.slice(15, 24);

  return (
    <div className="min-h-screen pb-16">
      <div className="relative overflow-hidden">
        <HeroBanner anime={featuredAnime} />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl animate-float" />
          <div className="absolute right-0 bottom-24 h-72 w-72 rounded-full bg-pink-600/10 blur-3xl animate-float" />
        </div>
      </div>

      <section className="container mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Welcome to KagePlay</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Anime streaming with neon intensity.</h1>
            <p className="max-w-2xl text-gray-400 mt-4">Discover the latest releases, binge top-rated series, and continue watching with smart progress saving.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {featuredGenres.map((genre) => (
              <button
                key={genre}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  selectedGenre === genre ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-200 hover:bg-white/10'
                }`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-14">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-white">Latest Releases</h2>
            <p className="text-gray-400 mt-2">Fresh episodes and new series from both providers.</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <AnimeCarousel anime={latestReleases} />
          )}
        </section>

        <section className="mb-14">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">Trending Now</h2>
                <p className="text-gray-400 mt-2">What the community is watching this week.</p>
              </div>
              <div className="text-sm text-purple-300">Showing top picks</div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <AnimeCarousel anime={trendingAnime} />
          )}
        </section>

        <section className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-purple-900/10 backdrop-blur-xl">
              <h3 className="text-2xl font-semibold text-white">Continue Watching</h3>
              <p className="text-gray-400 mt-2">Resume your latest episodes with watch progress saved locally.</p>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-purple-500/20 bg-black/50 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Last watched</p>
                  <h4 className="mt-3 text-lg font-semibold text-white">Jujutsu Kaisen</h4>
                  <p className="text-gray-400 mt-2">Season 2 • Episode 9 • 38%</p>
                </div>
                <div className="rounded-3xl border border-purple-500/20 bg-black/50 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Next up</p>
                  <h4 className="mt-3 text-lg font-semibold text-white">Solo Leveling</h4>
                  <p className="text-gray-400 mt-2">Season 1 • Episode 5 • 12%</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-2xl shadow-purple-900/10 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Featured</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Top Airing</h3>
            <p className="text-gray-400 mt-3">Bright picks for this season with dub and sub options.</p>
            <div className="mt-7 space-y-4">
              {featuredAnime.slice(0, 3).map((anime) => (
                <div key={anime.id} className="rounded-3xl bg-white/5 p-4 border border-purple-500/10">
                  <p className="text-sm text-gray-400">{anime.type}</p>
                  <h4 className="mt-2 text-lg font-semibold text-white">{anime.title}</h4>
                  <p className="text-sm text-gray-400 mt-2">{anime.duration} • SUB / DUB</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </section>
    </div>
  );
}
