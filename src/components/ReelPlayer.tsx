"use client";

import { useRef, useState } from "react";

export function ReelPlayer({
  title,
  kind,
  videoSrc,
  poster,
  orientation = "portrait",
}: {
  title: string;
  kind: string;
  videoSrc: string;
  poster?: string;
  orientation?: "portrait" | "landscape";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play();
    setPlaying(true);
  };

  return (
    <figure className="flex flex-col">
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-line bg-inset shadow-2xl shadow-black/40 ${
          orientation === "landscape" ? "aspect-video" : "aspect-[9/16]"
        }`}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          poster={poster || undefined}
          controls={playing}
          muted={!playing}
          playsInline
          onPause={() => setPlaying(false)}
          // Without a poster the tile would be an empty box, so pull just enough
          // to paint the first frame.
          preload={poster ? "none" : "metadata"}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {!playing ? (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex items-center justify-center bg-inset/30 transition-colors duration-200 hover:bg-inset/10"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-base/70 backdrop-blur-sm transition-transform duration-200 group-hover:scale-105 md:h-20 md:w-20">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-6 w-6 text-accent md:h-7 md:w-7"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>
      <figcaption className="mt-4 text-center">
        <span className="block text-sm text-primary">{title}</span>
        <span className="mt-1 block font-mono text-2xs text-muted">{kind}</span>
      </figcaption>
    </figure>
  );
}
