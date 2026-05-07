'use client';

import { motion } from 'framer-motion';

interface GenrePillsProps {
  genres: string[];
  selectedGenre?: string;
  onGenreSelect: (genre: string | null) => void;
}

const genreColors = {
  Action: 'bg-red-600/60 hover:bg-red-600/80',
  Adventure: 'bg-green-600/60 hover:bg-green-600/80',
  Comedy: 'bg-yellow-600/60 hover:bg-yellow-600/80',
  Drama: 'bg-blue-600/60 hover:bg-blue-600/80',
  Fantasy: 'bg-purple-600/60 hover:bg-purple-600/80',
  Horror: 'bg-gray-600/60 hover:bg-gray-600/80',
  Romance: 'bg-pink-600/60 hover:bg-pink-600/80',
  'Sci-Fi': 'bg-cyan-600/60 hover:bg-cyan-600/80',
  Thriller: 'bg-orange-600/60 hover:bg-orange-600/80',
  Mystery: 'bg-indigo-600/60 hover:bg-indigo-600/80',
};

export function GenrePills({ genres, selectedGenre, onGenreSelect }: GenrePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
          !selectedGenre
            ? 'bg-purple-600 text-white border-purple-400'
            : 'bg-white/10 text-gray-300 border-purple-500/20 hover:border-purple-400/40 hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onGenreSelect(null)}
      >
        All
      </motion.button>

      {genres.map((genre) => (
        <motion.button
          key={genre}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
            selectedGenre === genre
              ? 'bg-purple-600 text-white border-purple-400'
              : `${genreColors[genre as keyof typeof genreColors] || 'bg-gray-600/60 hover:bg-gray-600/80'} text-white border-transparent`
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGenreSelect(genre)}
        >
          {genre}
        </motion.button>
      ))}
    </div>
  );
}