import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/app/data/top-movies";

interface MovieCardProps {
  movie: Movie;
  rank: number;
  posterUrl: string | null;
}

export function MovieCard({ movie, rank, posterUrl }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <article className="rounded-xl bg-[#16161a] border border-white/10 overflow-hidden hover:border-white/20 transition-colors h-full">
        <div className="flex gap-4 p-5">
          <div className="flex-shrink-0 w-24 h-[140px] relative rounded-lg bg-[#0c0c0f] overflow-hidden">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                No poster
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 flex flex-col">
            <div className="flex items-start gap-2 mb-1">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#e8c547]/20 flex items-center justify-center text-[#e8c547] font-bold text-sm">
                {rank}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-white truncate">
                  {movie.title}
                </h2>
                <span className="text-sm text-white/50">({movie.year})</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e8c547]/20 px-2 py-0.5 text-sm font-medium text-[#e8c547]">
                ★ {movie.rating}
              </span>
            </div>
            <p className="text-sm text-white/60 line-clamp-2 flex-1">
              {movie.description}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
