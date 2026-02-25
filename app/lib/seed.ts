import type { Title } from "../types";
import { setCatalog } from "./storage";
import seedData from "../data/seed.json";

const titles = (seedData as { titles: Title[] }).titles;

export function getSeedTitles(): Title[] {
  return titles;
}

export function initCatalogFromSeed(): void {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem("movie-watchlist-catalog");
  if (!existing || existing === "[]") {
    setCatalog(getSeedTitles());
  }
}

export function resetCatalogToSeed(): void {
  setCatalog(getSeedTitles());
}
