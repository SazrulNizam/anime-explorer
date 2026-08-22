'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useFilterStore, AnimeType, AnimeRating } from '@/store/UseFilterStore'

interface Genre {
  mal_id: number
  name: string
}

export default function FilterBar({ genres }: { genres: Genre[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const urlParams = useSearchParams()

  const type = useFilterStore((s) => s.type)
  const genre = useFilterStore((s) => s.genre)
  const rating = useFilterStore((s) => s.rating)
  const setType = useFilterStore((s) => s.setType)
  const setGenre = useFilterStore((s) => s.setGenre)
  const setRating = useFilterStore((s) => s.setRating)

  useEffect(() => {
    const newParams = new URLSearchParams(urlParams.toString())
    if (type) newParams.set('type', type); else newParams.delete('type')
    if (genre) newParams.set('genre', genre); else newParams.delete('genre')
    if (rating) newParams.set('rating', rating); else newParams.delete('rating')
    newParams.set('page', '1')
    router.push(`${pathname}?${newParams.toString()}`)
  }, [type, genre, rating])

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as AnimeType)}
        className="select select-bordered select-sm"
      >
        <option value="">All Type</option>
        <option value="TV">TV</option>
        <option value="Movie">Movie</option>
        <option value="OVA">OVA</option>
        <option value="Special">Special</option>
        <option value="ONA">ONA</option>
        <option value="Music">Music</option>
      </select>

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="select select-bordered select-sm"
      >
        <option value="">All Genre</option>
        {genres.map((g) => (
          <option key={g.mal_id} value={g.mal_id}>{g.name}</option>
        ))}
      </select>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value as AnimeRating)}
        className="select select-bordered select-sm"
      >
        <option value="">All Rating</option>
        <option value="g">G</option>
        <option value="pg">PG</option>
        <option value="pg13">PG-13</option>
        <option value="r17">R-17</option>
        <option value="r">R+</option>
      </select>
    </div>
  )
}