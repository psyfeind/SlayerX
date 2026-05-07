'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onNext?: () => void;
  onPrev?: () => void;
  autoNext?: boolean;
  title?: string;
}

export function VideoPlayer({ src, poster, onNext, onPrev, autoNext, title }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // For iframe embeds, we can't control playback directly
  // This is a simplified player overlay
  // In a real implementation, you'd use a proper video player library

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">
      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-full"
        allowFullScreen
        allow="autoplay; encrypted-media"
        title={title}
      />

      {/* Custom Controls Overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              disabled={!onPrev}
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" fill="white" />}
            </button>

            <button
              onClick={onNext}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              disabled={!onNext}
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 1)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              {volume > 0 ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress bar placeholder */}
        <div className="mt-2">
          <div className="w-full bg-white/20 rounded-full h-1">
            <div className="bg-purple-500 h-1 rounded-full w-1/3" />
          </div>
        </div>
      </motion.div>

      {/* Auto-next indicator */}
      {autoNext && (
        <motion.div
          className="absolute top-4 right-4 bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          Auto-next enabled
        </motion.div>
      )}
    </div>
  );
}