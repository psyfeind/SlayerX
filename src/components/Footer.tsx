import Link from 'next/link';
import { GitFork, Mail, Play } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black to-purple-900/20 border-t border-purple-500/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">ZenithAnime</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for premium anime streaming with the best quality and experience.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Play className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <GitFork className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/anime" className="text-gray-400 hover:text-white transition-colors">Anime</Link></li>
              <li><Link href="/movies" className="text-gray-400 hover:text-white transition-colors">Movies</Link></li>
              <li><Link href="/series" className="text-gray-400 hover:text-white transition-colors">Series</Link></li>
              <li><Link href="/trending" className="text-gray-400 hover:text-white transition-colors">Trending</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/watchlist" className="text-gray-400 hover:text-white transition-colors">Watchlist</Link></li>
              <li><Link href="/history" className="text-gray-400 hover:text-white transition-colors">History</Link></li>
              <li><Link href="/settings" className="text-gray-400 hover:text-white transition-colors">Settings</Link></li>
              <li><Link href="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 ZenithAnime. All rights reserved. Not affiliated with any anime studios.</p>
        </div>
      </div>
    </footer>
  );
}