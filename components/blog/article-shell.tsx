import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import type { POSTS } from "@/lib/site";
import { SITE } from "@/lib/site";

type Post = (typeof POSTS)[number];

export function ArticleShell({
  post,
  children,
}: {
  post: Post;
  children: ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "PingMyBio" },
    publisher: {
      "@type": "Organization",
      name: "PingMyBio",
      logo: { "@type": "ImageObject", url: `${SITE.url}/assets/favicon.svg` },
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    image: `${SITE.url}/assets/og-cover.jpg`,
  };

  return (
    <>
      <article className="bg-background">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link href="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-foreground">Playbook</span>
          </nav>

          <p className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            {post.title}
          </h1>

          <div className="article mt-10 border-t border-hairline pt-10">
            {children}
          </div>

          <div className="mt-12 border-t border-hairline pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All posts
            </Link>
          </div>

          {/* conversion card */}
          <div className="relative mt-6 overflow-hidden rounded-3xl bg-ink p-8 text-center text-ink-foreground sm:p-10">
            <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink-muted">
                PingMyBio
              </p>
              <p className="mx-auto mt-3 max-w-md text-2xl font-semibold leading-tight tracking-tight">
                Your bio, answering while you{" "}
                <span className="italic text-white/75">sleep.</span>
              </p>
              <Link
                href="/app"
                className="group mx-auto mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#f5f5f7] px-6 text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-white"
              >
                Create my page — it&rsquo;s free
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
