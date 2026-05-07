import axios from 'axios';
import type {
  AnimeSearchResponse,
  AnimeInfo,
  EpisodesResponse,
  StreamResponse,
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_ANIVERSE_API || 'https://aniverseapi.vercel.app';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const aniverseApi = {
  search: async (query: string, page: number = 1): Promise<AnimeSearchResponse> => {
    const response = await api.get(`/api/search?s=${encodeURIComponent(query)}&page=${page}`);
    return response.data;
  },

  getInfo: async (id: string): Promise<AnimeInfo> => {
    const response = await api.get(`/api/info?id=${id}`);
    return response.data;
  },

  getEpisodes: async (id: string, season: number): Promise<EpisodesResponse> => {
    const response = await api.get(`/api/episodes?id=${id}&season=${season}`);
    return response.data;
  },

  getStream: async (id: string, season: number, episode: number): Promise<StreamResponse> => {
    const response = await api.get(`/api/stream?id=${id}&season=${season}&ep=${episode}`);
    return response.data;
  },

  getNewAdded: async (): Promise<any> => {
    const response = await api.get('/api/newadded');
    return response.data;
  },

  getSeries: async (page: number = 1): Promise<any> => {
    const response = await api.get(`/api/series?page=${page}`);
    return response.data;
  },

  getMovies: async (page: number = 1): Promise<any> => {
    const response = await api.get(`/api/movies?page=${page}`);
    return response.data;
  },

  getMovieInfo: async (id: string): Promise<any> => {
    const response = await api.get(`/api/movie?id=${id}`);
    return response.data;
  },
};