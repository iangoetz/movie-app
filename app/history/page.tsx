"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { TitleRow } from "@/components/TitleRow";
import { EmptyState } from "@/components/EmptyState";

export default function HistoryPage() {
  const { watched, getTitleById } = useApp();

  const items = watched
    .map((w) => ({ item: w, title: getTitleById(w.id) }))
    .filter(
      (
        x
      ): x is {
        item: (typeof watched)[0];
        title: NonNullable<ReturnType<typeof getTitleById>>;
      } => x.title != null
    )
    .sort(
      (a, b) =>
        new Date(b.item.watchedAt).getTime() -
        new Date(a.item.watchedAt).getTime()
    );

  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      <header className="sticky top-0 z-10 bg-[#0c0c0e]/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-2 h-14 px-2">
          <Link
            href="/profile"
            className="p-2 rounded-lg active:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center text-white"
            aria-label="Back"
          >
            ←
          </Link>
          <h1 className="text-xl font-semibold text-white">History</h1>
        </div>
      </header>

      <div className="px-4 py-4">
        {items.length === 0 ? (
          <EmptyState
            title="No watched titles yet"
            description="Mark titles as watched from their detail page."
          />
        ) : (
          <ul className="space-y-0">
            {items.map(({ item, title }) => (
              <li key={title.id}>
                <TitleRow
                  title={title}
                  subtitle={
                    item.rating != null
                      ? `Watched · ${item.rating}/10`
                      : `Watched ${new Date(item.watchedAt).toLocaleDateString()}`
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
