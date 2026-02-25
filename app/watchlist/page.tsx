"use client";

import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { TitleRow } from "@/components/TitleRow";
import { EmptyState } from "@/components/EmptyState";

type SortOption = "priority" | "date" | "runtime";
type FilterType = "all" | "movie" | "tv";

export default function WatchlistPage() {
  const { watchlist, getTitleById } = useApp();
  const [sort, setSort] = useState<SortOption>("date");
  const [filter, setFilter] = useState<FilterType>("all");

  const items = useMemo(() => {
    let list = watchlist
      .map((w) => ({ item: w, title: getTitleById(w.id) }))
      .filter(
        (
          x
        ): x is {
          item: (typeof watchlist)[0];
          title: NonNullable<ReturnType<typeof getTitleById>>;
        } => x.title != null
      );

    if (filter !== "all") {
      list = list.filter((x) => x.item.type === filter);
    }

    if (sort === "date") {
      list = [...list].sort(
        (a, b) =>
          new Date(b.item.addedAt).getTime() -
          new Date(a.item.addedAt).getTime()
      );
    } else if (sort === "runtime") {
      list = [...list].sort(
        (a, b) => (b.title.runtime || 0) - (a.title.runtime || 0)
      );
    }
    return list;
  }, [watchlist, getTitleById, sort, filter]);

  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      <header className="sticky top-0 z-10 bg-[#0c0c0e]/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center h-14 px-4">
          <h1 className="text-xl font-semibold text-white">Watchlist</h1>
        </div>
        <div className="flex gap-2 px-4 pb-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-white/10 text-white/90 text-sm rounded-lg px-3 py-2 border-0"
          >
            <option value="priority">Priority</option>
            <option value="date">Date added</option>
            <option value="runtime">Runtime</option>
          </select>
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            {(["all", "movie", "tv"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-sm capitalize ${
                  filter === f
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {items.length === 0 ? (
          <EmptyState
            title="Nothing in your watchlist"
            description="Discover movies and shows to add."
            actionLabel="Discover"
            actionTo="/discover"
          />
        ) : (
          <ul className="space-y-0">
            {items.map(({ item, title }) => (
              <li key={title.id}>
                <TitleRow
                  title={title}
                  subtitle={new Date(item.addedAt).toLocaleDateString()}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
