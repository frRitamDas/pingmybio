# PingMyBio — Your Bio, Now Intelligent.

Premium monochrome marketing site for PingMyBio, the AI-powered link-in-bio.
Hand-built static site: no framework, no build step.

## Run locally

```bash
npx serve .          # or: python3 -m http.server 8000
```

## Stack

- Plain HTML/CSS/JS — `assets/premium.css` (design system), `assets/premium.js` (motion engine)
- Fraunces + Inter + JetBrains Mono (Google Fonts)
- Motion: preloader, masked headline reveals, IO-based scroll reveals, self-playing chat mock,
  magnetic buttons, marquee, animated counters, custom cursor — all reduced-motion aware
- Strictly black & white. Hand-written inline SVG artwork throughout.

## Pages

`index` · `pricing` · `blog` · 4 field guides · `app_profile` (app preview) · `privacy` · `terms` · `404`

## Deploy

Static deploy on Vercel (`vercel.json` sets clean URLs + cache/security headers).
