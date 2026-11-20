import { cn } from "@/lib/utils";

export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="21" r="3.4" fill="currentColor" />
      <path
        d="M8.5 15.5a10.6 10.6 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.5 10.5a16.2 16.2 0 0 1 23 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}

export function LogoWordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={cn(
        "text-[1.05rem] font-semibold tracking-tight",
        dark ? "text-ink-foreground" : "text-foreground"
      )}
    >
      PingMyBio
    </span>
  );
}
