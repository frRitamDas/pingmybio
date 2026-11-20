"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-foreground" role="status">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" aria-hidden="true" />
        </span>
        You&rsquo;re on The Ping. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setError("Enter a valid email — like you@studio.com");
          return;
        }
        setError("");
        setDone(true);
      }}
      noValidate
      className="w-full max-w-sm"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email for The Ping newsletter
      </label>
      <div className="flex overflow-hidden rounded-full border border-border bg-background focus-within:ring-2 focus-within:ring-ring">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@studio.com"
          className="h-11 w-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Join The Ping newsletter"
          className="flex h-11 w-12 flex-none items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/85"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        The Ping — one email a month. Unsubscribe anytime.
      </p>
    </form>
  );
}
