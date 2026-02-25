"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function ProfilePage() {
  const { watchlist, watched } = useApp();

  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      <header className="sticky top-0 z-10 bg-[#0c0c0e]/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center h-14 px-4">
          <h1 className="text-xl font-semibold text-white">Profile</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl text-white/60">
            ○
          </div>
          <div>
            <p className="font-medium text-white">You</p>
            <p className="text-sm text-white/50">Movie watcher</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-2xl font-semibold text-white">
              {watchlist.length}
            </p>
            <p className="text-sm text-white/50">In watchlist</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-2xl font-semibold text-white">
              {watched.length}
            </p>
            <p className="text-sm text-white/50">Watched</p>
          </div>
        </div>

        <nav className="space-y-1">
          <Link
            href="/now-watching"
            className="flex items-center justify-between py-3 px-4 rounded-lg active:bg-white/10 text-white/90"
          >
            <span>Now watching</span>
            <span>→</span>
          </Link>
          <Link
            href="/history"
            className="flex items-center justify-between py-3 px-4 rounded-lg active:bg-white/10 text-white/90"
          >
            <span>History / Watched</span>
            <span>→</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-between py-3 px-4 rounded-lg active:bg-white/10 text-white/90"
          >
            <span>Settings</span>
            <span>→</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
