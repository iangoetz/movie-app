"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
  return match ? match[1] : null;
}

type TrailerState = {
  videoId: string;
  movieTitle: string;
} | null;

type TrailerContextValue = {
  openTrailer: (url: string, title: string) => void;
  closeTrailer: () => void;
};

const TrailerContext = createContext<TrailerContextValue | null>(null);

export function useTrailer() {
  const ctx = useContext(TrailerContext);
  if (!ctx) throw new Error("useTrailer must be used within TrailerProvider");
  return ctx;
}

export function TrailerProvider({ children }: { children: React.ReactNode }) {
  const [trailer, setTrailer] = useState<TrailerState>(null);

  const openTrailer = useCallback((url: string, title: string) => {
    const videoId = getYouTubeEmbedId(url);
    if (videoId) setTrailer({ videoId, movieTitle: title });
  }, []);

  const closeTrailer = useCallback(() => setTrailer(null), []);

  return (
    <TrailerContext.Provider value={{ openTrailer, closeTrailer }}>
      {children}
      {trailer && (
        <TrailerModal
          videoId={trailer.videoId}
          movieTitle={trailer.movieTitle}
          onClose={closeTrailer}
        />
      )}
    </TrailerContext.Provider>
  );
}

function TrailerModal({
  videoId,
  movieTitle,
  onClose,
}: {
  videoId: string;
  movieTitle: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video trailer"
    >
      <div
        className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 rounded-full bg-slate-700 p-2 text-white hover:bg-slate-600"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={`${movieTitle} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
