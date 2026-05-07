'use client';

import { ContinueWatchingCard } from '@/components/ContinueWatchingCard';
import { useWatchHistory } from '@/store';

export default function ContinueWatchingPage() {
  const history = useWatchHistory((state) => state.history);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Continue Watching</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Pick up where you left off.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Your playback progress is saved locally so you can resume any time.</p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-black/50 p-14 text-center text-gray-400">No viewing history yet. Start streaming an episode to see it here.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {history.map((item) => (
            <ContinueWatchingCard key={item.anime_id} item={item} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
