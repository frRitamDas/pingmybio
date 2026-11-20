import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { BandScene } from "@/components/three/band-scene";
import { Reveal } from "@/components/fx/reveal";

export function LegalShell({
  crumb,
  title,
  updated,
  lede,
  children,
}: {
  crumb: string;
  title: string;
  updated: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-background">
      {/* slim dark masthead */}
      <div className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <BandScene variant="orb" sparkles={28} className="opacity-75" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-muted"
          >
            <Link href="/" className="transition-colors hover:text-ink-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-ink-foreground">{crumb}</span>
          </nav>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-ink-muted">{lede}</p>
          <p className="mt-5 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-white/40">
            Last updated — {updated}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8">
        <Reveal y={26}>
          <div className="article">{children}</div>
        </Reveal>
      </div>
    </article>
  );
}
