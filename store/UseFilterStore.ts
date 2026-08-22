import { create } from 'zustand'

export type AnimeType = 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music' | 'CM' | 'PV' | 'TV Special' | ''
export type AnimeRating = 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx' | ''

interface FilterState {
  query: string
  type: AnimeType
  genre: string
  rating: AnimeRating
  page: number
  limit: number

  setQuery: (query: string) => void
  setType: (type: AnimeType) => void
  setGenre: (genre: string) => void
  setRating: (rating: AnimeRating) => void
  setPage: (page: number) => void
  resetFilters: () => void
}

const initialState = {
  query: '',
  type: '' as AnimeType,
  genre: '',
  rating: '' as AnimeRating,
  page: 1,
  limit: 10,
}

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setQuery: (query) => set({ query, page: 1 }),
  setType: (type) => set({ type, page: 1 }),
  setGenre: (genre) => set({ genre, page: 1 }),
  setRating: (rating) => set({ rating, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () => set(initialState),
}))