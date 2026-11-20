import { cn } from "@/lib/utils";

/**
 * Giant hollow outline word sitting behind a section — the
 * graphic-design punch of award sites, kept inside the B&W system.
 */
export function Watermark({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pmg-outline pointer-events-none absolute z-0 select-none whitespace-nowrap font-extrabold leading-none tracking-[-0.045em]",
        className
      )}
      style={{ fontSize: "clamp(5.5rem, 16vw, 14rem)" }}
    >
      {text}
    </div>
  );
}
