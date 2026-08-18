import { Reveal } from "@/components/Reveal";
import { contact } from "@/content";

export function Contact() {
  return (
    <section id="contact" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:pl-28 lg:pr-12 md:py-32">
        <Reveal>
          <span className="font-mono text-xs text-accent">{"// 06 — CONTACT"}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-primary md:text-4xl">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-md text-base text-muted md:text-lg">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-sm border border-accent/40 bg-accent/[0.06] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent md:p-8"
          >
            <span className="font-mono text-2xs tracking-wide text-accent">
              {contact.whatsapp.label} — fastest response
            </span>
            <span className="flex items-center gap-3 font-display text-2xl font-semibold text-primary md:text-3xl">
              {contact.whatsapp.value}
              <span
                aria-hidden="true"
                className="font-mono text-xl text-accent transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.16} className="mt-4 grid gap-4 sm:grid-cols-3">
          <a
            href={contact.email.href}
            className="flex flex-col gap-1 rounded-sm border border-line p-5 transition-colors duration-200 hover:border-accent-dim"
          >
            <span className="font-mono text-2xs tracking-wide text-muted">
              {contact.email.label}
            </span>
            <span className="text-base text-primary">{contact.email.value}</span>
          </a>
          <a
            href={contact.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 rounded-sm border border-line p-5 transition-colors duration-200 hover:border-accent-dim"
          >
            <span className="font-mono text-2xs tracking-wide text-muted">
              {contact.linkedin.label}
            </span>
            <span className="text-base text-primary">{contact.linkedin.value}</span>
          </a>
          <a
            href={contact.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 rounded-sm border border-line p-5 transition-colors duration-200 hover:border-accent-dim"
          >
            <span className="font-mono text-2xs tracking-wide text-muted">
              {contact.instagram.label}
            </span>
            <span className="text-base text-primary">{contact.instagram.value}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
