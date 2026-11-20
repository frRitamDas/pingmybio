"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Giant hollow outline word behind a section — the graphic-design
 * punch of award sites, kept inside the B&W system. Drifts slowly
 * against scroll direction for extra depth.
 */
export function Watermark({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.6,
  });
  const x = useTransform(smooth, [0, 1], ["4%", "-4%"]);

  return (
    <motion.div
      aria-hidden="true"
      style={reduced ? undefined : { x }}
      className={cn(
        "pmg-outline pointer-events-none absolute z-0 select-none whitespace-nowrap font-extrabold leading-none tracking-[-0.045em]",
        className
      )}
    >
      <span
        style={{ fontSize: "clamp(5.5rem, 16vw, 14rem)" }}
        className="block"
      >
        {text}
      </span>
    </motion.div>
  );
}
