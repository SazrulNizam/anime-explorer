# Anime Explorer

Web app to explore anime using Jikan API (MyAnimeList).

## Setup

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Zustand (state management, with persist middleware for favourites)
- TailwindCSS + DaisyUI

## Architecture

- **Server Components** (`app/anime/page.tsx`, `app/anime/[id]/page.tsx`) — fetch data from Jikan API server-side, no interactive JS sent to the browser for these parts.
- **Client Components** (`SearchBar`, `FilterBar`, `Pagination`, `AnimeCard`, `favourite/page.tsx`) — all use `'use client'` because they require hooks (`useState`, `useEffect`) or Zustand.
- **State Management**: two separate Zustand stores —
  - `useFilterStore`: search query, type, genre, rating, page — synced to URL query params to be shareable and refresh-safe.
  - `useFavoritesStore`: favourites list, uses `persist` middleware to save to localStorage.
- **Resilience**: Jikan API is a public/free API that can be unstable. The app has retry logic (auto-retry fetch) and falls back to sample data if the API fails after several attempts, so the app remains usable.
- **Responsiveness**: grid layout uses Tailwind breakpoints (`grid-cols-2` on mobile up to `grid-cols-6` on desktop), details page switches from `flex-col` (mobile) to `flex-row` (desktop).
