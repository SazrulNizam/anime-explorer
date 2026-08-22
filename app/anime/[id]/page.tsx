import Link from 'next/link'

interface AnimeDetail {
  mal_id: number
  title: string
  images: { jpg: { image_url: string } }
  synopsis: string
  episodes: number
  rating: string
  score: number
  type: string
  status: string
}

async function getAnimeDetail(id: string) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const json = await res.json()
    return json.data as AnimeDetail
  } catch {
    return null
  }
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const anime = await getAnimeDetail(id)

  if (!anime) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load anime details. Please try again.
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Link href="/anime" className="btn btn-sm btn-ghost mb-4">Back</Link>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full md:w-64 rounded-lg shadow-md"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{anime.title}</h1>
          <p className="text-sm mb-1"><strong>Type:</strong> {anime.type}</p>
          <p className="text-sm mb-1"><strong>Episodes:</strong> {anime.episodes ?? 'N/A'}</p>
          <p className="text-sm mb-1"><strong>Rating:</strong> {anime.rating ?? 'N/A'}</p>
          <p className="text-sm mb-1"><strong>Score:</strong> ⭐ {anime.score ?? 'N/A'}</p>
          <p className="text-sm mb-4"><strong>Status:</strong> {anime.status}</p>

          <h2 className="font-semibold mb-2">Synopsis</h2>
          <p className="text-sm leading-relaxed">{anime.synopsis ?? 'No synopsis available.'}</p>
        </div>
      </div>
    </div>
  )
}