import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieById, getRatingColor } from "@/data/movies";
import { TrailerButton } from "@/app/components/TrailerButton";

export default function MoviePage({ params }: { params: { id: string } }) {
  const movie = getMovieById(params.id);

  if (!movie) {
    notFound();
  }

  const ratingColors = getRatingColor(movie.rating);
  const genres = movie.genre.split(", ");

  return (
    <div className="-mx-6 -mt-8">
      {/* Hero section with poster and overlays */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-800 sm:aspect-video sm:max-h-[50vh]">
        {movie.posterUrl && (
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            unoptimized
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
        {/* Top navigation */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500/60 text-white backdrop-blur-sm hover:bg-slate-500/80"
            aria-label="Back"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-500/60 text-lg backdrop-blur-sm">
            👤
          </div>
        </div>
        {movie.trailerUrl && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <TrailerButton trailerUrl={movie.trailerUrl} movieTitle={movie.title} />
          </div>
        )}
      </div>

      {/* Details card - overlaps hero */}
      <div className="-mt-12 rounded-t-2xl bg-slate-900 px-6 pb-8 pt-6">
        {/* Ratings row */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-orange-500/30 px-3 py-1 text-sm font-medium text-orange-400">
            IMDb {movie.rating}
          </span>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${ratingColors.bg} ${ratingColors.text}`}
          >
            ★ {movie.rating}
            {movie.reviewsCount && (
              <span className="text-slate-400">({movie.reviewsCount} reviews)</span>
            )}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {movie.title}
        </h1>

        {/* Genre tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {genres.map((g) => (
            <span
              key={g}
              className="rounded-lg bg-slate-700/80 px-3 py-1.5 text-sm text-slate-200"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mb-8 leading-relaxed text-slate-300">{movie.description}</p>

        {/* Bottom booking section */}
        <div className="rounded-xl bg-slate-800/80 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{movie.title}</p>
              {movie.duration && (
                <p className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {movie.duration}
                </p>
              )}
            </div>
            <span className="rounded-full bg-slate-700 px-4 py-1.5 text-sm font-medium">
              $9.99
            </span>
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-white py-3 font-medium text-slate-800 transition hover:bg-slate-100"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}
