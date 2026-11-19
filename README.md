# PingMyBio — landing site

Static marketing site for PingMyBio (pink/blush, charcoal type, `#E11D74` primary).

## Structure

```
index.html            Landing page (hero → trust → how it works → features → pricing → FAQ → CTA)
pricing.html          Pricing, plan comparison table and billing FAQ
blog*.html            Guide articles
privacy.html / terms.html
app_profile.html      Exported app/profile copy
assets/redesign/      Site design system: site.css + site.js (only used by index & pricing)
assets/*.js|*.css     Legacy bundle assets from the original export
scripts/build.mjs     Copies the site into dist/ for Vercel
vercel.json           Clean URLs + security headers
```

## Run locally

```bash
python3 -m http.server 4173 --bind 0.0.0.0   # or: npm start
```

Open http://localhost:4173

## Build & deploy

```bash
npm run build     # -> dist/
```

The Vercel project (`pingmybio`) uses framework preset `vite`, build `npm run build`,
output `dist/`. Production aliases: `pingmybio.vercel.app`.

## Content rules

- Pricing must match live checkout: Free $0 (300 AI replies, 5 offers), Starter
  $12/mo or $120/yr (1,200 replies), Pro $29/mo or $290/yr (2,500 replies).
- Do not publish invented testimonials or star ratings. The trust band under the
  hero currently shows verifiable plan facts; swap in real, permissioned review
  cards using the template at the bottom of `index.html`.
- Signup CTAs link to `https://www.pingmybio.com/app/profile?signin=1`; plan CTAs
  link to `/app/settings?tab=billing&checkout=<plan>&interval=<month|year>`.
