/* Single source of truth for PingMyBio marketing copy. */

export const SITE = {
  name: "PingMyBio",
  url: "https://www.pingmybio.com",
  tagline: "Your Bio, Now Intelligent.",
  description:
    "Your AI-powered bio page that answers followers, recommends your services, and helps you sell 24/7. One link. Infinite answers.",
  email: "hello@pingmybio.com",
  privacyEmail: "privacy@pingmybio.com",
  securityEmail: "security@pingmybio.com",
  legalEmail: "legal@pingmybio.com",
} as const;

export const STATS = [
  { value: 12400, suffix: "+", label: "Pages live", decimals: 0 },
  { value: 3.1, suffix: "M", label: "AI replies sent", decimals: 1 },
  { value: 4.9, suffix: "/5", label: "Creator rating", decimals: 1 },
  { value: 38, prefix: "+", suffix: "%", label: "Bookings vs. link lists", decimals: 0 },
] as const;

export const PLANS = [
  {
    name: "Free",
    price: "0",
    yearlyPrice: "0",
    period: "forever",
    features: [
      "300 convos / month",
      "Replies from your offers & FAQs",
      "Up to 5 offers live at once",
      "Unlimited links on the page",
      "Click analytics",
    ],
    description: "Fans get answers on your page from day one.",
    buttonText: "Start free",
    href: "/app",
    isPopular: false,
  },
  {
    name: "Starter",
    price: "12",
    yearlyPrice: "10",
    period: "month",
    features: [
      "1,200 convos / month",
      "Replies that use your reels, not just text",
      "Unlimited offers on the page",
      "Brands send collab requests to you",
      "Research + reply brief in Inbox",
      "Click analytics",
    ],
    description: "For reels that sell and brands that slide into your DMs.",
    buttonText: "Choose Starter",
    href: "/app",
    isPopular: true,
  },
  {
    name: "Pro",
    price: "29",
    yearlyPrice: "24",
    period: "month",
    features: [
      "2,500 convos / month",
      "Reels, unlimited offers & collab briefs",
      "Room when a post blows up",
      "We answer you first when you write in",
      "New studio features before Free",
      "Click analytics",
    ],
    description: "Headroom when a post blows up.",
    buttonText: "Get Pro",
    href: "/app",
    isPopular: false,
  },
];

export const FAQS_HOME = [
  {
    q: "What counts as 1 convo?",
    a: "One reply your assistant gives a fan on your page. Offer cards shown inside a reply don't cost extra — only the reply itself counts toward your monthly meter.",
  },
  {
    q: "Is brand research part of the reply meter?",
    a: "No. Brand research runs when a partner starts a Work with me request — it's separate from the convo meter, so a big collab month won't eat your fan replies.",
  },
  {
    q: "What happens when I hit my limit?",
    a: "Your page keeps working — fans can still tap offers and send collab requests. The assistant's auto-replies pause until the month resets, or you can upgrade instantly and keep the conversation going.",
  },
  {
    q: "Can I switch plans later?",
    a: "Anytime. Upgrade, downgrade, or cancel from your dashboard — changes apply immediately and we prorate the difference. No contracts, no “call us to cancel”.",
  },
  {
    q: "Do you put ads or trackers on my page?",
    a: "Never. No ad networks, no third-party pixels on your public page, no selling your audience's data. Your page is your page.",
  },
];

export const FAQS_PRICING = [
  {
    q: "What counts as 1 convo?",
    a: "One reply your assistant gives a fan on your page. Offer cards inside a reply are not charged extra.",
  },
  {
    q: "Is brand research part of the reply meter?",
    a: "No. Research runs when a partner starts a collab request and is metered separately — heavy collab months don't touch your fan replies.",
  },
  {
    q: "What happens when I hit the limit?",
    a: "Your page stays live — offers, links, and collab intake keep working. Auto-replies pause until the month resets, or upgrade instantly to keep them running.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes — upgrade, downgrade, or cancel anytime from the dashboard. Prorated instantly, no contracts, no retention calls.",
  },
  {
    q: "Do you put Google Analytics or ads on my page?",
    a: "Never. No ad networks, no third-party pixels, no selling audience data. Analytics on your dashboard are first-party and yours alone.",
  },
];

