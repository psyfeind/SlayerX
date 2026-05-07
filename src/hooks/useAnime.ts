// hooks/useAnime.ts

import { useQuery } from '@tanstack/react-query';
import { aniverseApi } from '@/services/aniverse';
import { anikotoApi } from '@/services/anikoto';
import type { AnimeSearchResponse, AnimeInfo, EpisodesResponse, StreamResponse, AnikotoRecentResponse, AnikotoSeriesResponse } from '@/types';

export const useAnimeSearch = (query: string, page: number = 1, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['anime-search', query, page],
    queryFn: () => aniverseApi.search(query, page),
    enabled: enabled && !!query,
  });
};

export const useAnimeInfo = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['anime-info', id],
    queryFn: () => aniverseApi.getInfo(id),
    enabled: enabled && !!id,
  });
};

export const useAnimeEpisodes = (id: string, season: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['anime-episodes', id, season],
    queryFn: () => aniverseApi.getEpisodes(id, season),
    enabled: enabled && !!id,
  });
};

export const useAnimeStream = (id: string, season: number, episode: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['anime-stream', id, season, episode],
    queryFn: () => aniverseApi.getStream(id, season, episode),
    enabled: enabled && !!id,
  });
};

export const useRecentAnime = (page: number = 1, perPage: number = 24) => {
  return useQuery({
    queryKey: ['recent-anime', page, perPage],
    queryFn: () => anikotoApi.getRecentAnime(page, perPage),
  });
};

export const useAnikotoSeries = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['anikoto-series', id],
    queryFn: () => anikotoApi.getSeries(id),
    enabled: enabled && !!id,
  });
};

export const useNewlyAdded = () => {
  return useQuery({
    queryKey: ['newly-added'],
    queryFn: () => aniverseApi.getNewAdded(),
  });
};

export const useSeries = (page: number = 1) => {
  return useQuery({
    queryKey: ['series', page],
    queryFn: () => aniverseApi.getSeries(page),
  });
};

export const useMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', page],
    queryFn: () => aniverseApi.getMovies(page),
  });
};