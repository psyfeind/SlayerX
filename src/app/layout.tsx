import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KagePlay • Premium Anime Streaming',
  description: 'KagePlay delivers premium anime streaming with neon cyberpunk UI, fast search, watch history, and smart recommendations.',
  keywords: 'anime, streaming, kageplay, anime movies, anime series, watch anime, dark theme',
  authors: [{ name: 'KagePlay Studio' }],
  openGraph: {
    title: 'KagePlay • Premium Anime Streaming',
    description: 'Stream anime, movies, and series with a premium cyberpunk experience.',
    type: 'website',
    siteName: 'KagePlay',
  },
  themeColor: '#0b0a14',
  icons: [
    { rel: 'icon', url: '/favicon.svg' },
    { rel: 'manifest', url: '/manifest.json' },
  ],
  metadataBase: new URL('https://kageplay.example.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <Providers>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(147,51,234,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.2),_transparent_30%),linear-gradient(180deg,_#050505,_#09020f)]">
            <Navbar />
            <main className="pt-16">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
