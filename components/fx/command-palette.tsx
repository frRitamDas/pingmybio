"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Command } from "cmdk";
import {
  Home,
  Tag,
  MonitorPlay,
  Newspaper,
  ShieldCheck,
  ScrollText,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Icon = React.ComponentType<{ className?: string }>;

const InstagramIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const TikTokIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M14.5 3c.4 2.1 2.1 3.8 4.3 4.2v3.1c-1.6 0-3.1-.5-4.3-1.4v6.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .7 0 1 .1v3.3a2.2 2.2 0 1 0 1.4 2.1V3h3z" />
  </svg>
);
const YouTubeIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
    <path d="M10.5 9.8v4.4l3.8-2.2-3.8-2.2z" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4 4h3.6l6.2 9L18.6 4H21l-6.4 8.6L21.4 20h-3.6l-6.4-9.3L5.2 20H3l6.9-9.3L4 4z" />
  </svg>
);

const NAVIGATE = [
  { label: "Home", href: "/", icon: Home, hint: "/" },
  { label: "Pricing", href: "/pricing", icon: Tag, hint: "/pricing" },
  { label: "App preview", href: "/app", icon: MonitorPlay, hint: "/app" },
  { label: "Blog — The Bio Playbook", href: "/blog", icon: Newspaper, hint: "/blog" },
  { label: "Privacy", href: "/privacy", icon: ShieldCheck, hint: "/privacy" },
  { label: "Terms", href: "/terms", icon: ScrollText, hint: "/terms" },
];

const ACTIONS = [
  { label: "Create my page — it's free", href: "/app", icon: Sparkles, hint: "start" },
  { label: "See plans & pricing", href: "/pricing", icon: ArrowRight, hint: "plans" },
  { label: "Read the playbook", href: "/blog", icon: Newspaper, hint: "read" },
];

const ELSEWHERE = [
  { label: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon, hint: "social" },
  { label: "TikTok", href: "https://www.tiktok.com", icon: TikTokIcon, hint: "social" },
  { label: "YouTube", href: "https://www.youtube.com", icon: YouTubeIcon, hint: "social" },
  { label: "X / Twitter", href: "https://www.x.com", icon: XIcon, hint: "social" },
];

/** Open programmatically from the header pill. */
export const PALETTE_EVENT = "pmg:palette";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onCustom = () => setOpen((v) => !v);
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onCustom);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  const renderItem = (item: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    hint: string;
  }) => (
    <Command.Item
      key={item.label}
      value={item.label}
      onSelect={() => go(item.href)}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 outline-none aria-selected:bg-white/10 aria-selected:text-white"
    >
      <item.icon className="h-4 w-4 text-white/55" />
      <span className="flex-1">{item.label}</span>
      <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.6rem] text-white/35">
        {item.hint}
      </kbd>
    </Command.Item>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="pmg-palette"
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Quick navigation"
        >
          {/* backdrop */}
          <button
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative mx-auto mt-[14vh] w-full max-w-lg overflow-hidden rounded-2xl border border-white/12 bg-[#101014] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
          >
            <Command
              label="Quick navigation"
              loop
              className="[&_[cmdk-input-wrapper]]:border-b [&_[cmdk-input-wrapper]]:border-white/8"
            >
              <div className="flex items-center gap-3 px-4">
                <Search className="h-4 w-4 flex-none text-white/40" aria-hidden="true" />
                <Command.Input
                  autoFocus
                  placeholder="Where to? Search pages, actions, links…"
                  className="h-14 w-full bg-transparent text-[0.95rem] text-white placeholder-white/30 outline-none"
                />
                <kbd className="flex-none rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[0.62rem] text-white/40">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[22rem] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-white/35">
                  Nothing matches that — yet.
                </Command.Empty>
                <Command.Group
                  heading="Navigate"
                  className="px-1 pb-1 pt-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-white/30 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2"
                >
                  {NAVIGATE.map(renderItem)}
                </Command.Group>
                <Command.Group
                  heading="Actions"
                  className="px-1 pb-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-white/30 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2"
                >
                  {ACTIONS.map(renderItem)}
                </Command.Group>
                <Command.Group
                  heading="Elsewhere"
                  className="px-1 pb-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-white/30 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2"
                >
                  {ELSEWHERE.map(renderItem)}
                </Command.Group>
              </Command.List>
              <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/30">
                <span>↑↓ navigate · ↵ open</span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">⌘</kbd>K
                  <span className="normal-case tracking-normal text-white/25">anywhere</span>
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Small ⌘K pill for the header. */
export function PaletteTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
      aria-label="Open quick navigation (Command K)"
      className={cn(
        "h-9 items-center gap-2 rounded-full border border-border px-3 text-[0.72rem] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
        className
      )}
    >
      <Search className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="hidden lg:inline">Search</span>
      <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.62rem]">
        ⌘K
      </kbd>
    </button>
  );
}
