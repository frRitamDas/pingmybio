# PingMyBio — Your Bio, Now Intelligent.

Premium monochrome marketing site for PingMyBio, the AI-powered link-in-bio.
Rebuilt ground-up in Next.js (App Router) with Tailwind CSS v4 and shadcn-style UI.

## Stack

- **Next.js 16** (App Router, static export via `output: "export"`) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`, `@theme inline` design tokens in `app/globals.css`)
- **shadcn/ui-style primitives** in `components/ui/` — incl. the 21st.dev components:
  `liquid-metal-button` (WebGL via `@paper-design/shaders`), `pricing` (fan cards, NumberFlow, grayscale confetti), `liquid-glass-button`
- **Inter Variable** (`@fontsource-variable/inter`, self-hosted) · tabular figures via `.tnum`
- Strictly black & white, dual light-editorial / inverted black showcase bands

## Run locally

```bash
npm install
npm run dev      # dev server
npm run build    # next build + copies out/ → dist/
```

## Pages (all static)

`/` · `/pricing` · `/app` (app preview) · `/blog` · 4 field guides · `/privacy` · `/terms` · 404

## Deploy

Static export → `dist/` (see `scripts/postbuild.mjs`). Vercel serves `dist/` with clean URLs;
`vercel.json` holds legacy `.html` redirects + cache/security headers.
