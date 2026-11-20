import Link from "next/link";
import type { Metadata } from "next";
import {
  Sparkles,
  Star,
  Check,
  ArrowDown,
  ArrowRight,
  CirclePlay,
  Clock3,
  MessageSquareQuote,
  type LucideIcon,
} from "lucide-react";
import { CTA } from "@/components/site/cta";
import { CountUp } from "@/components/site/count-up";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { BandScene } from "@/components/three/band-scene";
import { TiltCard } from "@/components/three/tilt-card";
import { Parallax } from "@/components/fx/parallax";
import { Magnetic } from "@/components/fx/magnetic";
import { Reveal } from "@/components/fx/reveal";
import { Watermark } from "@/components/fx/watermark";
import { HeroContainer, HeroItem } from "@/components/home/hero-entrance";
import { MacbookHero } from "@/components/home/macbook-hero";
import { MacbookScroll } from "@/components/home/macbook-scroll";
import { LiveDemo } from "@/components/home/live-demo";
import {
  MARQUEE_ITEMS,
  FAQS_HOME,
  TESTIMONIALS,
  STATS,
  SITE,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PingMyBio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered link-in-bio that answers followers, recommends offers, and helps you sell 24/7.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "29",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2300",
  },
  url: SITE.url,
};

function Eyebrow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.28em] text-ink-muted">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </p>
  );
}

