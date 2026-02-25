import type { Title, WatchlistItem, WatchedItem, ProgressItem } from "../types";

const CATALOG_KEY = "movie-watchlist-catalog";
const WATCHLIST_KEY = "movie-watchlist-items";
const WATCHED_KEY = "movie-watchlist-watched";
const PROGRESS_KEY = "movie-watchlist-progress";
const RECENT_SEARCHES_KEY = "movie-watchlist-recent-searches";
const MAX_RECENT_SEARCHES = 10;

function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}
function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

export function getCatalog(): Title[] {
  try {
    const raw = safeGetItem(CATALOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setCatalog(titles: Title[]): void {
  safeSetItem(CATALOG_KEY, JSON.stringify(titles));
}

export function getWatchlist(): WatchlistItem[] {
  try {
    const raw = safeGetItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setWatchlist(items: WatchlistItem[]): void {
  safeSetItem(WATCHLIST_KEY, JSON.stringify(items));
}

export function getWatched(): WatchedItem[] {
  try {
    const raw = safeGetItem(WATCHED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setWatched(items: WatchedItem[]): void {
  safeSetItem(WATCHED_KEY, JSON.stringify(items));
}

export function getProgress(): ProgressItem[] {
  try {
    const raw = safeGetItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setProgress(items: ProgressItem[]): void {
  safeSetItem(PROGRESS_KEY, JSON.stringify(items));
}

export function getRecentSearches(): string[] {
  try {
    const raw = safeGetItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setRecentSearches(queries: string[]): void {
  safeSetItem(RECENT_SEARCHES_KEY, JSON.stringify(queries.slice(0, MAX_RECENT_SEARCHES)));
}
