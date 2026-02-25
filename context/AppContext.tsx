"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Title, WatchlistItem, WatchedItem, ProgressItem } from "@/app/types";
import {
  getCatalog,
  setCatalog,
  getWatchlist,
  setWatchlist,
  getWatched,
  setWatched,
  getProgress,
  setProgress,
  getRecentSearches,
  setRecentSearches,
} from "@/app/lib/storage";
import {
  initCatalogFromSeed,
  getSeedTitles,
  resetCatalogToSeed,
} from "@/app/lib/seed";

interface AppContextValue {
  catalog: Title[];
  watchlist: WatchlistItem[];
  watched: WatchedItem[];
  progress: ProgressItem[];
  recentSearches: string[];
  addToWatchlist: (id: string, type: "movie" | "tv") => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  markWatched: (
    id: string,
    type: "movie" | "tv",
    rating?: number,
    note?: string
  ) => void;
  unmarkWatched: (id: string) => void;
  isWatched: (id: string) => boolean;
  setProgressForTitle: (
    id: string,
    type: "movie" | "tv",
    data: Partial<Omit<ProgressItem, "id" | "type">>
  ) => void;
  getTitleById: (id: string) => Title | undefined;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  resetToSeed: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalogState] = useState<Title[]>([]);
  const [watchlist, setWatchlistState] = useState<WatchlistItem[]>([]);
  const [watched, setWatchedState] = useState<WatchedItem[]>([]);
  const [progress, setProgressState] = useState<ProgressItem[]>([]);
  const [recentSearches, setRecentSearchesState] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCatalogState(getCatalog());
    setWatchlistState(getWatchlist());
    setWatchedState(getWatched());
    setProgressState(getProgress());
    setRecentSearchesState(getRecentSearches());
    initCatalogFromSeed();
    setCatalogState(getCatalog());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setCatalog(catalog);
  }, [catalog, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setWatchlist(watchlist);
  }, [watchlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setWatched(watched);
  }, [watched, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setProgress(progress);
  }, [progress, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setRecentSearches(recentSearches);
  }, [recentSearches, hydrated]);

  const addToWatchlist = useCallback((id: string, type: "movie" | "tv") => {
    setWatchlistState((prev) => {
      if (prev.some((i) => i.id === id)) return prev;
      return [...prev, { id, type, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setWatchlistState((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInWatchlist = useCallback(
    (id: string) => watchlist.some((i) => i.id === id),
    [watchlist]
  );

  const markWatched = useCallback(
    (id: string, type: "movie" | "tv", rating?: number, note?: string) => {
      setWatchedState((prev) => {
        const filtered = prev.filter((i) => i.id !== id);
        return [
          ...filtered,
          { id, type, watchedAt: new Date().toISOString(), rating, note },
        ];
      });
      setWatchlistState((prev) => prev.filter((i) => i.id !== id));
    },
    []
  );

  const unmarkWatched = useCallback((id: string) => {
    setWatchedState((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isWatched = useCallback(
    (id: string) => watched.some((i) => i.id === id),
    [watched]
  );

  const setProgressForTitle = useCallback(
    (
      id: string,
      type: "movie" | "tv",
      data: Partial<Omit<ProgressItem, "id" | "type">>
    ) => {
      setProgressState((prev) => {
        const rest = prev.filter((i) => i.id !== id);
        const existing = prev.find((i) => i.id === id);
        const next: ProgressItem = {
          id,
          type,
          updatedAt: new Date().toISOString(),
          ...existing,
          ...data,
        };
        return [...rest, next];
      });
    },
    []
  );

  const getTitleById = useCallback(
    (id: string) => catalog.find((t) => t.id === id),
    [catalog]
  );

  const addRecentSearch = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    setRecentSearchesState((prev) => {
      const next = [q, ...prev.filter((x) => x !== q)];
      return next.slice(0, 10);
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearchesState([]);
    setRecentSearches([]);
  }, []);

  const resetToSeed = useCallback(() => {
    resetCatalogToSeed();
    setCatalogState(getSeedTitles());
    setWatchlistState([]);
    setWatchedState([]);
    setProgressState([]);
    setWatchlist([]);
    setWatched([]);
    setProgress([]);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      catalog,
      watchlist,
      watched,
      progress,
      recentSearches,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      markWatched,
      unmarkWatched,
      isWatched,
      setProgressForTitle,
      getTitleById,
      addRecentSearch,
      clearRecentSearches,
      resetToSeed,
    }),
    [
      catalog,
      watchlist,
      watched,
      progress,
      recentSearches,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      markWatched,
      unmarkWatched,
      isWatched,
      setProgressForTitle,
      getTitleById,
      addRecentSearch,
      clearRecentSearches,
      resetToSeed,
    ]
  );

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
