'use client';

import Link from 'next/link';
import { AnimeCard } from '@/components/AnimeCard';
import { useFavorites } from '@/store';

export default function WatchlistPage() {
  const favorites = useFavorites((state) => state.favorites);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Watchlist</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Your favorites queue.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Saved anime and series you want to watch next.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-black/50 p-14 text-center text-gray-400">Your watchlist is empty. Add favorites while browsing anime.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((anime) => (
            <Link key={anime.anime_id} href={`/anime/${anime.anime_id}`}>
              <AnimeCard anime={anime as any} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
