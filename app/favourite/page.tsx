'use client'

import { useFavoritesStore } from '@/store/UseFavoriteStore'

export default function FavouritePage() {
  const favorites = useFavoritesStore((s) => s.favorites)
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite)

  if (favorites.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No anime in your favourites list yet.
       </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Favourites</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorites.map((anime) => (
          <div key={anime.mal_id} className="card bg-base-100 shadow-md">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="card-body p-3">
              <h2 className="card-title text-sm">{anime.title}</h2>
              <p className="text-xs">{anime.type} · ⭐ {anime.score ?? 'N/A'}</p>
              <button
                onClick={() => removeFavorite(anime.mal_id)}
                className="btn btn-sm btn-ghost mt-2"
              >
                X Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}