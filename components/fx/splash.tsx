"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { LogoMark } from "@/components/site/logo";

const KEY = "pmg-splash-seen";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * ~1.4s brand wipe shown once per session: black, the ping mark,
 * the wordmark, and a scanning line. Click or any key skips it.
 * Never shown to reduced-motion users.
 */
export function Splash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let seen: string | null = null;
    try {
      seen = window.sessionStorage.getItem(KEY);
    } catch {
      /* private mode — fall through, show once */
    }
    if (reduced || seen) return;

    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(true);

    const timer = window.setTimeout(() => setShow(false), 1500);
    const skip = () => setShow(false);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pmg-splash"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{
            y: "-100%",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-5"
          >
            <motion.div variants={item}>
              <LogoMark size={56} className="text-[#f5f5f7]" />
            </motion.div>
            <motion.p
              variants={item}
              className="pl-[0.52em] font-mono text-[0.78rem] uppercase tracking-[0.52em] text-white/90"
            >
              PingMyBio
            </motion.p>
            <span className="block h-px w-44 overflow-hidden bg-white/10">
              <motion.span
                className="block h-full origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <motion.p
              variants={item}
              className="pl-[0.3em] font-mono text-[0.52rem] uppercase tracking-[0.3em] text-white/40"
            >
              Your bio, now intelligent
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
