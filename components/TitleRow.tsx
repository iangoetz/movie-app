"use client";

import Link from "next/link";
import type { Title } from "@/app/types";

interface TitleRowProps {
  title: Title;
  subtitle?: string;
}

export function TitleRow({ title, subtitle }: TitleRowProps) {
  const sub =
    subtitle ??
    (title.type === "tv" && title.seasons
      ? `${title.seasons} seasons`
      : title.runtime
        ? `${title.runtime} min`
        : `${title.year}`);
  return (
    <Link
      href={`/title/${title.type}/${title.id}`}
      className="flex items-center gap-3 p-3 active:bg-white/5 rounded-lg min-h-[72px] touch-manipulation"
    >
      <div className="flex-shrink-0 w-12 h-[72px] rounded overflow-hidden bg-white/10">
        {title.posterPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={title.posterPath}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
            No image
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium truncate text-white">{title.title}</div>
        <div className="text-sm text-white/50 truncate">{sub}</div>
      </div>
    </Link>
  );
}
