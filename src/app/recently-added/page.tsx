'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimeCarousel } from '@/components/AnimeCarousel';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { aniverseApi } from '@/services/aniverse';

export default function RecentlyAddedPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['recently-added'],
    queryFn: () => aniverseApi.getNewAdded(),
  });

  const added = data?.results || [];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Recently Added</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Fresh arrivals.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Catch the newest anime added to KagePlay with instant streaming and watchlist support.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : (
        <AnimeCarousel anime={added} />
      )}
    </div>
  );
}
