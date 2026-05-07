'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimeCarousel } from '@/components/AnimeCarousel';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { anikotoApi } from '@/services/anikoto';

export default function TrendingPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['trending'],
    queryFn: () => anikotoApi.getRecentAnime(1, 24),
  });

  const trending = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Trending</p>
        <h1 className="mt-3 text-4xl font-bold text-white">What’s hot right now.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">The most watched anime and fresh premieres in the KagePlay universe.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : (
        <AnimeCarousel anime={trending} />
      )}
    </div>
  );
}
