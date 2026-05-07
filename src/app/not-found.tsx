'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-40 text-center">
      <h1 className="text-6xl font-black text-white">404</h1>
      <p className="mt-4 text-gray-400">Page not found. The anime gate is closed.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-purple-600 px-8 py-3 text-white hover:bg-purple-500 transition">Return Home</Link>
    </div>
  );
}
