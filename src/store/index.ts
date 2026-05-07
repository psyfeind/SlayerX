import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WatchHistoryItem, FavoriteAnime, UserSettings, Provider } from '@/types';

interface WatchHistoryStore {
  history: WatchHistoryItem[];
  addToHistory: (item: WatchHistoryItem) => void;
  updateProgress: (anime_id: string, progress: number, season: number, episode: number) => void;
  removeFromHistory: (anime_id: string) => void;
  clearHistory: () => void;
}

interface FavoritesStore {
  favorites: FavoriteAnime[];
  addFavorite: (anime: FavoriteAnime) => void;
  removeFavorite: (anime_id: string) => void;
  isFavorite: (anime_id: string) => boolean;
  clearFavorites: () => void;
}

interface SettingsStore {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

interface ProviderStore {
  currentProvider: Provider;
  setProvider: (provider: Provider) => void;
}

export const useWatchHistory = create<WatchHistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      addToHistory: (item) =>
        set((state) => {
          const existing = state.history.find((h) => h.anime_id === item.anime_id);
          if (existing) {
            return {
              history: state.history.map((h) =>
                h.anime_id === item.anime_id ? { ...h, ...item } : h
              ),
            };
          }
          return { history: [item, ...state.history] };
        }),
      updateProgress: (anime_id, progress, season, episode) =>
        set((state) => ({
          history: state.history.map((h) =>
            h.anime_id === anime_id
              ? { ...h, progress, season, episode, lastWatched: new Date().toISOString() }
              : h
          ),
        })),
      removeFromHistory: (anime_id) =>
        set((state) => ({
          history: state.history.filter((h) => h.anime_id !== anime_id),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'watch-history',
    }
  )
);

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (anime) =>
        set((state) => ({
          favorites: state.favorites.some((f) => f.anime_id === anime.anime_id)
            ? state.favorites
            : [anime, ...state.favorites],
        })),
      removeFavorite: (anime_id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.anime_id !== anime_id),
        })),
      isFavorite: (anime_id) => get().favorites.some((f) => f.anime_id === anime_id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites',
    }
  )
);

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        theme: 'dark',
        autoNext: true,
        autoPlay: false,
        volume: 1,
        quality: 'auto',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'settings',
    }
  )
);

export const useProvider = create<ProviderStore>((set) => ({
  currentProvider: 'aniverse',
  setProvider: (provider) => set({ currentProvider: provider }),
}));