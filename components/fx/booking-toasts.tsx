"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  ShoppingBag,
  Briefcase,
  MessagesSquare,
  Zap,
  X,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";

const EVENTS = [
  { icon: CalendarClock, text: "Maya booked 1:1 Creator Coaching", meta: "via Assistant · $240 · just now" },
  { icon: ShoppingBag, text: "New offer sold: Presets Bundle", meta: "via your page · $49 · 4m ago" },
  { icon: Briefcase, text: "Atelier Marlowe sent a collab brief", meta: "Work with me · research attached · 9m ago" },
  { icon: MessagesSquare, text: "Your assistant answered 38 fans today", meta: "across PingMyBio · while you slept" },
  { icon: Zap, text: "FRAME&CO claimed their link", meta: "pingmybio.com/frame · 1h ago" },
];

const OFF_KEY = "pmg-toasts-off";
const VISIBLE_MS = 5200;
const REARM_MS = 2200;
const GAP_MS = 900;
const START_DELAY_MS = 6500;

/**
 * Bottom-left "what just happened on PingMyBio" pulse toasts.
 * One at a time, spring entrance, hover pauses the rotation,
 * X dismisses for the session, reduced-motion users see nothing.
 */
export function BookingToasts() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(-1);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advance = useRef<() => void>(() => {});

  useEffect(() => {
    if (reduced) return;
    try {
      if (window.sessionStorage.getItem(OFF_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    let showTimer: ReturnType<typeof setTimeout>;
    let i = 0;

    const scheduleHide = (ms: number) => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setIndex(-1);
        hideTimer.current = null;
        i += 1;
        showTimer = setTimeout(show, GAP_MS);
      }, ms);
    };

    const show = () => {
      setIndex(i % EVENTS.length);
      scheduleHide(VISIBLE_MS);
    };

    advance.current = () => {
      // re-arm a short hide after hover pause
      scheduleHide(REARM_MS);
    };

    showTimer = setTimeout(show, START_DELAY_MS);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [reduced]);

  const onEnter = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(OFF_KEY, "1");
    } catch {
      /* ignore */
    }
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setIndex(-1);
  };

  if (reduced) return null;

  const active = index >= 0 ? EVENTS[index] : null;

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-4 z-[70] sm:left-6">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 34, scale: 0.92, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, scale: 0.96, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onPointerEnter={onEnter}
            onPointerLeave={() => advance.current()}
            className="pointer-events-auto relative flex max-w-[300px] items-start gap-3 rounded-2xl border border-white/12 bg-ink p-3.5 pr-9 text-ink-foreground shadow-[0_24px_70px_-18px_rgba(0,0,0,0.75)]"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/10">
              <active.icon className="h-4 w-4 text-white" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.78rem] font-semibold leading-snug text-white/95">
                {active.text}
              </span>
              <span className="mt-1 block font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/40">
                {active.meta}
              </span>
            </span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Hide these notifications"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-ink text-white/60 transition-colors hover:text-white"
            >
              <X className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
