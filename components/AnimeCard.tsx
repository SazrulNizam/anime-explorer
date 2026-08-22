'use client'

import { useFavoritesStore } from '@/store/UseFavoriteStore'

interface AnimeCardProps {
  mal_id: number
  title: string
  image: string
  type: string
  score: number
}

export default function AnimeCard({ mal_id, title, image, type, score }: AnimeCardProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(mal_id))
  const addFavorite = useFavoritesStore((s) => s.addFavorite)
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite)

  const handleToggleFavorite = (e: React.MouseEvent) => {
     e.preventDefault()
  e.stopPropagation()
    if (isFavorite) {
      removeFavorite(mal_id)
    } else {
      addFavorite({ mal_id, title, image, type, score })
    }
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="card-body p-3">
        <h2 className="card-title text-sm">{title}</h2>
        <p className="text-xs">{type} · ⭐ {score ?? 'N/A'}</p>
        <button
          onClick={handleToggleFavorite}
          className="btn btn-sm btn-ghost mt-2"
        >
          {isFavorite ? '★ Favorited' : '☆ Add to favorites'}
        </button>
      </div>
    </div>
  )
}