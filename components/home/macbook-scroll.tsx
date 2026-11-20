"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { SceneBoundary } from "@/components/three/scene-boundary";

const MacbookCanvas = dynamic(
  () => import("@/components/three/macbook-canvas").then((m) => m.MacbookCanvas),
  { ssr: false }
);

const BEATS = [
  {
    num: "01",
    eyebrow: "The Studio",
    title: "One black mirror.\\nYour whole business.",
    body: "Profile, assistant, offers, collabs, inbox — the PingMyBio Studio is the nerve center behind your link.",
    position: "left-[6%] top-[24%] text-left",
  },
  {
    num: "02",
    eyebrow: "The Page",
    title: "The lid lifts.\\nYour storefront boots.",
    body: "pingmybio.com/you — answering fans from your knowledge, routing them to the call, the course, the freebie.",
    position: "right-[6%] top-[34%] text-right",
  },
  {
    num: "03",
    eyebrow: "The Booking",
    title: "You take the booking.\\nNot the comments.",
    body: "Sales, calls and collab briefs land while you shoot. Zero tabs open required.",
    position: "left-[6%] bottom-[17%] text-left",
  },
];

/**
 * Apple-style pinned scroll sequence: the MacBook lid opens as you
 * scroll, the camera dollies in, and three copy beats fade through.
 * Reduced-motion users get a static, stacked version instead.
 */
export function MacbookScroll() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  useMotionValueEvent(smooth, "change", (v) => {
    progressRef.current = v;
  });

  const cueOpacity = useTransform(smooth, [0, 0.07], [1, 0]);
  const eyebrowOpacity = useTransform(smooth, [0, 0.06, 0.16, 0.24], [0, 1, 1, 0]);

  const b1Opacity = useTransform(smooth, [0.05, 0.15, 0.32, 0.42], [0, 1, 1, 0]);
  const b1Y = useTransform(smooth, [0.05, 0.19], [44, 0]);
  const b2Opacity = useTransform(smooth, [0.38, 0.48, 0.6, 0.7], [0, 1, 1, 0]);
  const b2Y = useTransform(smooth, [0.38, 0.52], [44, 0]);
  const b3Opacity = useTransform(smooth, [0.66, 0.76, 0.99], [0, 1, 1]);
  const b3Y = useTransform(smooth, [0.66, 0.8], [44, 0]);

  if (reduced) {
    return (
      <section
        aria-label="The PingMyBio Studio — your business on one black mirror"
        className="border-t border-white/5 bg-[#000] text-ink-foreground"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <div aria-hidden="true" className="h-[340px] w-full sm:h-[420px]">
            <SceneBoundary>
              <MacbookCanvas mode="hero" />
            </SceneBoundary>
          </div>
          <div className="space-y-8">
            {BEATS.map((beat) => (
              <div key={beat.num}>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.3em] text-ink-muted">
                  {beat.num} — {beat.eyebrow}
                </p>
                <h3 className="mt-2 whitespace-pre-line text-2xl font-semibold leading-[1.05] tracking-[-0.02em]">
                  {beat.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                  {beat.body}
                </p>
              </div>
            ))}
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-6 py-3 text-sm font-semibold text-[#0a0a0a]"
            >
              Claim pingmybio.com/you
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const beatMotion = [
    { opacity: b1Opacity, y: b1Y },
    { opacity: b2Opacity, y: b2Y },
    { opacity: b3Opacity, y: b3Y },
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="The PingMyBio Studio — scroll to open the MacBook"
      className="relative h-[280vh] border-t border-white/5 bg-[#000] text-ink-foreground"
    >
      <h2 className="sr-only">
        The PingMyBio Studio — one black mirror for your whole creator business
      </h2>

      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* 3D stage */}
        <div aria-hidden="true" className="absolute inset-0">
          <SceneBoundary>
            <MacbookCanvas mode="scroll" progressRef={progressRef} />
          </SceneBoundary>
        </div>

        {/* hollow watermark */}
        <div
          aria-hidden="true"
          className="pmg-outline pointer-events-none absolute -right-4 bottom-4 select-none whitespace-nowrap font-extrabold leading-none tracking-[-0.045em]"
          style={{ fontSize: "clamp(5rem, 15vw, 13rem)" }}
        >
          ONE LINK
        </div>

        {/* top eyebrow — fades once the journey starts */}
        <motion.p
          style={{ opacity: eyebrowOpacity }}
          className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.34em] text-white/55"
        >
          The PingMyBio Studio
        </motion.p>

        {/* copy beats */}
        {BEATS.map((beat, i) => (
          <motion.div
            key={beat.num}
            style={{ opacity: beatMotion[i].opacity, y: beatMotion[i].y }}
            className={`pointer-events-none absolute max-w-[17rem] sm:max-w-xs ${beat.position}`}
          >
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.3em] text-ink-muted">
              <span className="text-white/70">{beat.num}</span> — {beat.eyebrow}
            </p>
            <p className="mt-3 whitespace-pre-line text-2xl font-semibold leading-[1.04] tracking-[-0.025em] sm:text-3xl lg:text-4xl">
              {beat.title}
            </p>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-muted sm:text-sm">
              {beat.body}
            </p>
            {i === 2 && (
              <Link
                href="/app"
                className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-5 py-2.5 text-[0.83rem] font-semibold text-[#0a0a0a] transition-colors hover:bg-white"
              >
                Claim pingmybio.com/you
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </motion.div>
        ))}

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.34em] text-white/55">
            Scroll to open
          </span>
          <span className="relative block h-14 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute left-0 top-0 block h-6 w-px bg-white"
              animate={{ y: [-24, 56] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
