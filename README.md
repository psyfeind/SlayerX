# KagePlay

KagePlay is a premium anime streaming UI built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Zustand, Axios, and React Query. The app blends Netflix-style cinematic UX with cyberpunk anime design and modern streaming features.

## Features

- Dark purple / neon cyberpunk aesthetic
- Responsive mobile-first design
- Hero slider with featured anime
- Search experience with live query behavior
- Anime details, watch page, episodes, and provider switching
- Continue watching and watchlist persistence with Zustand + localStorage
- Dual provider support: Aniverse + Anikoto
- Skeleton loading states
- Smooth motion animations
- Glassmorphism layout cards
- PWA-ready manifest and install prompt assets
- Dynamic metadata and SEO-friendly pages
- Custom theme toggle and profile UI

## Project Structure

- `src/app/` — App Router pages and route layout
- `src/components/` — Reusable UI components
- `src/hooks/` — Data and UI hooks
- `src/services/` — Axios API service layer
- `src/store/` — Zustand persistence stores
- `src/types/` — TypeScript API and UI types
- `src/lib/` — Utility functions
- `public/` — Static assets and PWA manifest

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see the app.

## Deployment

### Vercel

1. Create a Vercel project from this repository.
2. Set build command: `npm run build`
3. Set output directory: `.`
4. Deploy.

### Netlify

1. Connect the repository to Netlify.
2. Set build command: `npm run build`
3. Set publish directory: `.`
4. Deploy.

### VPS

1. Install Node.js 20+ on your server.
2. Clone the repository.
3. Run:
   ```bash
   npm install
   npm run build
   npm run start
   ```
4. Use a process manager such as `pm2` or `systemd`.
5. Configure Nginx or Caddy for HTTPS reverse proxy.

## Notes

- The app uses Aniverse and Anikoto API integrations for streaming, search, and anime metadata.
- The watch page includes provider fallback logic and dynamic stream selection.
- The app shell is built for a polished anime streaming experience but can be expanded with real auth, comment systems, and deeper API fallback handling.
