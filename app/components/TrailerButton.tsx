"use client";

import { useTrailer } from "./TrailerProvider";

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
  return match ? match[1] : null;
}

export function TrailerButton({
  trailerUrl,
  movieTitle,
}: {
  trailerUrl?: string;
  movieTitle: string;
}) {
  const { openTrailer } = useTrailer();
  const videoId = trailerUrl ? getYouTubeEmbedId(trailerUrl) : null;

  if (!videoId) return null;

  return (
    <button
      type="button"
      onClick={() => openTrailer(trailerUrl!, movieTitle)}
      className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-500/60 pl-1 backdrop-blur-sm hover:bg-slate-500/80 sm:h-20 sm:w-20"
      aria-label={`Play ${movieTitle} trailer`}
    >
      <svg
        className="h-8 w-8 text-white sm:h-10 sm:w-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}
