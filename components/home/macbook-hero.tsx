"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { PhoneMock } from "@/components/home/phone-mock";
import { SceneBoundary } from "@/components/three/scene-boundary";

const MacbookCanvas = dynamic(
  () => import("@/components/three/macbook-canvas").then((m) => m.MacbookCanvas),
  { ssr: false }
);

/**
 * Hero centerpiece: a procedural Aluminum MacBook running the
 * PingMyBio Studio on its screen. Reduced-motion users keep the
 * classic CSS phone mock instead.
 */
export function MacbookHero() {
  const reduced = useReducedMotion();

  if (reduced) {
    return <PhoneMock />;
  }

  return (
    <div
      aria-hidden="true"
      className="mx-auto h-[380px] w-full max-w-[560px] sm:h-[440px] lg:h-[520px]"
    >
      <MacbookCanvas mode="hero" />
    </div>
  );
}
