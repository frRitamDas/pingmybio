import { Briefcase, CalendarClock, MessageSquare, Sparkles } from "lucide-react";

/** Decorative hero phone mock with the self-playing assistant chat. */
export function PhoneMock() {
  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]" aria-hidden="true">
      {/* sonar rings */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
        <span className="pmg-ring absolute inset-0 rounded-full border border-white/15" />
        <span className="pmg-ring pmg-ring--2 absolute inset-0 rounded-full border border-white/10" />
        <span className="pmg-ring pmg-ring--3 absolute inset-0 rounded-full border border-white/5" />
      </div>

      {/* orbit badge */}
      <div className="absolute -right-10 -top-8 hidden h-28 w-28 sm:block">
        <svg viewBox="0 0 120 120" className="animate-spin-slow h-full w-full">
          <defs>
            <path id="orbit-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text fontSize="10.5" letterSpacing="2.6" fill="#f5f5f7" opacity="0.85" className="font-mono">
            <textPath href="#orbit-circle">
              YOUR BIO · NOW INTELLIGENT · ONE LINK · INFINITE ANSWERS ·
            </textPath>
          </text>
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-[#f5f5f7]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
      </div>

      {/* phone body */}
      <div className="relative rounded-[2.8rem] border border-white/12 bg-gradient-to-b from-[#2a2a2e] to-[#101013] p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="overflow-hidden rounded-[2.55rem] bg-[#0f0f11]">
          {/* island */}
          <div className="relative flex h-8 items-center justify-center">
            <span className="h-5 w-24 rounded-full bg-black" />
          </div>
          {/* status */}
          <div className="flex items-center justify-between px-6 font-mono text-[0.55rem] tracking-widest text-white/70">
            <span className="tnum">9:41</span>
            <span>PING — 5G</span>
          </div>
          {/* profile */}
          <div className="mt-3 border-b border-white/8 px-5 pb-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4a4a52] to-[#232327] text-sm font-bold tracking-wide text-white ring-1 ring-white/15">
              MC
            </div>
            <p className="mt-2 text-[0.8rem] font-semibold text-white">Maya Chen</p>
            <p className="font-mono text-[0.5rem] tracking-wider text-white/45">
              pingmybio.com/maya
            </p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[0.5rem] font-medium text-white/70">
              <Sparkles className="h-2 w-2" /> Creator · Coaching
            </span>
          </div>
          {/* tabs */}
          <div className="mx-auto mt-3 flex w-fit rounded-full border border-white/10 bg-white/5 p-0.5 text-[0.55rem] font-medium">
            <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[#0a0a0a]">Chat</span>
            <span className="px-3 py-1 text-white/55">Work with me</span>
          </div>
          {/* chat */}
          <div className="space-y-2 px-4 py-4 text-[0.62rem] leading-snug">
            <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-white/10 px-3 py-2 text-white/90">
              hey!! how much is the 1:1 coaching?
            </p>
            <p className="ml-auto max-w-[90%] rounded-2xl rounded-tr-md bg-[#f5f5f7] px-3 py-2 text-[#0a0a0a]">
              Hey! It&rsquo;s $240 for 4 weeks — direct Voxer access and a weekly
              teardown. Want the link?
            </p>
            <div className="rounded-2xl border border-white/12 bg-white/5 p-2.5">
              <p className="text-[0.6rem] font-semibold text-white">1:1 Creator Coaching</p>
              <p className="text-[0.52rem] text-white/55">4 weeks · $240</p>
              <p className="mt-1.5 rounded-lg bg-[#f5f5f7] px-2 py-1 text-center text-[0.55rem] font-semibold text-[#0a0a0a]">
                Book your slot →
              </p>
            </div>
          </div>
          {/* input */}
          <div className="flex items-center justify-between gap-2 border-t border-white/8 px-4 py-3">
            <p className="text-[0.58rem] text-white/35">Ask my assistant anything…</p>
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#f5f5f7]">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#0a0a0a">
                <path d="M3 11.5 21 3l-6.5 18-2.3-7.7L3 11.5z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* floating notification cards */}
      <div className="animate-float absolute -left-24 top-28 hidden items-center gap-2 rounded-2xl border border-white/12 bg-[#141416]/90 py-2 pl-2 pr-3 shadow-band backdrop-blur-md md:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/8 text-white">
          <Briefcase className="h-4 w-4" />
        </span>
        <span>
          <b className="block text-[0.62rem] font-semibold text-white">$240 — Coaching booked</b>
          <small className="block text-[0.52rem] text-white/50">via your bio · 2m ago</small>
        </span>
      </div>
      <div className="animate-float-late absolute -right-24 top-56 hidden items-center gap-2 rounded-2xl border border-white/12 bg-[#141416]/90 py-2 pl-2 pr-3 shadow-band backdrop-blur-md lg:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/8 text-white">
          <CalendarClock className="h-4 w-4" />
        </span>
        <span>
          <b className="block text-[0.62rem] font-semibold text-white">New collab request</b>
          <small className="block text-[0.52rem] text-white/50">Atelier Marlowe × Maya</small>
        </span>
      </div>
      <div className="animate-float absolute -left-20 bottom-20 hidden items-center gap-2 rounded-2xl border border-white/12 bg-[#141416]/90 py-2 pl-2 pr-3 shadow-band backdrop-blur-md md:flex [animation-delay:-3s]">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/8 text-white">
          <MessageSquare className="h-4 w-4" />
        </span>
        <span>
          <b className="block text-[0.62rem] font-semibold text-white">312 replies this month</b>
          <small className="block text-[0.52rem] text-white/50">while you were offline</small>
        </span>
      </div>
    </div>
  );
}
