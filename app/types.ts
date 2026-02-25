export type TitleType = "movie" | "tv";

export interface Title {
  id: string;
  type: TitleType;
  title: string;
  posterPath: string;
  year: number;
  runtime: number;
  overview: string;
  genres: string[];
  releaseDate?: string;
  seasons?: number;
}

export interface WatchlistItem {
  id: string;
  type: TitleType;
  addedAt: string;
  priority?: number;
}

export interface WatchedItem {
  id: string;
  type: TitleType;
  watchedAt: string;
  rating?: number;
  note?: string;
}

export interface ProgressItem {
  id: string;
  type: TitleType;
  lastEpisode?: string;
  percent?: number;
  currentTime?: number;
  updatedAt: string;
}
