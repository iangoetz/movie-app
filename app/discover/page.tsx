"use client";

import { useApp } from "@/context/AppContext";
import { TitleRow } from "@/components/TitleRow";

export default function DiscoverPage() {
  const { catalog } = useApp();

  const movies = catalog.filter((t) => t.type === "movie");
  const tv = catalog.filter((t) => t.type === "tv");
  const trending = catalog.slice(0, 10);
  const newReleases = [...catalog]
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      <header className="sticky top-0 z-10 bg-[#0c0c0e]/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center h-14 px-4">
          <h1 className="text-xl font-semibold text-white">Discover</h1>
        </div>
      </header>

      <div className="px-4 py-4 space-y-8">
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
            New releases
          </h2>
          <ul className="space-y-0">
            {newReleases.map((t) => (
              <li key={t.id}>
                <TitleRow title={t} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-white/80 mb-3">
            Movies
          </h2>
          <ul className="space-y-0">
            {movies.map((t) => (
              <li key={t.id}>
                <TitleRow title={t} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-white/80 mb-3">
            TV shows
          </h2>
          <ul className="space-y-0">
            {tv.map((t) => (
              <li key={t.id}>
                <TitleRow title={t} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
