"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";

const KB: { keys: string[]; reply: string; offer?: boolean }[] = [
  {
    keys: ["coach", "1:1", "one on one", "how much", "price", "cost"],
    reply:
      "4 weeks · $240 — Voxer access plus a weekly teardown of your page. Two slots left this month. Want the booking link?",
    offer: true,
  },
  {
    keys: ["brand", "collab", "sponsor", "partner", "work with"],
    reply:
      "Yes — tap 'Work with me' on the page, drop your brief and budget. She replies within 48h with a scope. Fair warning: she says no a lot, and brands respect it.",
  },
  {
    keys: ["free", "preset", "freebie", "download", "lead magnet"],
    reply:
      "The Lightroom preset pack is free. Tell me your email and it's yours — takes ten seconds.",
  },
  {
    keys: ["newsletter", "substack", "ping"],
    reply:
      "The Ping goes out monthly to 12,400 creators — no fluff, just what's converting. It's the second offer on the page.",
  },
  {
    keys: ["refund", "guarantee"],
    reply:
      "7-day happiness guarantee. If the first teardown week isn't it, she refunds with zero emails.",
  },
  {
    keys: ["where", "based", "location"],
    reply:
      "Maya is based in Lisbon, works with creators worldwide, and replies fastest between 8–11am CET.",
  },
];

const FALLBACK =
  "Good question — the short answer: Maya covers that in her Knowledge. Try asking about coaching, brand collabs, the freebie, or refunds.";

const SEED_FAN = "hey! how much is the 1:1 coaching?";
const SEED_AI =
  "4 weeks · $240 — Voxer access plus a weekly teardown of your page. Two slots left this month. Want the booking link?";

const CHIPS = [
  "How much is coaching?",
  "Do you work with brands?",
  "What's the freebie?",
  "Refund policy?",
];

type Msg = {
  id: number;
  who: "fan" | "ai" | "offer";
  text?: string;
};

export function LiveDemo() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, who: "fan", text: SEED_FAN },
    { id: 2, who: "ai", text: SEED_AI },
    { id: 3, who: "offer" },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const idRef = useRef(4);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeouts = useRef<number[]>([]);

  const scrollToEnd = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, typing, scrollToEnd]);

  useEffect(
    () => () => {
      timeouts.current.forEach((t) => window.clearTimeout(t));
    },
    []
  );

  const answer = useCallback((query: string) => {
    const q = query.toLowerCase();
    const hit = KB.find((entry) => entry.keys.some((k) => q.includes(k)));
    setTyping(true);
    const think = 650 + Math.random() * 700;
    timeouts.current.push(
      window.setTimeout(() => {
        setTyping(false);
        setMessages((prev) => {
          const next: Msg[] = [
            ...prev,
            { id: idRef.current++, who: "ai", text: hit ? hit.reply : FALLBACK },
          ];
          if (hit?.offer) next.push({ id: idRef.current++, who: "offer" });
          return next;
        });
      }, think)
    );
  }, []);

  const send = useCallback(
    (raw: string) => {
      const q = raw.trim();
      if (!q) return;
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, who: "fan", text: q },
      ]);
      answer(q);
    },
    [answer]
  );

  const reset = useCallback(() => {
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
    setTyping(false);
    idRef.current = 5;
    setMessages([
      { id: 1, who: "fan", text: SEED_FAN },
      { id: 2, who: "ai", text: SEED_AI },
      { id: 3, who: "offer" },
    ]);
  }, []);

  return (
    <div
      id="live-demo"
      className="overflow-hidden rounded-3xl border border-ink-border bg-ink-2 shadow-band"
    >
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-ink-border px-5 py-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <p className="text-sm font-semibold text-ink-foreground">Maya&rsquo;s Assistant</p>
        <p className="ml-auto font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-muted">
          Online — seconds
        </p>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        aria-live="polite"
        className="h-80 space-y-3 overflow-y-auto px-5 py-4"
      >
        {messages.map((msg) =>
          msg.who === "offer" ? (
            <div
              key={msg.id}
              className="rounded-2xl border border-ink-border bg-white/5 p-3"
            >
              <p className="text-[0.8rem] font-semibold text-ink-foreground">
                1:1 Creator Coaching
              </p>
              <p className="text-[0.68rem] text-ink-muted">4 weeks · $240</p>
              <p className="mt-2 rounded-lg bg-[#f5f5f7] px-3 py-1.5 text-center text-[0.72rem] font-semibold text-[#0a0a0a]">
                Book your slot →
              </p>
            </div>
          ) : (
            <p
              key={msg.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.82rem] leading-snug",
                msg.who === "fan"
                  ? "rounded-tl-md bg-white/10 text-ink-foreground"
                  : "ml-auto rounded-tr-md bg-[#f5f5f7] text-[#0a0a0a]"
              )}
            >
              {msg.text}
            </p>
          )
        )}
        {typing && (
          <p
            className="flex w-fit items-center gap-1 rounded-2xl rounded-tr-md bg-[#f5f5f7] px-4 py-3"
            aria-label="Assistant is typing"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="pmg-dot h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
            ))}
          </p>
        )}
      </div>

      {/* chips */}
      <div
        className="flex flex-wrap gap-2 border-t border-ink-border px-5 pt-3"
        aria-label="Suggested questions"
      >
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => send(chip)}
            className="rounded-full border border-ink-border bg-white/5 px-3 py-1.5 text-[0.7rem] font-medium text-ink-foreground/90 transition-colors hover:border-white/25 hover:bg-white/10"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        className="flex items-center gap-2 px-5 py-4"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
          setInput("");
        }}
      >
        <label htmlFor="demo-question" className="sr-only">
          Ask Maya&rsquo;s assistant
        </label>
        <input
          id="demo-question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={140}
          autoComplete="off"
          placeholder="Ask my assistant anything…"
          className="h-11 w-full rounded-full border border-ink-border bg-white/5 px-4 text-[0.85rem] text-ink-foreground outline-none transition-colors placeholder:text-ink-muted focus:border-white/25"
        />
        <button
          type="submit"
          aria-label="Send"
          className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#f5f5f7] text-[#0a0a0a] transition-transform hover:scale-105 active:scale-95"
        >
          <SendHorizonal className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
      <button
        onClick={reset}
        className="mb-4 ml-5 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink-foreground"
      >
        <RotateCcw className="h-3 w-3" aria-hidden="true" /> Reset demo
      </button>
    </div>
  );
}
