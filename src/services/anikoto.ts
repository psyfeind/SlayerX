import axios from 'axios';
import type {
  AnikotoRecentResponse,
  AnikotoSeriesResponse,
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_ANIKOTO_API || 'https://anikotoapi.site';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const anikotoApi = {
  getRecentAnime: async (page: number = 1, perPage: number = 24): Promise<AnikotoRecentResponse> => {
    const response = await api.get(`/recent-anime?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  getSeries: async (id: string): Promise<AnikotoSeriesResponse> => {
    const response = await api.get(`/series/${id}`);
    return response.data;
  },
};

// Stream URL builder for Anikoto
export const buildAnikotoStreamUrl = (episodeEmbedId: string, type: 'sub' | 'dub' = 'sub'): string => {
  return `https://megaplay.buzz/stream/s-2/${episodeEmbedId}/${type}`;
};