'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '@/components/SearchBar';
import { AnimeCard } from '@/components/AnimeCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { aniverseApi } from '@/services/aniverse';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['search', query],
    queryFn: () => aniverseApi.search(query, 1),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 2,
  });

  const results = data?.results?.results || [];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Search</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Find your next anime obsession.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Search KagePlay’s library across providers with fast filtering and smart suggestions.</p>
      </div>

      <div className="mb-10">
        <SearchBar onSearch={setQuery} placeholder="Search anime, movies, genres..." />
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      )}

      {!query && (
        <div className="rounded-3xl border border-white/10 bg-black/50 p-10 text-center text-gray-400">Start typing to search anime from Aniverse and Anikoto.</div>
      )}

      {query && !isLoading && results.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-black/50 p-10 text-center text-gray-400">No anime found for “{query}”. Try another title.</div>
      )}

      {isSuccess && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((anime) => (
            <Link key={anime.anime_id} href={`/anime/${anime.anime_id}`}>
              <AnimeCard anime={anime} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
