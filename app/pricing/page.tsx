import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Minus,
  Sparkles,
  Percent,
  ArrowLeftRight,
  MousePointerClick,
  ChevronRight,
} from "lucide-react";
import { Pricing } from "@/components/ui/pricing";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CTA } from "@/components/site/cta";
import { BandScene } from "@/components/three/band-scene";
import { Reveal } from "@/components/fx/reveal";
import { Watermark } from "@/components/fx/watermark";
import { PLANS, FAQS_PRICING, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free forever with 300 AI replies a month. Starter $12/mo for 1,200 convos and brand collabs. Pro $29/mo for 2,500 convos and priority support. 0% sales fees, ever.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "PingMyBio Pricing — Plans that scale with your fans",
    description: "Free forever · 300 AI replies/mo. Starter $12/mo · Pro $29/mo. 0% sales fees, ever.",
    url: `${SITE.url}/pricing`,
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PingMyBio",
  description:
    "AI-powered link-in-bio that answers followers, recommends offers, and helps you sell 24/7.",
  brand: { "@type": "Brand", name: "PingMyBio" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2300",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "29",
    priceCurrency: "USD",
    offerCount: "3",
  },
};

const comparison: { feature: string; free: string | boolean; starter: string | boolean; pro: string | boolean }[] = [
  { feature: "Convos / month", free: "300", starter: "1,200", pro: "2,500" },
  { feature: "Answers from your offers", free: true, starter: true, pro: true },
  { feature: "Answers from your reels", free: false, starter: true, pro: true },
  { feature: "Brand deals (Work with me)", free: false, starter: true, pro: true },
  { feature: "AI brand research", free: false, starter: true, pro: true },
  { feature: "Collab briefs in Inbox", free: false, starter: true, pro: true },
  { feature: "Offers on the page", free: "5", starter: "Unlimited", pro: "Unlimited" },
  { feature: "Click analytics", free: true, starter: true, pro: true },
  { feature: "Email support", free: true, starter: true, pro: true },
  { feature: "Priority support", free: false, starter: false, pro: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "string") {
    return <span className="tnum font-medium">{value}</span>;
  }
  return value ? (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary">
      <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3.5} aria-label="Included" />
    </span>
  ) : (
    <Minus className="inline h-4 w-4 text-muted-foreground/50" aria-label="Not included" />
  );
}

export default function PricingPage() {
  return (
    <>
      {/* ════════ HERO (band) ════════ */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <BandScene variant="knot" sparkles={56} />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-muted"
          >
            <Link href="/" className="transition-colors hover:text-ink-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-ink-foreground">Pricing</span>
          </nav>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
            Plans that scale with{" "}
            <span className="bg-gradient-to-br from-white via-white to-[#6e6e74] bg-clip-text italic text-transparent">
              your fans.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            An AI assistant for your followers, collab intake with brand
            research. Start free — pay when your reply volume grows.{" "}
            <b className="font-semibold text-ink-foreground">0% sales fees, ever.</b>
          </p>
        </div>
      </section>

      {/* ════════ PLANS (21st.dev pricing component) ════════ */}
      <section className="border-b border-hairline bg-background">
        <Pricing
          plans={PLANS}
          title="Simple, honest pricing"
          description="Choose the plan that works for you."
        />
        <p className="mx-auto max-w-6xl px-5 pb-8 text-center text-xs text-muted-foreground sm:px-8">
          1 convo is 1 reply your assistant gives a fan. Brand research runs
          separately and never touches your convo meter.
        </p>
      </section>

      {/* ════════ 0% FEES STRIP ════════ */}
      <section className="border-b border-hairline bg-secondary/40" aria-label="What we never charge">
        <Reveal y={22}>
        <div className="mx-auto grid max-w-6xl divide-y divide-hairline px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            {
              icon: Percent,
              title: "0% sales fees",
              body: "We never take a cut of what you sell. Not on Free, not ever — only card-processor fees set at checkout.",
            },
            {
              icon: ArrowLeftRight,
              title: "Prorated, anytime",
              body: "Upgrade, downgrade, or cancel from the dashboard. Changes apply immediately and we prorate the difference.",
            },
            {
              icon: MousePointerClick,
              title: "No retention calls",
              body: "Cancel in two taps. No contracts, no “call us to cancel”, no dark patterns — your page goes read-only, your data exports.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4 py-6 md:px-8 md:py-8 md:first:pl-0 md:last:pr-0">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <b className="block font-semibold tracking-tight">{title}</b>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {body}
                </span>
              </span>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* ════════ COMPARISON TABLE ════════ */}
      <section className="relative overflow-hidden bg-background">
        <Watermark text="EVERY PLAN" className="top-4 right-[-2%]" />
        <div className="relative z-[1] mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
          <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Side by side
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Every feature,
            <br />
            <span className="italic text-muted-foreground">line by line.</span>
          </h2>
          </Reveal>
          <Reveal y={26} delay={0.06}>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border shadow-card">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="px-6 py-4 text-left font-mono text-[0.6rem] uppercase tracking-[0.22em]">
                    Feature
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.22em]">
                    Free — $0
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.22em]">
                    Starter — $12/mo
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.22em]">
                    Pro — $29/mo
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-background" : "bg-secondary/40"}
                  >
                    <th scope="row" className="px-6 py-3.5 text-left font-medium">
                      {row.feature}
                    </th>
                    <td className="px-6 py-3.5 text-center text-muted-foreground">
                      <Cell value={row.free} />
                    </td>
                    <td className="px-6 py-3.5 text-center text-muted-foreground">
                      <Cell value={row.starter} />
                    </td>
                    <td className="px-6 py-3.5 text-center font-semibold text-foreground">
                      <Cell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="border-t border-hairline bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Questions
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
                Before you
                <br />
                <span className="italic text-muted-foreground">ask.</span>
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <FaqAccordion items={FAQS_PRICING} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="relative overflow-hidden border-t border-white/5 bg-ink text-ink-foreground">
        <BandScene variant="orb" align="center" className="opacity-55" sparkles={30} />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal y={40}>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
            Free to start.
            <br />
            <span className="italic text-white/80">Serious when you&rsquo;re ready.</span>
          </h2>
          <div className="mt-9 flex justify-center">
            <CTA href="/app" variant="solid-light">
              Create my page
            </CTA>
          </div>
          <p className="mt-5 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink-muted">
            Free to start · 300 AI replies/mo · No waitlist
          </p>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
