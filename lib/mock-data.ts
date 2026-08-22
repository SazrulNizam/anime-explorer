export interface MockAnime {
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
    }
  }
  type: string
  score: number
}

export const mockAnimeList: MockAnime[] = [
  { mal_id: 1, title: 'Cowboy Bebop', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg' } }, type: 'TV', score: 8.75 },
  { mal_id: 5, title: 'Cowboy Bebop: Tengoku no Tobira', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1439/93480.jpg' } }, type: 'Movie', score: 8.38 },
  { mal_id: 6, title: 'Trigun', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1130/120002.jpg' } }, type: 'TV', score: 8.22 },
  { mal_id: 19, title: 'Monster', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/10/18793.jpg' } }, type: 'TV', score: 8.89 },
  { mal_id: 20, title: 'Naruto', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1141/142503.jpg' } }, type: 'TV', score: 8.02 },
  { mal_id: 21, title: 'One Piece', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg' } }, type: 'TV', score: 8.73 },
  { mal_id: 30, title: 'Shinseiki Evangelion', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1314/108941.jpg' } }, type: 'TV', score: 8.37 },
  { mal_id: 33, title: 'Kenpuu Denki Berserk', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1384/119988.jpg' } }, type: 'TV', score: 8.61 },
  { mal_id: 43, title: 'Koukaku Kidoutai', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/10/82594.jpg' } }, type: 'Movie', score: 8.27 },
  { mal_id: 24, title: 'School Rumble', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1465/142014.jpg' } }, type: 'TV', score: 7.88 },
  { mal_id: 16, title: 'Hachimitsu to Clover', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1301/133577.jpg' } }, type: 'TV', score: 7.98 },
  { mal_id: 22, title: 'Tennis no Oujisama', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/6/21624.jpg' } }, type: 'TV', score: 7.85 },
]