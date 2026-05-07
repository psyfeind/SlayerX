// types/anime.ts

export interface AnimeSearchResult {
  title: string;
  anime_id: string;
  poster: string;
}

export interface SearchResponse {
  success: boolean;
  results: {
    currentPage: number;
    totalPages: number;
    results: AnimeSearchResult[];
  };
}

export interface AnimeInfo {
  title: string;
  poster: string;
  overview: string;
  language: string;
  quality: string;
  runningTime: string;
  genres: string[];
  year: number;
  seasons: number;
  episodes: number;
  rating: number;
}

export interface Episode {
  title: string;
  season: number;
  episode: number;
  poster: string;
}

export interface EpisodesResponse {
  totalEpisodes: number;
  episodes: Episode[];
}

export interface StreamServer {
  server: string;
  embed: string;
}

export interface StreamResponse {
  success: boolean;
  results: StreamServer[];
}

// Anikoto API types

export interface RecentAnime {
  id: string;
  title: string;
  poster: string;
  is_sub: string;
  is_dub: string;
  type: string;
  duration: string;
}

export interface RecentAnimeResponse {
  data: RecentAnime[];
}

export interface SeriesInfo {
  anime: {
    title: string;
    poster: string;
    description: string;
  };
  episodes: {
    number: number;
    episode_embed_id: string;
  }[];
}

export interface SeriesInfoResponse {
  data: SeriesInfo;
}

// Common types

export interface Anime {
  id: string;
  title: string;
  poster: string;
  overview?: string;
  genres?: string[];
  year?: number;
  rating?: number;
  type?: string;
  duration?: string;
  is_sub?: string;
  is_dub?: string;
}

export interface WatchHistoryItem {
  animeId: string;
  episodeId: string;
  progress: number; // 0-100
  lastWatched: Date;
}

export interface FavoriteAnime {
  animeId: string;
  addedAt: Date;
}

export type Provider = 'aniverse' | 'anikoto';

export type StreamType = 'sub' | 'dub';