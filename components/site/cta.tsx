"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import { cn } from "@/lib/utils";

type Variant = "liquid" | "metal" | "solid" | "solid-light" | "outline" | "outline-light";

/**
 * Unified call-to-action. `liquid` / `metal` render the 21st.dev WebGL
 * buttons (buttons — they navigate via the router). The rest render
 * semantic links.
 */
export function CTA({
  href,
  children,
  variant = "solid",
  className,
  ariaLabel,
}: {
  href: string;
  children: string;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();

  if (variant === "liquid") {
    return (
      <LiquidMetalButton
        label={children}
        onClick={() => router.push(href)}
      />
    );
  }
  if (variant === "metal") {
    return (
      <MetalButton
        variant="default"
        onClick={() => router.push(href)}
        aria-label={ariaLabel ?? children}
        className={className}
      >
        {children}
      </MetalButton>
    );
  }

  const base =
    "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const styles: Record<string, string> = {
    solid:
      "bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring",
    "solid-light":
      "bg-[#f5f5f7] text-[#0a0a0a] ring-offset-[#08080a] hover:bg-white focus-visible:ring-white",
    outline:
      "border border-border bg-transparent text-foreground ring-offset-background hover:bg-accent focus-visible:ring-ring",
    "outline-light":
      "border border-white/25 bg-transparent text-[#f5f5f7] ring-offset-[#08080a] hover:border-white/50 hover:bg-white/5 focus-visible:ring-white",
  };

  return (
    <Link href={href} aria-label={ariaLabel} className={cn(base, styles[variant], className)}>
      <span>{children}</span>
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[0.95rem] font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
