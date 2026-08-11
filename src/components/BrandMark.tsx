import { Logo } from "@/components/Logo";

export function BrandMark() {
  return (
    <a
      href="#hero"
      aria-label="Back to top"
      className="group fixed left-6 top-6 z-50 flex items-center gap-2 rounded-sm transition-opacity duration-200 hover:opacity-80"
    >
      <Logo size={26} />
    </a>
  );
}
