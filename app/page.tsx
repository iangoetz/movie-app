import { topMovies } from "./data/top-movies";
import { posterUrl } from "./lib/tmdb";
import { MovieCard } from "@/components/MovieCard";

export default function Home() {
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Top movies
        </h1>
        <p className="text-white/60">
          A curated list of highly rated films.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {topMovies.map((movie, index) => (
          <li key={movie.id}>
            <MovieCard
              movie={movie}
              rank={index + 1}
              posterUrl={posterUrl(movie.posterPath)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
