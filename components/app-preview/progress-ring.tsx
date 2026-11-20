"use client";

import { motion, useReducedMotion } from "framer-motion";

const R = 40;
const CIRC = 2 * Math.PI * R;

/** 1-of-4 setup progress ring, animated on mount. */
export function ProgressRing() {
  const reduce = useReducedMotion();
  const target = CIRC * (1 - 1 / 4);
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      role="img"
      aria-label="1 of 4 setup steps complete"
    >
      <circle cx="48" cy="48" r={R} fill="none" stroke="#e4e4e4" strokeWidth="8" />
      <motion.circle
        cx="48"
        cy="48"
        r={R}
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        initial={{ strokeDashoffset: CIRC }}
        animate={{ strokeDashoffset: reduce ? target : target }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        transform="rotate(-90 48 48)"
      />
      <text
        x="48"
        y="46"
        textAnchor="middle"
        fontSize="20"
        fontWeight="650"
        fill="#0a0a0a"
        className="tnum"
        style={{ fontFamily: "inherit" }}
      >
        1/4
      </text>
      <text
        x="48"
        y="62"
        textAnchor="middle"
        fontSize="6.2"
        letterSpacing="1.5"
        fill="#5c5c5c"
        style={{ fontFamily: "ui-monospace, monospace" }}
      >
        DONE
      </text>
    </svg>
  );
}
