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
      className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[440px] lg:h-[520px]"
    >
      {/* sonar ping — the brand pulse, behind the machine */}
      <div className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
        <span className="pmg-ring absolute left-0 top-0 -ml-[5.5rem] -mt-[5.5rem] h-44 w-44 rounded-full border border-white/20" />
        <span className="pmg-ring pmg-ring--2 absolute left-0 top-0 -ml-[5.5rem] -mt-[5.5rem] h-44 w-44 rounded-full border border-white/10" />
        <span className="pmg-ring pmg-ring--3 absolute left-0 top-0 -ml-[5.5rem] -mt-[5.5rem] h-44 w-44 rounded-full border border-white/5" />
      </div>
      <SceneBoundary fallback={<PhoneMock />}>
        <MacbookCanvas mode="hero" />
      </SceneBoundary>
    </div>
  );
}
