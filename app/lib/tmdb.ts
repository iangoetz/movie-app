/**
 * TMDB public CDN — no API key required.
 * Poster URLs: https://image.tmdb.org/t/p/{size}{poster_path}
 */
const CDN_BASE = "https://image.tmdb.org/t/p/w500";

export function posterUrl(posterPath: string | null): string | null {
  if (!posterPath) return null;
  return `${CDN_BASE}${posterPath}`;
}
