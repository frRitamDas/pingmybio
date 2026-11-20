/**
 * Fixed film-grain overlay — a faint analog texture over the whole
 * site. Pure CSS, zero JS, zero pointer events. Gives the B&W
 * system that "printed" premium feel.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-soft-light"
      style={{ backgroundImage: NOISE, backgroundSize: "180px 180px" }}
    />
  );
}
