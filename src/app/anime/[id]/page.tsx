'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EpisodeList } from '@/components/EpisodeList';
import { GenrePills } from '@/components/GenrePills';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { aniverseApi } from '@/services/aniverse';

export default function AnimeDetailPage(props: any) {
  const { id } = props.params;
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: info, isLoading: infoLoading } = useQuery({
    queryKey: ['anime-info', id],
    queryFn: () => aniverseApi.getInfo(id),
    enabled: !!id,
  });

  const { data: episodes, isLoading: episodesLoading } = useQuery({
    queryKey: ['anime-episodes', id, selectedSeason],
    queryFn: () => aniverseApi.getEpisodes(id, selectedSeason),
    enabled: !!id,
  });

  const episodeList = episodes?.episodes || [];

  return (
    <div className="container mx-auto px-4 py-20">
      {infoLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(320px,420px)_1fr]">
            <div className="rounded-3xl overflow-hidden border border-purple-500/10 bg-white/5">
              <img src={info?.poster} alt={info?.title} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-purple-300">{info?.year} • {info?.language} • {info?.quality}</p>
                <h1 className="text-4xl font-bold text-white">{info?.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {info?.genres?.map((genre) => (
                    <Link key={genre} href={`/genre/${genre.toLowerCase()}`} className="rounded-full bg-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/15 transition">
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{info?.overview}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-gray-400">Rating</p>
                  <p className="mt-2 text-white">{info?.rating}/10</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-gray-400">Episodes</p>
                  <p className="mt-2 text-white">{info?.episodes}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button className="rounded-3xl bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-500">Watch Now</button>
                <button className="rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-white transition hover:bg-white/10">Add to Watchlist</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Episodes</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Season {selectedSeason}</h2>
              </div>
              <div className="flex gap-3">
                {Array.from({ length: info?.seasons || 3 }).map((_, index) => (
                  <button
                    key={index}
                    className={`rounded-2xl px-4 py-2 text-sm transition ${
                      selectedSeason === index + 1 ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedSeason(index + 1)}
                  >
                    S{index + 1}
                  </button>
                ))}
              </div>
            </div>
            {episodesLoading ? (
              <LoadingSkeleton />
            ) : (
              <EpisodeList episodes={episodeList} currentEpisode={selectedEpisode} onEpisodeClick={(episode) => setSelectedEpisode(episode.episode)} />
            )}
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="space-y-5">
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Recommendations</p>
              <p className="mt-3 text-white">More titles selected for your watchlist and taste.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Details</p>
              <div className="mt-4 space-y-3 text-gray-300">
                <p>Quality: {info?.quality}</p>
                <p>Runtime: {info?.runningTime}</p>
                <p>Language: {info?.language}</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Genres</p>
              <GenrePills genres={info?.genres || []} selectedGenre={undefined} onGenreSelect={() => {}} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
