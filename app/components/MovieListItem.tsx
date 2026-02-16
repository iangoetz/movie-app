import Link from "next/link";
import Image from "next/image";
import type { Movie } from "@/data/movies";
import { getRatingColor } from "@/data/movies";

export function MovieListItem({ movie }: { movie: Movie }) {
  const ratingColors = getRatingColor(movie.rating);

  return (
    <li className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition hover:border-slate-600">
      <Link href={`/movies/${movie.id}`} className="block">
        <div className="flex items-center gap-4">
          {movie.posterUrl && (
            <Image
              src={movie.posterUrl}
              alt=""
              width={80}
              height={120}
              unoptimized
              className="shrink-0 rounded object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-slate-400">
              {movie.year} · {movie.genre}
            </p>
          </div>
          <span
            className={`shrink-0 rounded px-2 py-1 ${ratingColors.bg} ${ratingColors.text}`}
          >
            ★ {movie.rating}
          </span>
        </div>
      </Link>
    </li>
  );
}
