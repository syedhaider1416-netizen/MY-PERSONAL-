type LogoProps = {
  size?: number;
  className?: string;
};

/**
 * Three input paths converge on a grid to a single node, then continue as
 * one output line — signal consolidating into a system. The already-direct
 * middle path plus the merged output are the "active path," carried in accent.
 */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Syed Shabih Haider logo"
    >
      <path
        d="M4 8 H14 V16"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M4 24 H14 V16"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M4 16 H28"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <rect x="12.5" y="14.5" width="3" height="3" fill="var(--accent)" />
    </svg>
  );
}
