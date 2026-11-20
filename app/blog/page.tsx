import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";
import { CTA } from "@/components/site/cta";
import { BandScene } from "@/components/three/band-scene";
import { TiltCard } from "@/components/three/tilt-card";
import { Reveal } from "@/components/fx/reveal";
import { Watermark } from "@/components/fx/watermark";
import { POSTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field-tested guides on AI storefronts, link-in-bio strategy, and choosing tools by the job they do — not by logo count.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${SITE.url}/blog` },
};

export default function BlogIndexPage() {
  return (
    <>
      {/* ════════ HERO (band) ════════ */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <BandScene variant="knot" sparkles={52} />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-muted"
          >
            <Link href="/" className="transition-colors hover:text-ink-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-ink-foreground">Blog</span>
          </nav>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
            The creator
            <br />
            <span className="bg-gradient-to-br from-white via-white to-[#6e6e74] bg-clip-text italic text-transparent">
              bio playbook.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Field-tested guides on AI storefronts, link-in-bio strategy, and
            choosing tools by the job they do — not by logo count.
          </p>
        </div>
      </section>

      {/* ════════ POST LIST ════════ */}
      <section className="relative overflow-hidden bg-background">
        <Watermark text="PLAYBOOK" className="top-10 right-[-2%]" />
        <div className="relative z-[1] mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
            Latest — September 2026
          </p>
          <Reveal y={30}>
          <div className="mt-6 border-b border-hairline">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-hairline py-7 transition-colors md:grid-cols-[150px_1fr_auto] md:gap-10"
              >
                <span className="col-span-2 flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground md:col-span-1 md:block">
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <span className="md:mt-1.5 md:block">{post.readTime}</span>
                </span>
                <span className="min-w-0">
                  <span className="block text-2xl font-semibold leading-[1.12] tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                    {post.title}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </span>
                </span>
                <span
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            ))}
          </div>
          </Reveal>

          {/* The Ping callout */}
          <TiltCard max={4} className="mt-12 rounded-3xl border border-border bg-secondary/40">
            <div className="flex flex-col items-start justify-between gap-6 p-8 sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> The Ping
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-4xl">
                One email a month.
                <br />
                <span className="italic text-muted-foreground">Zero fluff.</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                The playbook plus what&rsquo;s actually converting for 12,400+
                pages on PingMyBio.
              </p>
            </div>
            <CTA href="/app" variant="solid">
              Create my page — free
            </CTA>
            </div>
          </TiltCard>
        </div>
      </section>
    </>
  );
}
