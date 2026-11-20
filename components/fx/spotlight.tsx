"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Cursor-tracking radial spotlight for cards. Sets --sx/--sy CSS
 * vars on pointer move; a soft light pool follows the cursor
 * across the card surface. Pointer-fine only.
 */
export function Spotlight({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  /** "light" = dark glow for white cards · "dark" = white glow for ink cards */
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const glow =
    tone === "dark" ? "rgba(255,255,255,0.13)" : "rgba(17,17,17,0.075)";

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-3xl", className)}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
      }}
    >
      {children}
      {!reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background: `radial-gradient(400px circle at var(--sx, 50%) var(--sy, 50%), ${glow}, transparent 62%)`,
          }}
        />
      )}
    </div>
  );
}
