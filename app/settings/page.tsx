"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { resetToSeed } = useApp();

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
          <h1 className="text-xl font-semibold text-white">Settings</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <section>
          <h2 className="text-sm font-medium text-white/50 uppercase tracking-wide mb-3">
            Data
          </h2>
          <button
            type="button"
            onClick={resetToSeed}
            className="w-full text-left py-3 px-4 rounded-lg bg-white/10 text-white/90 active:bg-white/20"
          >
            Reset to defaults (reload catalog, clear watchlist &amp; history)
          </button>
        </section>
      </div>
    </div>
  );
}
