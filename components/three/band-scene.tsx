"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SceneBoundary } from "./scene-boundary";
import type { SceneAlign, SceneVariant } from "./scene-canvas";

const SceneCanvas = dynamic(
  () => import("./scene-canvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

/**
 * Ambient WebGL layer for ink bands. Decorative only — aria-hidden,
 * pointer-transparent, and never mounted when the user prefers
 * reduced motion (the band keeps its dot-grid + gradient instead).
 */
export function BandScene({
  variant = "orb",
  align = "right",
  sparkles,
  className,
}: {
  variant?: SceneVariant;
  align?: SceneAlign;
  sparkles?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <SceneBoundary>
        <SceneCanvas variant={variant} align={align} sparkles={sparkles} />
      </SceneBoundary>
    </div>
  );
}
