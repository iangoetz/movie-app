"use client";

import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel = "Discover",
  actionTo = "/discover",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <p className="text-4xl mb-4 opacity-60" aria-hidden>
        📽️
      </p>
      <h2 className="text-lg font-medium text-white/90">{title}</h2>
      {description && (
        <p className="text-white/50 mt-1 text-sm">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link
          href={actionTo}
          className="mt-6 px-6 py-2.5 rounded-lg bg-white text-[#0c0c0e] font-medium text-sm active:opacity-90"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
