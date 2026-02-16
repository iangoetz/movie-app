export type Movie = {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  posterUrl?: string;
};

export const topMovies: Movie[] = [
  {
    id: "stardust",
    title: "Stardust",
    year: 2007,
    genre: "Fantasy, Adventure, Romance",
    rating: 7.6,
    description:
      "In a countryside town bordering on a magical land, a young man makes a promise to his beloved that he'll retrieve a fallen star by venturing into the magical realm.",
    posterUrl: "https://image.tmdb.org/t/p/w500/7zbFmxy3DqKYL2M8Hop6uylp2Uy.jpg",
  },
  {
    id: "inception",
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi, Thriller",
    rating: 8.8,
    description:
      "A thief who steals corporate secrets through dream-sharing technology is offered a chance to have his criminal record wiped clean.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi, Drama, Adventure",
    rating: 8.7,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: "the-shawshank-redemption",
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
  {
    id: "pulp-fiction",
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime, Drama",
    rating: 8.9,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
];

export function getMovieById(id: string): Movie | undefined {
  return topMovies.find((m) => m.id === id);
}

export function getRatingColor(rating: number): { bg: string; text: string } {
  if (rating >= 9) return { bg: "bg-green-500/20", text: "text-green-400" };
  if (rating < 8) return { bg: "bg-red-500/20", text: "text-red-400" };
  return { bg: "bg-amber-500/20", text: "text-amber-400" };
}
