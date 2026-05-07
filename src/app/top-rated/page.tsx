'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimeCarousel } from '@/components/AnimeCarousel';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { anikotoApi } from '@/services/anikoto';

export default function TopRatedPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['top-rated'],
    queryFn: () => anikotoApi.getRecentAnime(1, 24),
  });

  const rated = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Top Rated</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Critically acclaimed anime.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Curated high-score series and fan favorites for premium binge sessions.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : (
        <AnimeCarousel anime={rated} />
      )}
    </div>
  );
}
