'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimeCarousel } from '@/components/AnimeCarousel';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { aniverseApi } from '@/services/aniverse';

export default function MoviesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: () => aniverseApi.getMovies(1),
  });

  const movies = data?.results || [];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Movies</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Anime movies and films.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Browse curated anime movies, cinematic adventures, and high-stakes finales.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : (
        <AnimeCarousel anime={movies} />
      )}
    </div>
  );
}
