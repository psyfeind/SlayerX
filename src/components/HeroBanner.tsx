'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AnikotoAnime } from '@/types';

interface HeroBannerProps {
  anime: AnikotoAnime[];
}

export function HeroBanner({ anime }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (anime.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % anime.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [anime.length]);

  if (anime.length === 0) return null;

  const currentAnime = anime[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % anime.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + anime.length) % anime.length);
  };

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={currentAnime.poster}
            alt={currentAnime.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
        <div className="max-w-2xl">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentAnime.title}
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-lg text-gray-300">{currentAnime.type}</span>
            <span className="text-lg text-gray-300">•</span>
            <span className="text-lg text-gray-300">{currentAnime.duration}</span>
            {currentAnime.is_dub && currentAnime.is_dub !== '0' && (
              <>
                <span className="text-lg text-gray-300">•</span>
                <span className="bg-blue-600 px-3 py-1 rounded text-sm font-medium">DUB</span>
              </>
            )}
            {currentAnime.is_sub && currentAnime.is_sub !== '0' && (
              <>
                <span className="text-lg text-gray-300">•</span>
                <span className="bg-green-600 px-3 py-1 rounded text-sm font-medium">SUB</span>
              </>
            )}
          </motion.div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold"
            >
              <Play className="h-5 w-5 mr-2" fill="white" />
              Watch Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold"
            >
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {anime.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-purple-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}