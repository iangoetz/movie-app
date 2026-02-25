"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { TitleRow } from "@/components/TitleRow";
import { EmptyState } from "@/components/EmptyState";

export default function HomePage() {
  const { catalog, watchlist, progress, getTitleById } = useApp();

  const watchlistTitles = watchlist
    .map((w) => getTitleById(w.id))
    .filter((t): t is NonNullable<typeof t> => t != null)
    .slice(0, 10);

  const continueWatching = progress
    .map((p) => getTitleById(p.id))
    .filter((t): t is NonNullable<typeof t> => t != null)
    .slice(0, 5);

  const trending = catalog.slice(0, 8);
  const recommendations = catalog.slice(2, 10);

  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      <header className="sticky top-0 z-10 bg-[#0c0c0e]/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-semibold text-white">Home</h1>
          <Link
            href="/search"
            className="p-2 rounded-lg active:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white"
            aria-label="Search"
          >
            🔍
          </Link>
        </div>
      </header>

      <div className="px-4 py-4 space-y-8">
        {continueWatching.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-white/80 mb-3">
              Continue watching
            </h2>
            <ul className="space-y-0">
              {continueWatching.map((t) => (
                <li key={t.id}>
                  <TitleRow title={t} subtitle="Resume" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {watchlistTitles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-medium text-white/80">
                Recently added
              </h2>
              <Link
                href="/watchlist"
                className="text-sm text-white/50"
              >
                See all
              </Link>
            </div>
            <ul className="space-y-0">
              {watchlistTitles.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <TitleRow title={t} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-base font-medium text-white/80 mb-3">
            Trending
          </h2>
          <ul className="space-y-0">
            {trending.map((t) => (
              <li key={t.id}>
                <TitleRow title={t} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-white/80 mb-3">
            Recommendations
          </h2>
          <ul className="space-y-0">
            {recommendations.map((t) => (
              <li key={t.id}>
                <TitleRow title={t} />
              </li>
            ))}
          </ul>
        </section>

        {watchlistTitles.length === 0 &&
          continueWatching.length === 0 &&
          catalog.length === 0 && (
            <EmptyState
              title="No activity yet"
              description="Add titles from Discover or Search to get started."
              actionLabel="Discover"
              actionTo="/discover"
            />
          )}
      </div>
    </div>
  );
}
