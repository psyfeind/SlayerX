'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Clock } from 'lucide-react';
import type { Episode } from '@/types';

interface EpisodeListProps {
  episodes: Episode[];
  currentEpisode?: number;
  onEpisodeClick: (episode: Episode) => void;
}

export function EpisodeList({ episodes, currentEpisode, onEpisodeClick }: EpisodeListProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-white mb-4">Episodes</h3>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {episodes.map((episode, index) => (
          <motion.div
            key={`${episode.season}-${episode.episode}`}
            className={`group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/20 to-black/40 backdrop-blur-sm border transition-all duration-300 ${
              currentEpisode === episode.episode
                ? 'border-purple-400/60 bg-purple-900/30'
                : 'border-purple-500/20 hover:border-purple-400/40'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEpisodeClick(episode)}
          >
            <div className="flex items-center gap-3 p-3">
              <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={episode.poster}
                  alt={episode.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="96px"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" fill="white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate group-hover:text-purple-300 transition-colors">
                  Episode {episode.episode}: {episode.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">24m</span>
                </div>
              </div>

              {currentEpisode === episode.episode && (
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}