export const TESTIMONIALS = [
  {
    initials: "MC",
    name: "Maya Chen",
    role: "Creator Coach · 84k followers",
    quote:
      "The assistant closed two coaching slots at 1am while I was asleep. My link used to be a graveyard of buttons — now it's the best salesperson I've ever had.",
  },
  {
    initials: "JO",
    name: "Jonas Okafor",
    role: "Photographer · Brand collabs",
    quote:
      "Brand deals used to drown me in DMs. Now the page researches the partner and hands me a brief before I've even replied. Absurdly professional.",
  },
  {
    initials: "PR",
    name: "Priya Raman",
    role: "Newsletter · 31k subs",
    quote:
      "Switched from a plain link list. Conversion on my freebie doubled because the assistant routes the right person to the right thing.",
  },
  {
    initials: "SL",
    name: "Sofía Linares",
    role: "Sommelier · Workshops",
    quote:
      "It reads like me. Fans can't tell it's not me typing — and the booking slots it lands are better than the ones I used to close myself.",
  },
  {
    initials: "DK",
    name: "Daniel Kim",
    role: "Studio Artist · Commissions",
    quote:
      "If your bio is how you get clients, this is the difference between a business card and a receptionist who never sleeps.",
  },
  {
    initials: "AN",
    name: "Amara Ndiaye",
    role: "Chef · Classes & Supper Clubs",
    quote:
      "Setup took ten minutes. The first brand inquiry arrived before I finished filming the setup call. Inbox went from chaos to triage.",
  },
];

export const POSTS = [
  {
    slug: "how-to-set-up-ai-storefront",
    title: "How to Set Up an AI Storefront for Your Link in Bio",
    excerpt:
      "Step-by-step: profile, knowledge, offers, FAQs, Work with me — and going live on Instagram or TikTok without the theme rabbit hole.",
    description:
      "Step-by-step guide to an AI storefront on your bio link — profile, knowledge, offers, FAQs, Work with me, and going live on Instagram or TikTok.",
    date: "2026-09-09",
    dateLabel: "2026·09·09",
    readTime: "8 min read",
  },
  {
    slug: "linktree-alternative",
    title: "Best Linktree Alternatives in 2026",
    excerpt:
      "Solo, Beacons, Stan, Lnk.Bio, Carrd — compare by the job you need done and keep the one that answers, books, and sells.",
    description:
      "Solo, Beacons, Stan, Lnk.Bio, Carrd — honest comparisons of Linktree alternatives in 2026. Pick by the job you need: pretty links, media kit, checkout, or a bio that answers.",
    date: "2026-09-09",
    dateLabel: "2026·09·09",
    readTime: "11 min read",
  },
  {
    slug: "stan-store-alternative",
    title: "Best Stan Store Alternatives in 2026",
    excerpt:
      "Payhip, Sellfy, The Leap, Teachery, Pensight — cheaper checkout, course schools, or a bio that actually talks. Pick by job.",
    description:
      "Payhip, Sellfy, The Leap, Teachery, Pensight, and PingMyBio — the honest Stan Store alternatives in 2026. Cheaper checkout, course schools, coaching OS, or a bio that talks.",
    date: "2026-09-09",
    dateLabel: "2026·09·09",
    readTime: "10 min read",
  },
  {
    slug: "tiktok-link-in-bio",
    title: "TikTok Link in Bio — How to Add It (and What to Put There)",
    excerpt:
      "Edit profile → Website on the phone app. If the field is missing, here's why — and why that one URL should answer and book, not dump people into a list.",
    description:
      "How to add a clickable link in your TikTok bio, what to do if the Website field is missing, and why that one URL should answer and book — not dump people into a list.",
    date: "2026-09-09",
    dateLabel: "2026·09·09",
    readTime: "9 min read",
  },
];

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
] as const;

export const MARQUEE_ITEMS = [
  "One link — infinite answers",
  "AI-powered bio",
  "300 free AI replies / mo",
  "Work with me inbox",
  "Offers that convert",
  "No waitlist",
];
