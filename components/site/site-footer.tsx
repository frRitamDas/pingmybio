import Link from "next/link";
import { LogoMark } from "@/components/site/logo";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Reveal } from "@/components/fx/reveal";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "App preview", href: "/app" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "All posts", href: "/blog" },
      { label: "AI storefront setup", href: "/blog/how-to-set-up-ai-storefront" },
      { label: "TikTok link in bio", href: "/blog/tiktok-link-in-bio" },
      { label: "Linktree alternatives", href: "/blog/linktree-alternative" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs Linktree", href: "/blog/linktree-alternative" },
      { label: "vs Stan Store", href: "/blog/stan-store-alternative" },
      { label: "All comparisons", href: "/blog" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Create my page", href: "/app" },
      { label: "Sign in", href: "/app" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 3c.4 2.1 2.1 3.8 4.3 4.2v3.1c-1.6 0-3.1-.5-4.3-1.4v6.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .7 0 1 .1v3.3a2.2 2.2 0 1 0 1.4 2.1V3h3z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.8v4.4l3.8-2.2-3.8-2.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h3.6l6.2 9L18.6 4H21l-6.4 8.6L21.4 20h-3.6l-6.4-9.3L5.2 20H3l6.9-9.3L4 4z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Top */}
        <div className="grid gap-10 py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-4">
            <Link href="/" aria-label="PingMyBio — home" className="flex items-center gap-2.5">
              <LogoMark size={26} />
              <span className="text-[1.05rem] font-semibold tracking-tight">PingMyBio</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your Bio, Now Intelligent. One page on pingmybio.com that answers,
              recommends, and sells — 24/7.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
          {COLUMNS.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="md:col-span-2"
            >
              <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/85 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-hairline py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <p className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[0.6rem]">⌘K</kbd>
              quick navigate
            </p>
            <p className="text-xs text-muted-foreground">
              © {year} PingMyBio
            </p>
          </div>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/blog" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {[
              { href: "https://www.instagram.com", label: "Instagram", Icon: InstagramIcon },
              { href: "https://www.tiktok.com", label: "TikTok", Icon: TikTokIcon },
              { href: "https://www.youtube.com", label: "YouTube", Icon: YouTubeIcon },
              { href: "https://www.x.com", label: "X", Icon: XIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Giant wordmark */}
        <Reveal y={90}>
          <div aria-hidden="true" className="select-none overflow-hidden pb-2">
            <p className="whitespace-nowrap text-center text-[17.5vw] font-bold leading-[0.85] tracking-[-0.05em] text-foreground/[0.06] md:text-[13rem]">
              PINGMYBIO
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
