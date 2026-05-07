'use client';

import { useSettings } from '@/store';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Settings</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Customize your KagePlay experience.</h1>
        <p className="max-w-2xl text-gray-400 mt-3">Adjust playback behavior, theme preferences and more.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Display</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
              <div>
                <p className="text-sm text-gray-400">Theme</p>
                <p className="text-sm text-white">{settings.theme}</p>
              </div>
              <Button onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}>
                Toggle theme
              </Button>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-gray-400">Auto-next</p>
              <Button onClick={() => updateSettings({ autoNext: !settings.autoNext })}>
                {settings.autoNext ? 'Disable' : 'Enable'} auto-next
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/50 p-8 shadow-xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Playback</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-gray-400">Auto-play</p>
              <Button onClick={() => updateSettings({ autoPlay: !settings.autoPlay })}>
                {settings.autoPlay ? 'Disable' : 'Enable'} auto-play
              </Button>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-gray-400">Quality</p>
              <Button onClick={() => updateSettings({ quality: settings.quality === 'auto' ? '1080p' : 'auto' })}>
                Use {settings.quality === 'auto' ? '1080p' : 'auto'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
