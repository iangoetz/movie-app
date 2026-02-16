import { topMovies } from "@/data/movies";
import { MovieList } from "@/app/components/MovieList";

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Top Movies</h1>
      <MovieList movies={topMovies} />
    </div>
  );
}
