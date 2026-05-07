'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';
import type { AnimeCardProps } from '@/types';

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="rounded-full bg-purple-600/80 p-4 backdrop-blur-sm">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>

        {/* Rating */}
        {'rating' in anime && anime.rating && (
          <>
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
              <Star className="h-3 w-3 text-yellow-400" fill="currentColor" />
              <span className="text-xs font-medium text-white">{anime.rating}</span>
            </div>
          </>
        )}

        {/* Dub/Sub badges */}
        {'is_dub' in anime && (
          <>
            <div className="absolute top-2 left-2 flex gap-1">
              {anime.is_dub && anime.is_dub !== '0' && (
                <span className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                  DUB
                </span>
              )}
              {anime.is_sub && anime.is_sub !== '0' && (
                <span className="rounded bg-green-600 px-2 py-1 text-xs font-medium text-white">
                  SUB
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
          {anime.title}
        </h3>

        {/* Additional info */}
        {'type' in anime && anime.type && (
          <p className="mt-1 text-xs text-gray-400">{anime.type}</p>
        )}
        {'duration' in anime && anime.duration && (
          <p className="mt-1 text-xs text-gray-400">{anime.duration}</p>
        )}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}