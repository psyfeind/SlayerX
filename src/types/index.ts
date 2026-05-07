// API Types for ZenithAnime

export interface AnimeSearchResult {
  title: string;
  anime_id: string;
  poster: string;
  rating?: number;
  type?: string;
  duration?: string;
  is_sub?: string;
  is_dub?: string;
}

export interface AnimeSearchResponse {
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

// Anikoto API Types

export interface AnikotoAnime {
  id: string;
  title: string;
  poster: string;
  is_sub: string;
  is_dub: string;
  type: string;
  duration: string;
}

export interface AnikotoRecentResponse {
  data: AnikotoAnime[];
}

export interface AnikotoEpisode {
  number: number;
  episode_embed_id: string;
}

export interface AnikotoSeriesResponse {
  data: {
    anime: {
      title: string;
      poster: string;
      description: string;
    };
    episodes: AnikotoEpisode[];
  };
}

// Store Types

export interface WatchHistoryItem {
  anime_id: string;
  title: string;
  poster: string;
  lastWatched: string;
  progress: number; // percentage
  season: number;
  episode: number;
}

export interface FavoriteAnime {
  anime_id: string;
  title: string;
  poster: string;
  addedAt: string;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  autoNext: boolean;
  autoPlay: boolean;
  volume: number;
  quality: string;
}

// Component Props Types

export interface AnimeCardProps {
  anime: AnimeSearchResult | AnikotoAnime;
  onClick?: () => void;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  onNext?: () => void;
  onPrev?: () => void;
  autoNext?: boolean;
}

// Utility Types

export type Provider = 'aniverse' | 'anikoto';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}