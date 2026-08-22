import AnimeCard from '@/components/AnimeCard'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import Pagination from '@/components/Pagination'
import { mockAnimeList } from '@/lib/mock-data'
import { Suspense } from 'react'

interface JikanAnime {
  mal_id: number
  title: string
  images: { jpg: { image_url: string } }
  type: string
  score: number
}

interface JikanResponse {
  data: JikanAnime[]
  pagination: {
    current_page: number
    last_visible_page: number
    has_next_page: boolean
  }
}

interface Genre {
  mal_id: number
  name: string
}

async function fetchWithRetry(url: string, retries = 2): Promise<Response | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } })
      if (res.ok) return res
      if (i === retries) return res
    } catch {
      if (i === retries) return null
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  return null
}

async function getGenres(): Promise<Genre[]> {
  try {
    const res = await fetch('https://api.jikan.moe/v4/genres/anime', { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    return json.data
  } catch {
    return []
  }
}

export default async function AnimePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; type?: string; genre?: string; rating?: string }>
}) {
  const params = await searchParams
  const page = params.page || '1'
  const query = params.q || ''
  const type = params.type || ''
  const genre = params.genre || ''
  const rating = params.rating || ''

  const url = new URL('https://api.tenrai.org/v1/anime/')
  url.searchParams.set('page', page)
  url.searchParams.set('limit', '12')
  if (query) url.searchParams.set('q', query)
  if (type) url.searchParams.set('type', type)
  if (genre) url.searchParams.set('genres', genre)
  if (rating) url.searchParams.set('rating', rating)

  const [res, genres] = await Promise.all([
    fetchWithRetry(url.toString()),
    getGenres(),
  ])

  let animeData: JikanAnime[]
  let usingFallback = false
  let currentPage = Number(page)
  let hasNextPage = false

  if (res && res.ok) {
    const json: JikanResponse = await res.json()
    animeData = json.data
    currentPage = json.pagination.current_page
    hasNextPage = json.pagination.has_next_page
  } else {
    usingFallback = true
    animeData = mockAnimeList.filter((anime) =>
      query ? anime.title.toLowerCase().includes(query.toLowerCase()) : true
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Anime Explorer</h1>

      <div className="mb-4">
        <SearchBar />
      </div>

      <div className="mb-6">
        <FilterBar genres={genres} />
      </div>

      {usingFallback && (
        <div className="alert alert-warning mb-4 text-sm">
          Jikan API is currently unstable — showing sample data.
        </div>
      )}

      {animeData.length === 0 && (
        <div className="text-center text-gray-500 py-12">No anime found.</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animeData.map((anime) => (
          <a key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
            <AnimeCard
              mal_id={anime.mal_id}
              title={anime.title}
              image={anime.images.jpg.image_url}
              type={anime.type}
              score={anime.score}
            />
          </a>
        ))}
      </div>

<Suspense>
  {!usingFallback && <Pagination currentPage={currentPage} hasNextPage={hasNextPage} />}
</Suspense>    </div>
  )
}