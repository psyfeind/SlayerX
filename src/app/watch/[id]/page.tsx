'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { aniverseApi } from '@/services/aniverse';
import { anikotoApi, buildAnikotoStreamUrl } from '@/services/anikoto';
import { EpisodeList } from '@/components/EpisodeList';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer').then((mod) => mod.VideoPlayer), { ssr: false });

export default function WatchPage(props: any) {
  const { id } = props.params;
  const [season] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [provider, setProvider] = useState<'aniverse' | 'anikoto'>('aniverse');
  const [streamType, setStreamType] = useState<'sub' | 'dub'>('sub');

  const { data: info, isLoading: infoLoading } = useQuery({
    queryKey: ['watch-info', id],
    queryFn: () => aniverseApi.getInfo(id),
    enabled: !!id,
  });

  const { data: episodesData, isLoading: epsLoading } = useQuery({
    queryKey: ['watch-episodes', id, season],
    queryFn: () => aniverseApi.getEpisodes(id, season),
    enabled: !!id,
  });

  const { data: streamData, isLoading: streamLoading } = useQuery({
    queryKey: ['watch-stream', id, season, episode, provider, streamType],
    queryFn: async () => {
      if (provider === 'aniverse') {
        const response = await aniverseApi.getStream(id, season, episode);
        return response.results?.[0]?.embed || '';
      }

      const anikotoSeries = await anikotoApi.getSeries(id);
      const episodeEmbed = anikotoSeries.data.episodes.find((item) => item.number === episode)?.episode_embed_id;
      return episodeEmbed ? buildAnikotoStreamUrl(episodeEmbed, streamType) : '';
    },
    enabled: !!id,
  });

  const streamSource = useMemo(() => streamData || '', [streamData]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid gap-8 lg:grid-cols-[2.5fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Now Playing</p>
                <h1 className="mt-3 text-3xl font-bold text-white">{info?.title || 'Loading...'}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button
                  className={`rounded-2xl px-4 py-2 text-sm ${provider === 'aniverse' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}
                  onClick={() => setProvider('aniverse')}
                >
                  Aniverse
                </button>
                <button
                  className={`rounded-2xl px-4 py-2 text-sm ${provider === 'anikoto' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}
                  onClick={() => setProvider('anikoto')}
                >
                  Anikoto
                </button>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-black">
              {streamLoading ? (
                <div className="flex h-96 items-center justify-center bg-gray-900 text-gray-400">Loading stream...</div>
              ) : (
                <VideoPlayer src={streamSource || 'https://www.youtube.com/embed/dQw4w9WgXcQ'} title={info?.title || 'KagePlay Stream'} autoNext />
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                className={`rounded-2xl px-4 py-2 text-sm ${streamType === 'sub' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}
                onClick={() => setStreamType('sub')}
              >
                Sub
              </button>
              <button
                className={`rounded-2xl px-4 py-2 text-sm ${streamType === 'dub' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}
                onClick={() => setStreamType('dub')}
              >
                Dub
              </button>
            </div>
            <div className="rounded-3xl bg-white/5 p-5 text-gray-300">
              <p className="text-sm">Auto-next, skip intro, and streamlined navigation are enabled for the best streaming flow.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Episode Guide</h2>
            {epsLoading ? <LoadingSkeleton /> : <EpisodeList episodes={episodesData?.episodes || []} currentEpisode={episode} onEpisodeClick={(ep) => setEpisode(ep.episode)} />}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Details</h2>
            <div className="mt-4 space-y-3 text-gray-300">
              <p>Provider: {provider}</p>
              <p>Season: {season}</p>
              <p>Episode: {episode}</p>
              <p>Type: {streamType === 'sub' ? 'Subtitled' : 'Dubbed'}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Share</h2>
            <p className="mt-4 text-gray-400">Share this stream link with friends or save it for your next watch party.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
