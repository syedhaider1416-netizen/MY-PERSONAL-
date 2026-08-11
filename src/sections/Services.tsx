import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content";

export function Services() {
  return (
    <section id="services" className="border-b border-line bg-raised/30">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pl-28 lg:pr-12 md:py-28">
        <SectionHeading
          index="03"
          label="Services"
          title="What I build"
          description="Five capabilities, one pipeline. Most clients need two or three of these working together."
        />

        <ul className="divide-y divide-line border-t border-line">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 0.05}>
              <div className="group grid gap-4 py-8 transition-colors duration-200 md:grid-cols-[80px_1fr_1fr] md:gap-8 md:py-10">
                <span className="font-mono text-sm text-accent-dim">{service.index}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-primary md:text-2xl">
                    {service.name}
                  </h3>
                  <span className="mt-2 inline-block font-mono text-2xs tracking-wide text-muted">
                    {service.tag}
                  </span>
                </div>
                <div>
                  <p className="text-base font-medium text-primary">{service.pitch}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
