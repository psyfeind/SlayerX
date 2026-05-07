'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, Menu, Moon, Search, Sun, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/store';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/movies', label: 'Movies' },
  { href: '/series', label: 'Series' },
  { href: '/trending', label: 'Trending' },
  { href: '/schedule', label: 'Schedule' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-purple-500/10 bg-black/75 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-lg font-bold shadow-lg shadow-purple-500/20">K</span>
          <div className="hidden sm:block">
            <p className="font-bold">KagePlay</p>
            <p className="text-xs text-gray-400">Premium anime service</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm text-gray-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" onClick={toggleTheme}>
            {settings.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-gray-300 hover:text-white">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-purple-500/10 bg-black/90 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition">
                {item.label}
              </Link>
            ))}
            <Link href="/watchlist" className="rounded-2xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition">Watchlist</Link>
            <Link href="/continue-watching" className="rounded-2xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition">Continue Watching</Link>
          </div>
        </div>
      )}
    </header>
  );
}
