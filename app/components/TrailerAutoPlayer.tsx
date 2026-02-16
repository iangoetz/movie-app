"use client";

import { useEffect } from "react";
import { useTrailer } from "./TrailerProvider";

export function TrailerAutoPlayer({
  trailerUrl,
  movieTitle,
  autoPlay,
}: {
  trailerUrl: string;
  movieTitle: string;
  autoPlay: boolean;
}) {
  const { openTrailer } = useTrailer();

  useEffect(() => {
    if (autoPlay && trailerUrl) {
      openTrailer(trailerUrl, movieTitle);
    }
  }, [autoPlay, trailerUrl, movieTitle, openTrailer]);

  return null;
}
