import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-4 flex items-center gap-3 border-t border-line pt-6">
        <span className="font-mono text-xs text-accent">
          {`// ${index} — ${label.toUpperCase()}`}
        </span>
      </div>
      <h2 className="font-display text-2xl font-semibold leading-tight text-primary md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-base text-muted md:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
