"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling (Lenis) for the whole site.
 * Disabled entirely for reduced-motion users. Anchor links
 * (#features, #faq…) are intercepted and eased by Lenis itself.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
