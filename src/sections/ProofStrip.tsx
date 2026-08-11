import { Reveal } from "@/components/Reveal";
import { proof } from "@/content";

export function ProofStrip() {
  return (
    <section id="proof" className="border-b border-line bg-raised/40">
      <Reveal className="mx-auto max-w-6xl px-6 py-8 lg:pl-28 lg:pr-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted md:text-sm">
          {proof.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              <span className="text-primary">{item}</span>
              {i < proof.length - 1 ? <span className="text-accent-dim">·</span> : null}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
