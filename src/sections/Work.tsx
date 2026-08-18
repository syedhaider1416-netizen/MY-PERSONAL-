import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { work } from "@/content";

export function Work() {
  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pl-28 lg:pr-12 md:py-28">
        <SectionHeading
          index="04"
          label="Selected work"
          title="Live products, not mockups"
          description="Built and deployed solo — schema, backend, auth, UI, deployment."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {work.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex h-full flex-col justify-between rounded-sm border border-line bg-raised/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent-dim md:p-8 ${
                  project.featured ? "md:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="font-mono text-2xs tracking-wide text-accent">
                      {project.kind}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-lg text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      →
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary md:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-[1rem]">
                    {project.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-line px-2.5 py-1 font-mono text-2xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
