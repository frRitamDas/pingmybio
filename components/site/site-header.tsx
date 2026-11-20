"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { NAV_LINKS } from "@/lib/site";
import { Magnetic } from "@/components/fx/magnetic";
import { PaletteTrigger } from "@/components/fx/command-palette";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-hairline bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="PingMyBio — home"
            className="flex items-center gap-2.5 text-foreground"
          >
            <LogoMark size={25} />
            <span className="text-[1.02rem] font-semibold tracking-tight">
              PingMyBio
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                      isActive(link.href) && "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <PaletteTrigger className="inline-flex" />
            <Link
              href="/app"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Magnetic strength={0.28}>
              <Link
                href="/app"
                className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Create my page
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Magnetic>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mmenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-[#08080a] px-6 pb-10 pt-24 text-[#f5f5f7] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {[...NAV_LINKS, { label: "Sign in", href: "/app" }].map(
                  (link) => (
                    <li key={link.label + link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight text-[#f5f5f7] transition-colors hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight className="h-5 w-5 text-white/40" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
            <button
              onClick={() => router.push("/app")}
              className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f5f5f7] text-base font-semibold text-[#0a0a0a]"
            >
              Create my page — it&rsquo;s free
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="mt-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
              Free to start · No waitlist
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
