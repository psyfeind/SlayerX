'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimeCarousel } from '@/components/AnimeCarousel';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { anikotoApi } from '@/services/anikoto';

export default function TopAiringPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['top-airing'],
    queryFn: () => anikotoApi.getRecentAnime(1, 24),
  });

  const airing = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Top Airing</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Season’s hottest anime.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Track the top airing shows with the latest episode drops and fan buzz.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : (
        <AnimeCarousel anime={airing} />
      )}
    </div>
  );
}
