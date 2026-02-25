"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { TitleRow } from "@/components/TitleRow";
import { EmptyState } from "@/components/EmptyState";

export default function NowWatchingPage() {
  const { progress, getTitleById } = useApp();

  const items = progress
    .map((p) => ({ progress: p, title: getTitleById(p.id) }))
    .filter(
      (
        x
      ): x is {
        progress: (typeof progress)[0];
        title: NonNullable<ReturnType<typeof getTitleById>>;
      } => x.title != null
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
          <h1 className="text-xl font-semibold text-white">Now watching</h1>
        </div>
      </header>

      <div className="px-4 py-4">
        {items.length === 0 ? (
          <EmptyState
            title="Nothing in progress"
            description="Start watching something and we'll track it here."
          />
        ) : (
          <ul className="space-y-0">
            {items.map(({ title, progress: p }) => (
              <li key={title.id}>
                <TitleRow
                  title={title}
                  subtitle={
                    p.lastEpisode ??
                    (p.percent != null ? `${p.percent}%` : "In progress")
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
