'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TrendingUp, Play } from 'lucide-react';
import type { AnikotoAnime } from '@/types';

interface TrendingSidebarProps {
  trending: AnikotoAnime[];
  onAnimeClick: (anime: AnikotoAnime) => void;
}

export function TrendingSidebar({ trending, onAnimeClick }: TrendingSidebarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Trending Now</h3>
      </div>

      <div className="space-y-3">
        {trending.slice(0, 10).map((anime, index) => (
          <motion.div
            key={anime.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => onAnimeClick(anime)}
          >
            <div className="flex items-center gap-3 p-3">
              <div className="relative">
                <span className="absolute -top-1 -left-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="relative h-12 w-12 overflow-hidden rounded">
                  <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="48px"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate text-sm group-hover:text-purple-300 transition-colors">
                  {anime.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{anime.type}</span>
                  <div className="flex gap-1">
                    {anime.is_sub && anime.is_sub !== '0' && (
                      <span className="text-xs bg-green-600/60 px-1 py-0.5 rounded text-white">SUB</span>
                    )}
                    {anime.is_dub && anime.is_dub !== '0' && (
                      <span className="text-xs bg-blue-600/60 px-1 py-0.5 rounded text-white">DUB</span>
                    )}
                  </div>
                </div>
              </div>

              <Play className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}