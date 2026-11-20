import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Off the record.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink text-ink-foreground">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 pb-24 pt-28 text-center sm:px-8">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ink-muted">
          Error 404
        </p>
        <h1 className="mt-6 text-7xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-9xl lg:text-[11rem]">
          Off the
          <br />
          <span className="bg-gradient-to-br from-white via-white to-[#5f5f66] bg-clip-text italic text-transparent">
            record.
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-md leading-relaxed text-ink-muted">
          This URL isn&rsquo;t in your bio — or anyone&rsquo;s. Let&rsquo;s get
          you back to a page that answers.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#f5f5f7] px-6 text-[0.95rem] font-semibold text-[#0a0a0a] transition-colors hover:bg-white"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to PingMyBio
          </Link>
        </div>
      </div>
    </section>
  );
}
