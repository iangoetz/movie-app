"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { TitleRow } from "@/components/TitleRow";

export default function SearchPage() {
  const { catalog, recentSearches, addRecentSearch } = useApp();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return catalog.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.genres.some((g) => g.toLowerCase().includes(q))
    );
  }, [catalog, query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) addRecentSearch(query.trim());
  };

  const showRecent = !query.trim() && recentSearches.length > 0;

  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      <header className="sticky top-0 z-10 bg-[#0c0c0e]/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-2 px-2 py-2">
          <Link
            href="/"
            className="p-2 rounded-lg active:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white"
            aria-label="Back"
          >
            ←
          </Link>
          <form onSubmit={handleSubmit} className="flex-1 min-w-0">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies and shows..."
              className="w-full bg-white/10 text-white rounded-lg px-4 py-3 text-base border-0 placeholder-white/40 focus:ring-2 focus:ring-white/20"
            />
          </form>
        </div>
      </header>

      <div className="px-4 py-4">
        {showRecent && (
          <section className="mb-6">
            <h2 className="text-sm font-medium text-white/50 mb-2">
              Recent searches
            </h2>
            <ul className="space-y-1">
              {recentSearches.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => setQuery(q)}
                    className="w-full text-left py-2 px-3 rounded-lg active:bg-white/10 text-white/80"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {query.trim() && (
          <section>
            <h2 className="text-sm font-medium text-white/50 mb-2">
              {results.length > 0
                ? `Results (${results.length})`
                : "No results"}
            </h2>
            {results.length > 0 ? (
              <ul className="space-y-0">
                {results.map((t) => (
                  <li key={t.id}>
                    <TitleRow title={t} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 text-sm py-4">
                Try a different search.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
