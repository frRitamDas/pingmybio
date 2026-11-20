import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleShell } from "@/components/blog/article-shell";
import { POSTS } from "@/lib/site";

const post = POSTS.find((p) => p.slug === "tiktok-link-in-bio")!;

export const metadata: Metadata = {
  title: "TikTok Link in Bio — How to Add It (and What to Put There)",
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
};

export default function Post() {
  return (
    <ArticleShell post={post}>
      <p>
        Google’s first result for <em>TikTok link in bio</em> is a Reddit
        thread: “Can’t add a link in my TikTok bio.” The rest is TikTok’s help
        doc, Shopify/Bitly/Later how-tos, and YouTube walkthroughs. This guide
        covers the TikTok steps first (check TikTok’s official help — rules
        change by region), then the question nobody answers:{" "}
        <strong>what should actually live at that URL?</strong>
      </p>

      <div className="callout">
        <strong>Short answer:</strong> Add the URL in{" "}
        <strong>Edit profile → Website</strong> on the{" "}
        <strong>phone app</strong>. If the field is missing, you’re usually on
        a personal account under TikTok’s follower/business rules — or in a
        region where the field hasn’t been rolled out. Paste a full URL
        including <code>https://</code>. Description text is not the Website
        field; it won’t be tappable.
      </div>

      <h2>What “link in bio” means on TikTok</h2>
      <p>
        On TikTok, “link in bio” means the website field under your bio text on
        your profile — the one place a normal outbound URL can live, since
        captions and comments don’t carry clickable links the way YouTube
        descriptions do. It’s not a special product. It’s one URL slot plus
        whatever page you point it at. Treat it like prime real estate: one
        page, one job.
      </p>

      <h2>How to add a TikTok link in bio</h2>
      <ol>
        <li>
          Do this on the <strong>TikTok mobile app</strong>. Desktop usually
          can’t set the clickable Website field.
        </li>
        <li>Open your profile (the person icon).</li>
        <li>
          Tap <strong>Edit profile</strong>.
        </li>
        <li>
          Find <strong>Website</strong> (not just Bio) and paste a full URL
          with <code>https://</code>.
        </li>
        <li>
          Save, open your profile as a viewer would, and tap it to confirm.
        </li>
      </ol>
      <p>
        Official path for connecting accounts:{" "}
        <a href="https://support.tiktok.com" rel="noopener noreferrer">
          TikTok Support — link a website
        </a>
        .
      </p>

      <h2>Can’t add a link? The usual causes</h2>
      <ul>
        <li>
          <strong>Personal account, too small.</strong> TikTok has historically
          gated the Website field by account type and follower count. Either
          grow past the threshold or switch to a Business account (Edit profile
          → Switch to Business Account) where the field is generally available.
        </li>
        <li>
          <strong>Region limits.</strong> The field rolls out unevenly. If
          support says your region lacks it, your only honest option is the
          bio text + “link in bio” pin comment pointing to your page.
        </li>
        <li>
          <strong>URL formatting.</strong> Missing protocol, spaces, or a
          shortened link that trips the filter. Use the clean canonical URL.
        </li>
        <li>
          <strong>App version.</strong> Update TikTok. Stale builds lose fields.
        </li>
      </ul>

      <h2>What to put in that one slot</h2>
      <p>
        The failure mode is pointing the field at a dead Linktree graveyard and
        hoping. TikTok sends you impulse traffic — someone who just watched 34
        seconds of you. They will not navigate a sitemap.
      </p>
      <ul>
        <li><strong>If you sell one thing</strong> — the checkout page. Nothing else.</li>
        <li>
          <strong>If you sell services</strong> — a page that answers “how much
          / what’s included / can we talk?” before a human has to. That’s an
          assistant page, not a list.
        </li>
        <li>
          <strong>If you’re building an audience</strong> — the lead magnet or
          newsletter, with the assistant qualifying who should get what.
        </li>
      </ul>
      <p>
        This is the design brief for <Link href="/">PingMyBio</Link>: one URL
        that greets, answers, recommends the right offer, and takes the booking
        or collab request — while you’re still editing the next video.
      </p>

      <h2>Make the slot compound</h2>
      <ul>
        <li>Say it out loud in videos: “link in bio” lands once you give people a reason.</li>
        <li>
          Keep the URL stable. Changing it means every old video points at a
          ghost.
        </li>
        <li>
          Watch your click analytics weekly — the pages that work tell you what
          your audience actually wants next.
        </li>
      </ul>

      <div className="callout">
        <strong>30-second audit:</strong> open your profile in a private
        browser. Can a stranger, in under ten seconds, (1) understand what you
        do, (2) get an answer to the most common question, and (3) take the
        next step — without DM-ing you? If not, fix that before posting another
        video.
      </div>

      <p>
        <Link
          href="/blog/how-to-set-up-ai-storefront"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Set up your page in 20 minutes
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </p>
    </ArticleShell>
  );
}
