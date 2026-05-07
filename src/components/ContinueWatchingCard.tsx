'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Clock } from 'lucide-react';
import type { WatchHistoryItem } from '@/types';

interface ContinueWatchingCardProps {
  item: WatchHistoryItem;
  onClick: () => void;
}

export function ContinueWatchingCard({ item, onClick }: ContinueWatchingCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="aspect-video relative">
        <Image
          src={item.poster}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${item.progress}%` }}
          />
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="rounded-full bg-purple-600/80 p-4 backdrop-blur-sm">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>

        {/* Continue watching badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-purple-600/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
            Continue
          </span>
        </div>

        {/* Episode info */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-between text-white text-sm">
            <span className="font-medium truncate">{item.title}</span>
            <div className="flex items-center gap-1 text-xs text-gray-300">
              <Clock className="h-3 w-3" />
              <span>S{item.season}E{item.episode}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}