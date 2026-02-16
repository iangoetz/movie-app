import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { topMovies } from "@/app/data/top-movies";
import { posterUrl } from "@/app/lib/tmdb";
import { TrailerOverlay } from "@/components/TrailerOverlay";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movie = topMovies.find((m) => m.id === id);
  if (!movie) notFound();

  const posterSrc = posterUrl(movie.posterPath);

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-8 transition-colors"
      >
        ← Back to list
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-full md:w-72 aspect-[2/3] relative rounded-xl overflow-hidden bg-[#16161a]">
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 288px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30">
              No poster
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            {movie.title}
          </h1>
          <p className="text-white/50 mb-4">({movie.year})</p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8c547]/20 px-3 py-1 text-base font-medium text-[#e8c547]">
              ★ {movie.rating}
            </span>
            <TrailerOverlay youtubeKey={movie.youtubeTrailerId} />
          </div>
          <p className="text-white/80 leading-relaxed">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
}
