import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleShell } from "@/components/blog/article-shell";
import { POSTS } from "@/lib/site";

const post = POSTS.find((p) => p.slug === "how-to-set-up-ai-storefront")!;

export const metadata: Metadata = {
  title: "How to Set Up an AI Storefront for Your Link in Bio",
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
};

export default function Post() {
  return (
    <ArticleShell post={post}>
      <p>
        Most “set up your link in bio” guides end with a stack of buttons. That
        is a <em>classic</em> link page: list URLs, hope people pick the
        right one, answer the rest in DMs. An <strong>AI storefront</strong> is
        different. Followers tap one link, talk to an assistant grounded in{" "}
        <em>your</em> knowledge, open your offers, or start a Work with me
        request — without bouncing through three other apps. That is what
        PingMyBio is built for.
      </p>

      <div className="callout">
        <strong>Short answer:</strong> Sign up → claim pingmybio.com/you → fill
        Profile → add Knowledge and FAQs → publish offers (and Work with me if
        brands matter) → paste the URL into Instagram/TikTok. Skip the theme
        rabbit hole; spend the time on answers the assistant can use.
      </div>

      <h2>Classic link page vs AI storefront</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Classic link page</th>
              <th>AI storefront (PingMyBio)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Job</td>
              <td>Show destinations</td>
              <td>Answer, route offers, take collabs</td>
            </tr>
            <tr>
              <td>After the tap</td>
              <td>Another site or a DM</td>
              <td>Conversation on your page</td>
            </tr>
            <tr>
              <td>Night-time questions</td>
              <td>Wait in your inbox</td>
              <td>Assistant uses your Knowledge</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Portfolios, “all my links”</td>
              <td>Coaches, workshops, brand collabs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        PingMyBio runs as an AI bio at runtime — not a Classic/AI toggle in
        settings. If you only need a pretty button list, use a list tool. If
        your bio is how you get clients, keep reading.
      </p>

      <h2>What you need before you start</h2>
      <ul>
        <li>An email you check (login + Inbox alerts)</li>
        <li>A short bio and a clear photo or brand mark</li>
        <li>At least one offer you actually sell — a linked offer, a freebie, or Work with me</li>
        <li>
          The answers you already repeat in DMs (“how much?”, “what’s
          included?”, “do you work with brands?”)
        </li>
      </ul>

      <h2>Step 1 — Create your page and claim the URL</h2>
      <ol>
        <li>Go to <Link href="/">Create a page</Link> and sign up.</li>
        <li>
          Claim a short slug. Your public page will be{" "}
          <strong>pingmybio.com/yourname</strong>.
        </li>
        <li>
          Use the handle people already know from Instagram or TikTok when you
          can. Changing it later means updating every bio that links to you.
        </li>
      </ol>

      <h2>Step 2 — Finish Profile (the storefront header)</h2>
      <p>
        Open <strong>App → Profile</strong>. This is what fans see before they
        chat: your name, one-line bio, avatar, and category. Keep the bio to
        one sharp sentence — “Coaching for creators who sell” beats a paragraph.
        Finish identity here first; everything else reads better once the
        header is real.
      </p>

      <h2>Step 3 — Feed Knowledge (this is the moat)</h2>
      <p>
        Knowledge is the raw material your assistant answers from. Paste in the
        things you’d tell a new client on a first call: what you sell, how it
        works, pricing anchors, turnaround times, policies, the story behind
        it. No need to write “documentation” — bullet notes beat essays. Then
        add your FAQs as individual entries; the assistant retrieves them
        verbatim when a fan asks.
      </p>

      <h2>Step 4 — Publish offers</h2>
      <p>
        Create offers for the paths you want fans to take: your main program,
        a low-ticket freebie, a workshop, 1:1 time. Order matters — the
        assistant surfaces higher-priority offers first when the moment fits.
        Each offer carries a title, a price or “free”, a short pitch, and a
        destination (checkout, calendar, or external link).
      </p>

      <h2>Step 5 — Turn on Work with me (if brands matter)</h2>
      <p>
        Work with me puts a brand-facing intake on your page: scope, budget,
        timeline. When a partner submits, PingMyBio runs research and drops a
        reply brief into your Inbox — company snapshot, fit analysis, and a
        suggested first reply. You keep the final say; the machine does the
        homework.
      </p>

      <h2>Step 6 — Go live</h2>
      <ol>
        <li>Copy your public URL from the dashboard.</li>
        <li>Instagram: <strong>Edit profile → Links → Add external link</strong>.</li>
        <li>
          TikTok: <strong>Edit profile → Website</strong> (phone app only —{" "}
          <Link href="/blog/tiktok-link-in-bio">full walkthrough</Link>).
        </li>
        <li>
          Pin it, and tell your audience what not to do: don’t ask in comments,
          ask on the page.
        </li>
      </ol>

      <div className="callout">
        <strong>The 20-minute version:</strong> Profile (4 min) → Knowledge:
        paste your last 10 DM replies (8 min) → one flagship offer (4 min) →
        bio link swap (2 min). Ship it. Refine weekly.
      </div>

      <h2>Common mistakes</h2>
      <ul>
        <li>
          <strong>Over-theming.</strong> Nobody fans out over gradients. Answers
          close; aesthetics convince.
        </li>
        <li>
          <strong>Empty Knowledge.</strong> An assistant with nothing to say
          says “I don’t know” — and fans leave.
        </li>
        <li>
          <strong>Ten offers at once.</strong> Start with three paths: buy,
          book, or freebie. Expand later.
        </li>
        <li>
          <strong>Linking the wrong URL.</strong> Your bio should anchor to the
          page, not a campaign that expires.
        </li>
      </ul>

      <p>
        <Link
          href="/"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Create my page — it’s free
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </p>
    </ArticleShell>
  );
}
