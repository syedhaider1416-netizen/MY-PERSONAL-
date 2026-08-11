import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { process } from "@/content";

export function Process() {
  return (
    <section id="process" className="border-b border-line bg-raised/30">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pl-28 lg:pr-12 md:py-28">
        <SectionHeading index="05" label="How it works" title="Four steps, in order" />

        <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
          {process.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 0.08}>
              <div className="border-t border-accent-dim pt-5">
                <span className="font-mono text-sm text-accent">{step.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-primary">
                  {step.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
