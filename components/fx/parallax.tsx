"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

/**
 * Hero scroll parallax — content drifts and fades slower/faster
 * than the page scroll, creating layered cinematic depth.
 */
export function Parallax({
  children,
  className,
  distance = 120,
  fade = false,
}: {
  children: ReactNode;
  className?: string;
  /** Pixels of drift over the first ~700px of scroll. */
  distance?: number;
  fade?: boolean;
}) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 120, damping: 22, mass: 0.3 });
  const y = useTransform(smooth, [0, 700], [0, distance]);
  const opacity = useTransform(smooth, [0, 480], [1, 0.12]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ y, ...(fade ? { opacity } : null) }}
    >
      {children}
    </motion.div>
  );
}
