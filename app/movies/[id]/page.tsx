import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieById, getRatingColor } from "@/data/movies";

export default function MoviePage({ params }: { params: { id: string } }) {
  const movie = getMovieById(params.id);

  if (!movie) {
    notFound();
  }

  const ratingColors = getRatingColor(movie.rating);

  return (
    <div>
      <Link
        href="/"
        className="mb-6 inline-block text-slate-400 hover:text-white"
      >
        ← Back to Top Movies
      </Link>
      <article className="max-w-2xl">
        {movie.posterUrl && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              width={500}
              height={750}
              unoptimized
              className="w-full max-w-sm object-cover"
            />
          </div>
        )}
        <h1 className="mb-2 text-4xl font-bold">{movie.title}</h1>
        <p className="mb-6 text-slate-400">
          {movie.year} · {movie.genre}
        </p>
        <div className="mb-6">
          <span
            className={`rounded px-3 py-1.5 text-lg ${ratingColors.bg} ${ratingColors.text}`}
          >
            ★ {movie.rating}
          </span>
        </div>
        <p className="text-lg leading-relaxed text-slate-300">
          {movie.description}
        </p>
      </article>
    </div>
  );
}
