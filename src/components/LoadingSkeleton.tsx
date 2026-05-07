'use client';

import { motion } from 'framer-motion';

export function LoadingSkeleton() {
  return (
    <motion.div
      className="rounded-2xl bg-gradient-to-br from-purple-900/20 to-black/40 border border-purple-500/20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="aspect-[3/4] bg-gray-800 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-800 rounded animate-pulse" />
        <div className="h-3 bg-gray-800 rounded animate-pulse w-3/4" />
      </div>
    </motion.div>
  );
}