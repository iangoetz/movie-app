"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import type { Title } from "@/app/types";

interface TitleDetailProps {
  title: Title;
}

export function TitleDetail({ title }: TitleDetailProps) {
  const router = useRouter();
  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    markWatched,
    isWatched,
    catalog,
  } = useApp();

  const inWatchlist = isInWatchlist(title.id);
  const watched = isWatched(title.id);
  const similar = catalog
    .filter(
      (t) =>
        t.id !== title.id &&
        t.genres.some((g) => title.genres.includes(g))
    )
    .slice(0, 6);

  const runtimeOrSeasons =
    title.type === "tv" && title.seasons
      ? `${title.seasons} seasons`
      : title.runtime
        ? `${title.runtime} min`
        : null;

  return (
    <div className="min-h-screen bg-[#0c0c0e] pb-8">
      <header className="sticky top-0 z-10 bg-[#0c0c0e]/95 backdrop-blur flex items-center gap-2 h-14 px-3 border-b border-white/10">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-lg active:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white"
          aria-label="Back"
        >
          ←
        </button>
        <h1 className="text-lg font-medium truncate flex-1 text-white">
          Title
        </h1>
      </header>

      <div className="px-4">
        <div className="flex gap-4 mt-4">
          <div className="flex-shrink-0 w-28 rounded-lg overflow-hidden bg-white/10">
            {title.posterPath ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={title.posterPath}
                alt=""
                className="w-full aspect-[2/3] object-cover"
              />
            ) : (
              <div className="w-full aspect-[2/3] flex items-center justify-center text-white/40 text-xs">
                No image
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-white">{title.title}</h2>
            <p className="text-white/50 text-sm mt-0.5">{title.year}</p>
            {runtimeOrSeasons && (
              <p className="text-white/40 text-sm">{runtimeOrSeasons}</p>
            )}
            {title.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {title.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-xs"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {title.overview && (
          <p className="text-white/70 text-sm mt-4 leading-relaxed">
            {title.overview}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-6">
          {!watched && (
            <button
              type="button"
              onClick={() =>
                inWatchlist
                  ? removeFromWatchlist(title.id)
                  : addToWatchlist(title.id, title.type)
              }
              className={`min-h-[44px] px-4 rounded-lg font-medium text-sm touch-manipulation ${
                inWatchlist
                  ? "bg-white/10 text-white/70"
                  : "bg-white text-[#0c0c0e]"
              }`}
            >
              {inWatchlist ? "In watchlist" : "Add to watchlist"}
            </button>
          )}
          {!watched && (
            <button
              type="button"
              onClick={() => markWatched(title.id, title.type)}
              className="min-h-[44px] px-4 rounded-lg font-medium text-sm bg-white/10 text-white/70 touch-manipulation"
            >
              Mark watched
            </button>
          )}
          {watched && (
            <span className="min-h-[44px] px-4 rounded-lg font-medium text-sm bg-green-500/20 text-green-300 inline-flex items-center">
              Watched
            </span>
          )}
          <button
            type="button"
            className="min-h-[44px] px-4 rounded-lg font-medium text-sm bg-white/10 text-white/70 touch-manipulation"
          >
            Where to watch
          </button>
        </div>

        {similar.length > 0 && (
          <section className="mt-8">
            <h3 className="text-base font-medium text-white/80 mb-3">
              Similar
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {similar.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => router.push(`/title/${t.type}/${t.id}`)}
                  className="flex-shrink-0 w-24 text-left"
                >
                  <div className="w-24 rounded-lg overflow-hidden bg-white/10 aspect-[2/3]">
                    {t.posterPath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.posterPath}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                  <p className="text-xs text-white/50 truncate mt-1">
                    {t.title}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
