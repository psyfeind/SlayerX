'use client';

import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 to-pink-500 text-3xl font-bold text-white">A</div>
            <div>
              <h1 className="text-3xl font-semibold text-white">Akira</h1>
              <p className="text-gray-400 mt-2">Premium member • Anime fanatic</p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-gray-400">Profile</p>
              <p className="text-white mt-2">akira@kageplay.example</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-gray-400">Subscription</p>
              <p className="text-white mt-2">KagePlay Premium</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-xl backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Activity</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-5">
              <p className="text-sm text-gray-400">Recently played</p>
              <p className="mt-2 text-white">Demon Slayer • Episode 12</p>
            </div>
            <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-5">
              <p className="text-sm text-gray-400">Watchlist</p>
              <p className="mt-2 text-white">7 saved titles</p>
            </div>
            <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-5">
              <p className="text-sm text-gray-400">Continue watching</p>
              <p className="mt-2 text-white">3 shows in progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
