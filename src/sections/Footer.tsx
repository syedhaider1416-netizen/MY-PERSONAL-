import { site } from "@/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-8 lg:pl-28 lg:pr-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 font-mono text-2xs text-muted sm:flex-row sm:items-center">
        <span>
          {site.name} — {site.title}
        </span>
        <span>&copy; {year}</span>
      </div>
    </footer>
  );
}
