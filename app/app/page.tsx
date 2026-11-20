import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Sparkles,
  Tag,
  Image as ImageIcon,
  Activity,
  Inbox,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Check,
} from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { CTA } from "@/components/site/cta";
import { ProgressRing } from "@/components/app-preview/progress-ring";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "App preview",
  description:
    "A look inside the PingMyBio dashboard — claim your link, finish four quick steps, and let the assistant take it from there.",
  alternates: { canonical: "/app" },
  openGraph: { url: `${SITE.url}/app` },
};

const SIDEBAR = [
  { icon: User, label: "Profile", active: true },
  { icon: Sparkles, label: "Assistant", active: false },
  { icon: Tag, label: "Offers", active: false },
  { icon: ImageIcon, label: "Portfolio", active: false },
  { icon: Activity, label: "Activity", active: false },
  { icon: Inbox, label: "Inbox", active: false },
  { icon: Briefcase, label: "Collabs", active: false },
  { icon: Users, label: "Fans", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const CHECKLIST = [
  {
    done: true,
    title: "Name your page",
    meta: "The name fans see first. Done — pingmybio.com/maya",
  },
  {
    done: false,
    title: "Write a short bio",
    meta: "One sharp line. “Coaching for creators who sell.”",
  },
  {
    done: false,
    title: "Add an offer",
    meta: "Your flagship thing — a product, a call, or a freebie.",
  },
  {
    done: false,
    title: "Share your page",
    meta: "Swap the URL into Instagram & TikTok bios.",
  },
];

export default function AppPreviewPage() {
  return (
    <>
      {/* ════════ HERO (band) ════════ */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-muted"
          >
            <Link href="/" className="transition-colors hover:text-ink-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-ink-foreground">App preview</span>
          </nav>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
            Get your page{" "}
            <span className="bg-gradient-to-br from-white via-white to-[#6e6e74] bg-clip-text italic text-transparent">
              live.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            A look inside the dashboard — claim your link, finish four quick
            steps, and let the assistant take it from there.
          </p>
        </div>
      </section>

      {/* ════════ DASHBOARD MOCK ════════ */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div
            role="img"
            aria-label="PingMyBio dashboard mock: sidebar navigation and a setup checklist with a progress ring showing 1 of 4 steps complete"
            className="grid overflow-hidden rounded-3xl border border-border shadow-lift lg:grid-cols-[230px_1fr]"
          >
            {/* Sidebar */}
            <aside className="flex flex-row gap-1 overflow-x-auto bg-ink p-4 text-ink-foreground lg:flex-col lg:gap-0 lg:p-5">
              <div className="hidden items-center gap-2 px-2 pb-6 pt-1 lg:flex">
                <LogoMark size={22} className="text-[#f5f5f7]" />
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.3em] text-white/50">
                  Studio
                </span>
              </div>
              {SIDEBAR.map(({ icon: Icon, label, active }) => (
                <span
                  key={label}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "flex flex-none items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2 text-[0.8rem] font-medium text-white"
                      : "flex flex-none items-center gap-2.5 rounded-xl px-3 py-2 text-[0.8rem] text-white/55"
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                </span>
              ))}
              <div className="mt-auto hidden border-t border-white/10 px-2 pt-4 text-[0.65rem] leading-relaxed text-white/45 lg:block">
                <b className="block text-white/70">YP — Your profile</b>
                Creator workspace
              </div>
            </aside>

            {/* Main panel */}
            <div className="bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground">
                    PingMyBio / Profile
                  </p>
                  <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">
                    Get your page live
                  </h2>
                </div>
                <button
                  type="button"
                  aria-disabled="true"
                  tabIndex={-1}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground opacity-80"
                >
                  Save
                </button>
              </div>

              {/* Setup card */}
              <div className="mt-6 rounded-2xl border border-border bg-background p-6 shadow-card sm:p-7">
                <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground">
                      Setup
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      Your page is almost ready
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      Finish the remaining steps — the assistant gets smarter
                      with every one.
                    </p>
                  </div>
                  <ProgressRing />
                </div>
                <ul className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {CHECKLIST.map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5 py-3.5">
                      <span
                        className={
                          item.done
                            ? "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-primary"
                            : "mt-0.5 h-5 w-5 flex-none rounded-md border border-border"
                        }
                      >
                        {item.done && (
                          <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3.5} aria-hidden="true" />
                        )}
                      </span>
                      <span>
                        <b
                          className={
                            item.done
                              ? "block text-sm font-semibold text-muted-foreground line-through decoration-foreground/30"
                              : "block text-sm font-semibold"
                          }
                        >
                          {item.title}
                        </b>
                        <small className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {item.meta}
                        </small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-muted-foreground">
                Live-look preview — full app ships with your invite
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <CTA href="/app" variant="solid" className="h-13 px-8 text-base">
              Claim pingmybio.com/you
            </CTA>
            <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
              Free to start · 300 AI replies/mo · No waitlist
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
