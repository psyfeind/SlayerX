'use client';

import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import type { StreamServer } from '@/types';

interface ServerSwitcherProps {
  servers: StreamServer[];
  currentServer?: string;
  onServerChange: (server: string) => void;
}

export function ServerSwitcher({ servers, currentServer, onServerChange }: ServerSwitcherProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Server className="h-4 w-4 text-purple-400" />
        <span className="text-sm font-medium text-white">Servers</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {servers.map((server) => (
          <motion.button
            key={server.server}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
              currentServer === server.server
                ? 'bg-purple-600 text-white border-purple-400'
                : 'bg-white/10 text-gray-300 border-purple-500/20 hover:border-purple-400/40 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onServerChange(server.server)}
          >
            {server.server.replace('options-', 'Server ')}
          </motion.button>
        ))}
      </div>
    </div>
  );
}