function Stars({ className = "text-foreground" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),transparent_65%)]"
          aria-hidden="true"
        />
        <BandScene variant="hero" sparkles={120} />
        {/* crosshair marks */}
        {[
          "left-[4%] top-[16%]",
          "right-[6%] top-[24%]",
          "left-[42%] bottom-[22%]",
          "right-[36%] bottom-[34%]",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`pointer-events-none absolute font-mono text-lg text-white/20 ${pos}`}
          >
            +
          </span>
        ))}

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-28 sm:px-8 md:pt-32 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-28">
          <Parallax distance={105} fade>
            <HeroContainer>
              <HeroItem>
                <Eyebrow icon={Sparkles}>AI Link-in-Bio for Creators</Eyebrow>
              </HeroItem>
              <HeroItem>
                <h1 className="mt-6 text-[clamp(3.4rem,10.5vw,6.75rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
                  Your Bio,
                  <br />
                  <span className="pmg-shimmer italic">Now Intelligent.</span>
                </h1>
              </HeroItem>
              <HeroItem>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
                  Your AI-powered bio page answers followers, recommends your
                  services, and helps you sell around the clock — while you sleep,
                  shoot, or ship.
                </p>
              </HeroItem>
              <HeroItem>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Magnetic strength={0.35}>
                    <CTA href="/app" variant="liquid" ariaLabel="Create my page — start free">
                      Create my page
                    </CTA>
                  </Magnetic>
                  <a
                    href="#how-it-works"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-ink-foreground/80 underline decoration-white/25 underline-offset-8 transition-colors hover:text-white"
                  >
                    See how it works
                    <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                </div>
              </HeroItem>
              <HeroItem>
                <p className="mt-8 flex items-center gap-2.5 text-[0.8rem] text-ink-muted">
                  <Stars className="text-[#f5f5f7]" />
                  4.9/5 — Loved by 12,400+ creators
                </p>
              </HeroItem>
            </HeroContainer>
          </Parallax>

          <Parallax distance={165}>
            <MacbookHero />
          </Parallax>
        </div>

        {/* scroll cue */}
        <a
          href="#features"
          aria-label="Scroll to features"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted transition-colors hover:text-ink-foreground lg:flex"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <span className="pmg-scroll-dot h-1.5 w-1 rounded-full bg-white/80" />
          </span>
        </a>
      </section>

      {/* ════════ MACBOOK SCROLL STORY ════════ */}
      <MacbookScroll />

      {/* ════════ MARQUEE ════════ */}
      <div className="overflow-hidden border-b border-hairline bg-background py-3.5" aria-hidden="true">
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground"
            >
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ════════ LOGO STRIP ════════ */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by creators at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 text-foreground/45">
            <span className="text-lg">The Reel Journal</span>
            <span className="text-base font-semibold tracking-[0.18em]">FRAME&amp;CO</span>
            <span className="font-mono text-sm tracking-widest">Creator Daily</span>
            <span className="text-lg italic">Atelier Marlowe</span>
            <span className="text-base font-light tracking-[0.42em]">MONO</span>
            <span className="font-mono text-sm font-bold tracking-[0.08em]">GRADIENT</span>
          </div>
        </div>
      </section>

      {/* ════════ FEATURES BENTO ════════ */}
      <section id="features" className="relative scroll-mt-24 overflow-hidden bg-background">
        <Watermark text="ANSWERS" className="-bottom-10 left-[-2%]" />
        <div className="relative z-[1] mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8">
          <Reveal className="flex flex-col justify-between gap-6 border-t border-hairline pt-16 md:flex-row md:items-end">
            <div>
              <Eyebrow icon={Clock3}>What you get</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                One link.
                <br />
                Answers, offers,
                <br />
                <span className="italic text-muted-foreground">and collabs.</span>
              </h2>
            </div>
            <p className="max-w-xs leading-relaxed text-muted-foreground">
              Assistant chat, linked offers, and Work with me — built for
              creators who sell, not just list.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* 01 — Assistant */}
            <TiltCard max={5} className="rounded-3xl md:col-span-7">
              <article className="flex h-full flex-col rounded-3xl border border-hairline bg-background p-6 shadow-card md:p-8">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                01 — Assistant <span className="text-foreground/60">· Always on</span>
              </p>
              <div className="mt-6 flex h-28 items-end gap-1.5" aria-hidden="true">
                {[38, 64, 26, 78, 52, 80, 34, 70, 44, 76, 58, 30, 66, 48, 58, 36].map(
                  (h, i) => (
                    <span
                      key={i}
                      className="pmg-bar w-full rounded-full bg-foreground/85"
                      style={{ height: `${h}px`, animationDelay: `${-i * 0.13}s` }}
                    />
                  )
                )}
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Assistant that knows you
              </h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                Answers from your knowledge — FAQs, notes, how you work — then
                points people to the right offer. Not a chatbot taped to a link
                page; a stand-in that sounds like you.
              </p>
            </article>
            </TiltCard>

            {/* 02 — Offers */}
            <TiltCard max={5} className="rounded-3xl md:col-span-5">
              <article className="flex h-full flex-col rounded-3xl border border-hairline bg-secondary/50 p-6 md:p-8">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                02 — Offers <span className="text-foreground/60">· Convert</span>
              </p>
              <div className="mt-6 flex flex-1 items-center justify-center py-2">
                <div
                  className="w-44 overflow-hidden rounded-2xl border border-hairline bg-background shadow-card"
                  role="img"
                  aria-label="Offer card preview: 1:1 Creator Coaching, $240"
                >
                  <div className="h-24 bg-[radial-gradient(circle_at_30%_20%,#3f3f46,#0a0a0a)]" />
                  <div className="p-3">
                    <p className="text-[0.72rem] font-semibold leading-tight">
                      1:1 Creator Coaching
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[0.62rem] text-muted-foreground">$240 · 4 weeks</span>
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[0.55rem] font-semibold text-primary-foreground">
                        Book now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Offers that convert
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Linked offers and freebies live right on the page — fans tap the
                right next step without a maze of tabs.
              </p>
            </article>
            </TiltCard>

            {/* 03 — Work with me */}
            <TiltCard max={5} className="rounded-3xl md:col-span-5">
              <article className="flex h-full flex-col rounded-3xl bg-ink p-6 text-ink-foreground md:p-8">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink-muted">
                03 — Work with me <span className="text-white/50">· For brands</span>
              </p>
              <div className="mt-8 flex flex-1 items-center justify-center gap-2 sm:gap-3" aria-hidden="true">
                {["Brief", "Research", "Inbox"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={
                        step === "Inbox"
                          ? "rounded-full border border-[#f5f5f7] bg-[#f5f5f7] px-4 py-1.5 text-xs font-semibold text-[#0a0a0a]"
                          : "rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/80"
                      }
                    >
                      {step}
                    </span>
                    {i < 2 && (
                      <svg width="22" height="10" viewBox="0 0 26 12" fill="none">
                        <path d="M0 6h22M17 1l5 5-5 5" stroke="#f5f5f7" strokeOpacity="0.6" strokeWidth="1.4" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Work with me
              </h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                Brands request collabs directly on your page. You get deep
                research and a reply brief waiting in your Inbox.
              </p>
            </article>
            </TiltCard>

            {/* 04 — Knowledge + Inbox */}
            <TiltCard max={5} className="rounded-3xl md:col-span-7">
              <article className="flex h-full flex-col rounded-3xl border border-hairline bg-background p-6 shadow-card md:p-8">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                04 — Knowledge + Inbox <span className="text-foreground/60">· One place</span>
              </p>
              <div className="mt-6 space-y-2" aria-hidden="true">
                {[
                  { id: "JD", text: "“Do you do brand trips?”", meta: "Fan · via assistant · 2m" },
                  { id: "AM", text: "Collab: Autumn launch — Atelier Marlowe", meta: "Brand · Brief ready · 41m" },
                  { id: "RS", text: "“Where can I learn Lightroom presets?”", meta: "Fan · routed to your freebie · 3h" },
                ].map((row) => (
                  <div
                    key={row.id}
                    className="flex items-center gap-3 rounded-2xl border border-hairline bg-secondary/40 px-3 py-2.5"
                  >
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-primary text-[0.62rem] font-bold text-primary-foreground">
                      {row.id}
                    </span>
                    <span className="min-w-0">
                      <b className="block truncate text-[0.78rem] font-semibold leading-snug">
                        {row.text}
                      </b>
                      <small className="mt-0.5 block text-[0.62rem] text-muted-foreground">
                        {row.meta}
                      </small>
                    </span>
                  </div>
                ))}
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Knowledge + Inbox
              </h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                Train the assistant once with what you actually say — every
                answer compounds. See fan chats and collab requests in a single
                calm inbox.
              </p>
            </article>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section id="how-it-works" className="scroll-mt-24 border-t border-white/5 bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow icon={ArrowRight}>How it works</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                Your bio is
                <br />
                now your <span className="italic text-white/80">PA.</span>
              </h2>
            </div>
            <p className="max-w-xs text-ink-muted">
              What actually happens after someone taps your link.
            </p>
          </Reveal>

          <Reveal y={30} delay={0.08}>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink-border bg-ink-border md:grid-cols-3">
            {[
              {
                num: "01",
                title: "They tap your link",
                body: "Instagram, TikTok, YouTube, anywhere. One page, zero maze — your whole world behind a single URL.",
                meta: "Instagram · TikTok · YouTube · X",
              },
              {
                num: "02",
                title: "Your PA handles it",
                body: "Answers like you would in DMs. Recommends the call, the product, the freebie — whatever fits the moment.",
                meta: "Assistant · Knowledge · Offers",
              },
              {
                num: "03",
                title: "You get the booking",
                body: "A sale, a slot on your calendar, or a warm collab brief. You weren't sitting in the comments.",
                meta: "Checkout · Calendar · Inbox",
              },
            ].map((step) => (
              <li key={step.num} className="bg-ink p-7 md:p-9">
                <p className="tnum font-mono text-5xl font-medium text-white/15">
                  {step.num}
                </p>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{step.body}</p>
                <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-white/35">
                  {step.meta}
                </p>
              </li>
            ))}
          </ol>
          </Reveal>
        </div>
      </section>

      {/* ════════ LIVE DEMO ════════ */}
      <section id="demo" className="relative overflow-hidden border-t border-white/5 bg-ink text-ink-foreground" aria-labelledby="demo-title">
        <Watermark text="ASK IT" className="bottom-2 right-[-1.5%]" />
        <div className="relative z-[1] mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <Eyebrow icon={CirclePlay}>Live demo — try it</Eyebrow>
            <h2
              id="demo-title"
              className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl"
            >
              Don&rsquo;t take
              <br />
              our word.
              <br />
              <span className="italic text-white/80">Ask it.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink-muted">
              This is Maya&rsquo;s page, running right now. She&rsquo;s a creator
              coach — her assistant answers from her actual knowledge: pricing,
              collabs, the freebie. Same brain your page would have.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Grounded in the creator's real FAQs and offers — never invents prices",
                "Routes high-intent fans straight to the booking link",
                "Hands brand briefs to Inbox with research attached",
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-[0.95rem] text-ink-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#f5f5f7]">
                    <Check className="h-3 w-3 text-[#0a0a0a]" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-muted">
              Try: “how much is coaching?”
            </p>
          </Reveal>
          <LiveDemo />
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="border-y border-hairline bg-background" aria-label="PingMyBio in numbers">
        <Reveal y={22}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-hairline md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-10 text-center sm:px-6">
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {"prefix" in stat ? stat.prefix : ""}
                <CountUp value={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </p>
              <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section id="love" className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow icon={MessageSquareQuote}>Field notes</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                Creators,
                <br />
                <span className="italic text-muted-foreground">closing daily.</span>
              </h2>
            </div>
            <p className="max-w-xs leading-relaxed text-muted-foreground">
              Real workflows from coaches, artists, and storefronts running on
              PingMyBio.
            </p>
          </div>
          <Reveal y={28} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TiltCard key={t.name} max={6}>
                <figure className="flex h-full flex-col rounded-3xl border border-hairline bg-card p-6 shadow-card">
                <Stars className="text-foreground" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
                    {t.initials}
                  </span>
                  <span>
                    <b className="block text-sm font-semibold">{t.name}</b>
                    <small className="block text-xs text-muted-foreground">{t.role}</small>
                  </span>
                </figcaption>
                </figure>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ════════ PRICING TEASER ════════ */}
      <section className="bg-background pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal y={30}>
          <div className="grid overflow-hidden rounded-3xl border border-hairline lg:grid-cols-2">
            <div className="flex flex-col justify-center bg-ink p-8 text-ink-foreground sm:p-12">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink-muted">
                Pricing
              </p>
              <h3 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
                One link.
                <br />
                <span className="italic text-white/75">Fair pricing.</span>
              </h3>
              <p className="mt-5 max-w-sm leading-relaxed text-ink-muted">
                Start free — 300 AI replies a month, forever. Pay only when your
                reply volume grows.
              </p>
              <div className="mt-8">
                <CTA href="/pricing" variant="solid-light">
                  See plans &amp; pricing
                </CTA>
              </div>
            </div>
            <div className="divide-y divide-hairline border-t border-hairline bg-card lg:border-l lg:border-t-0">
              {[
                ["Free", "$0 — forever · 300 convos/mo"],
                ["Starter", "$12/mo — 1,200 convos · collabs"],
                ["Pro", "$29/mo — 2,500 convos · priority"],
                ["Fees", "0% on your sales, ever"],
                ["Switching", "Anytime. Upgrade, downgrade, cancel."],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {label}
                  </span>
                  <b className="text-sm font-semibold leading-snug sm:text-right">
                    {value}
                  </b>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section id="faq" className="scroll-mt-24 border-t border-hairline bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow icon={Sparkles}>Questions</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
                Before you
                <br />
                <span className="italic text-muted-foreground">ask.</span>
              </h2>
              <p className="mt-5 max-w-xs leading-relaxed text-muted-foreground">
                Everything about convos, collabs, and canceling — answered
                straight. More on{" "}
                <Link href="/pricing" className="font-medium text-foreground underline underline-offset-4">
                  the pricing page
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <FaqAccordion items={FAQS_HOME} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <BandScene variant="knot" align="center" className="opacity-45" sparkles={36} />
        {/* orbit badges */}
        {[
          { text: "CLAIM YOUR LINK · FREE TO START · NO WAITLIST · ", pos: "left-[6%] top-10", reverse: false },
          { text: "ONE LINK · INFINITE ANSWERS · PINGMYBIO · ", pos: "right-[6%] bottom-10", reverse: true },
        ].map(({ text, pos, reverse }) => (
          <svg
            key={pos}
            viewBox="0 0 120 120"
            aria-hidden="true"
            className={`pointer-events-none absolute hidden h-36 w-36 text-white/60 lg:block ${pos} ${
              reverse ? "animate-spin-slower" : "animate-spin-slow"
            }`}
          >
            <defs>
              <path id={`orbit-${reverse ? "r" : "l"}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text fontSize="9.5" letterSpacing="2.4" fill="currentColor" className="font-mono">
              <textPath href={`#orbit-${reverse ? "r" : "l"}`}>{text}</textPath>
            </text>
          </svg>
        ))}
        <Reveal y={44}>
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-28">
          <Eyebrow icon={Sparkles}>Get started</Eyebrow>
          <h2 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Claim your link.
            <br />
            <span className="italic text-white/80">Start closing today.</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <Magnetic strength={0.3}>
              <CTA href="/app" variant="liquid" ariaLabel="Create my page — it's free">
                Create my page — it&rsquo;s free
              </CTA>
            </Magnetic>
          </div>
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink-muted">
            Free to start · 300 AI replies/mo · No waitlist
          </p>
        </div>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
    </>
  );
}
