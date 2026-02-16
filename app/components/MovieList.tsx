import type { Movie } from "@/data/movies";
import { MovieListItem } from "./MovieListItem";

export function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul className="space-y-4">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
