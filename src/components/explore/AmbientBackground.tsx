/**
 * CSS ambient field: three drifting radial gradients over a faint grid.
 *
 * Used two ways — standalone (its own fixed container), or `embedded` as the
 * base layer beneath the WebGL aurora in LiveBackground, where the wrapper,
 * grid, veil and grain are supplied by the parent.
 *
 * No blur filters and no JS, so it stays cheap on phones and is the safe
 * fallback when WebGL is unavailable or motion is reduced.
 */
export function AmbientBackground({ embedded = false }: { embedded?: boolean }) {
  const orbs = (
    <>
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
    </>
  );

  if (embedded) return orbs;

  return (
    <div className="ambient" aria-hidden="true">
      {orbs}
      <div className="ambient-grid" />
      <div className="ambient-veil" />
      <div className="ambient-grain" />
    </div>
  );
}
