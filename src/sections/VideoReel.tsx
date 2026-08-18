import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ReelPlayer } from "@/components/ReelPlayer";
import { videoReel } from "@/content";

export function VideoReel() {
  return (
    <section id="reel" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pl-28 lg:pr-12 md:py-28">
        <SectionHeading
          index="02"
          label="Reel"
          title={videoReel.title}
          description={videoReel.description}
        />

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,300px)_1fr] md:gap-10">
          {videoReel.items.map((reel, i) => (
            <Reveal key={reel.id} delay={i * 0.08} className="mx-auto w-full max-w-[340px] md:max-w-none">
              <ReelPlayer
                title={reel.title}
                kind={reel.kind}
                videoSrc={reel.videoSrc}
                poster={reel.poster}
                orientation={reel.orientation}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
