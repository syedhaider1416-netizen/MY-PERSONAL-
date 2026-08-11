"use client";

import { useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { videoReel } from "@/content";

export function VideoReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play();
    setPlaying(true);
  };

  return (
    <section id="reel" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pl-28 lg:pr-12 md:py-28">
        <SectionHeading
          index="02"
          label="Reel"
          title={videoReel.title}
          description={videoReel.description}
        />

        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-lg border border-line bg-inset shadow-2xl shadow-black/40 md:max-w-[380px]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={videoReel.poster}
              controls={playing}
              muted={!playing}
              playsInline
              onPause={() => setPlaying(false)}
              preload="none"
            >
              <source src={videoReel.videoSrc} type="video/mp4" />
            </video>

            {!playing ? (
              <button
                type="button"
                onClick={handlePlay}
                aria-label={`Play video: ${videoReel.title}`}
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
          <p className="mx-auto mt-4 max-w-[340px] text-center font-mono text-2xs text-muted md:max-w-[380px]">
            {videoReel.kind}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
