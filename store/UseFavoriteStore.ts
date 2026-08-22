import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoriteAnime {
  mal_id: number
  title: string
  image: string
  type: string
  score: number
}

interface FavoritesState {
  favorites: FavoriteAnime[]

  addFavorite: (anime: FavoriteAnime) => void
  removeFavorite: (mal_id: number) => void
  isFavorite: (mal_id: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (anime) =>
        set((state) => ({
          favorites: [...state.favorites, anime],
        })),

      removeFavorite: (mal_id) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.mal_id !== mal_id),
        })),

      isFavorite: (mal_id) => {
        return get().favorites.some((item) => item.mal_id === mal_id)
      },
    }),
    {
      name: 'anime-favorites-storage',
    }
  )
)