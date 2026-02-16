export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  description: string;
  /** TMDB CDN poster path (e.g. /q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg) — public, no API needed */
  posterPath: string | null;
  /** YouTube video ID for trailer embed — public, no API needed */
  youtubeTrailerId: string | null;
}

export const topMovies: Movie[] = [
  { id: "1", title: "The Shawshank Redemption", year: 1994, rating: 9.3, description: "Two imprisoned men bond over years, finding solace and redemption through acts of common decency.", posterPath: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", youtubeTrailerId: "NmzuHjWmXOc" },
  { id: "2", title: "The Godfather", year: 1972, rating: 9.2, description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.", posterPath: "/3bhkrjLUNwdLLgN9UXx3m5ruT2x.jpg", youtubeTrailerId: "S2VmmrWnq7A" },
  { id: "3", title: "The Dark Knight", year: 2008, rating: 9.0, description: "When the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests of his ability to fight injustice.", posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", youtubeTrailerId: "EXeTwQWrcwY" },
  { id: "4", title: "Pulp Fiction", year: 1994, rating: 8.9, description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence and redemption.", posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", youtubeTrailerId: "s7EdQ4FqbhY" },
  { id: "5", title: "Forrest Gump", year: 1994, rating: 8.8, description: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with a low IQ.", posterPath: "/saHP97rTPS5eLmrLQEcANeKgoFL.jpg", youtubeTrailerId: "bLvqoHBptjg" },
  { id: "6", title: "Inception", year: 2010, rating: 8.8, description: "A thief who steals corporate secrets through dream-sharing technology is offered a chance to have his criminal record erased.", posterPath: "/9gk7adHYeDvHkCSEqAvQNLV5Hu1.jpg", youtubeTrailerId: "YoHD9XEInc0" },
  { id: "7", title: "The Matrix", year: 1999, rating: 8.7, description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", posterPath: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", youtubeTrailerId: "vKQi3bBA1y8" },
  { id: "8", title: "Goodfellas", year: 1990, rating: 8.7, description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners in crime.", posterPath: "/aKuFiU82s5ISJpGg7Ds1SSheOPG.jpg", youtubeTrailerId: "2ilzidi_J8Q" },
  { id: "9", title: "Interstellar", year: 2014, rating: 8.7, description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", youtubeTrailerId: "zSWdZVtXT7E" },
  { id: "10", title: "The Silence of the Lambs", year: 1991, rating: 8.6, description: "A young F.B.I. cadet must receive the help of an incarcerated cannibal killer to catch another serial killer.", posterPath: "/uS9m8OBk1A8eM9Ivhbx8tRQqTau.jpg", youtubeTrailerId: "6iF9BfTjT_c" },
  { id: "11", title: "Shrek", year: 2001, rating: 7.9, description: "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.", posterPath: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg", youtubeTrailerId: "CwXOrWvPBPk" },
];
