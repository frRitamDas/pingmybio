// Central site content. Prices and plan details match the live checkout at pingmybio.com.

export const SIGNUP_URL = 'https://www.pingmybio.com/app/profile?signin=1';
export const CHECKOUT_URL = (plan: 'starter' | 'pro', interval: 'month' | 'year') =>
  'https://www.pingmybio.com/app/profile?next=' +
  encodeURIComponent(`/app/settings?tab=billing&checkout=${plan}&interval=${interval}`);
export const CONTACT_EMAIL = 'info@pingmybio.com';

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Journal', to: '/blog' },
  { label: 'Reach Us', to: '/contact' },
];

export interface Plan {
  id: 'free' | 'starter' | 'pro';
  name: string;
  tagline: string;
  monthly: number; // USD per month
  yearly: number; // USD per month when billed yearly
  yearlyTotal?: number;
  recommended?: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Try your storefront',
    monthly: 0,
    yearly: 0,
    features: [
      '300 AI replies a month',
      'Up to 5 live offers',
      'Replies from your offers and FAQs',
      'Unlimited links on your page',
      'Click analytics',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For creators ready to grow',
    monthly: 12,
    yearly: 10,
    yearlyTotal: 120,
    recommended: true,
    features: [
      '1,200 AI replies a month',
      'Unlimited offers on your page',
      'Brand collaboration tools',
      'Replies that use your reels',
      'Click analytics',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For high-volume creators',
    monthly: 29,
    yearly: 24.17,
    yearlyTotal: 290,
    features: [
      '2,500 AI replies a month',
      'Unlimited offers on your page',
      'Brand collaboration tools',
      'Priority support',
      'Click analytics',
    ],
  },
];

// Feature comparison, from the live pricing page.
export const COMPARISON: { feature: string; free: string; starter: string; pro: string }[] = [
  { feature: 'AI replies per month', free: '300', starter: '1,200', pro: '2,500' },
  { feature: 'Answers from your offers and FAQs', free: 'Included', starter: 'Included', pro: 'Included' },
  { feature: 'Answers from your reels', free: 'Not included', starter: 'Included', pro: 'Included' },
  { feature: 'Brand collaboration requests', free: 'Not included', starter: 'Included', pro: 'Included' },
  { feature: 'AI brand research', free: 'Not included', starter: 'Included', pro: 'Included' },
  { feature: 'Collab briefs in Inbox', free: 'Not included', starter: 'Included', pro: 'Included' },
  { feature: 'Offers on your page', free: '5', starter: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Click analytics', free: 'Included', starter: 'Included', pro: 'Included' },
  { feature: 'Email support', free: 'Included', starter: 'Included', pro: 'Included' },
  { feature: 'Priority support', free: 'Not included', starter: 'Not included', pro: 'Included' },
];

export const FEATURES = [
  {
    title: 'AI Assistant',
    body: 'Answers visitor questions using your knowledge and offers, around the clock.',
    details: [
      'Answers from your FAQs, notes, and offers',
      'Points visitors to the right offer or next step',
      'Replies that use your reels on Starter and Pro',
    ],
  },
  {
    title: 'Offers & Bookings',
    body: 'Helps visitors explore your services, book sessions, or buy your offers.',
    details: [
      'Add services and offers to your page',
      'Free includes 5 live offers; Starter and Pro are unlimited',
      'Booking and buying are available where enabled',
    ],
  },
  {
    title: 'Messages & Collaborations',
    body: 'Gives followers a way to reach you and brands a dedicated collaboration path where available.',
    details: [
      'Fans can message you through your page',
      'Brands send collaboration requests on Starter and Pro',
      'You get AI brand research and a reply brief in your Inbox',
    ],
  },
  {
    title: 'Knowledge, Inbox & Analytics',
    body: 'Manage your information, incoming conversations, and performance from one workspace.',
    details: [
      'Keep your knowledge and FAQs up to date',
      'Read and reply to conversations in one Inbox',
      'Click analytics for your dashboard only',
    ],
  },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create your page',
    body: 'Build your personalized bio page and claim your unique link.',
  },
  {
    step: '02',
    title: 'Teach your assistant',
    body: 'Add your information, FAQs, and offers so your AI assistant can guide visitors.',
  },
  {
    step: '03',
    title: 'Share your link',
    body: 'Post it on social media. Visitors can ask questions, message you, or book and buy where enabled.',
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'Is PingMyBio free to start?',
    a: 'Yes. The Free plan is $0 and includes 300 AI replies a month and up to 5 live offers. You can upgrade anytime from Settings under Billing.',
  },
  {
    q: 'What does the AI assistant answer?',
    a: 'Questions about you, using the information you add: your FAQs, notes, services, and offers. It can point visitors to the right offer or next step, such as booking a session or buying a product.',
  },
  {
    q: 'What counts as an AI reply?',
    a: 'One reply your assistant gives a visitor on your page counts as one AI reply. Offer cards included in a reply don’t cost extra. Brand research for collaborations doesn’t count toward your AI replies.',
  },
  {
    q: 'Can I add offers and bookings?',
    a: 'Yes. Add your offers to your page and your assistant can recommend them. The Free plan includes up to 5 live offers, and Starter and Pro include unlimited offers. Booking and buying are available where enabled.',
  },
  {
    q: 'Can brands contact me?',
    a: 'Yes, on Starter and Pro. Brands can send collaboration requests from your page. When one arrives, you get AI brand research and a draft reply brief in your Inbox.',
  },
  {
    q: 'Is brand research part of the reply meter?',
    a: 'No. When a brand starts a collab, we research the company and draft a brief for your inbox. That does not use AI replies.',
  },
  {
    q: 'What happens when I hit the limit?',
    a: 'Fans can still open your page and tap links. The assistant pauses until your meter resets, or you upgrade.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. Upgrade anytime from Settings under Billing. Cancel in two clicks via the customer portal. Access continues until the period ends.',
  },
  {
    q: 'Do you put Google Analytics or ads on my page?',
    a: 'No. Your public page has no Google Analytics, ad pixels, or other ad trackers. We record visits and taps for your dashboard only, as a salted hash of IP plus browser, not who the visitor is, and we do not sell that data.',
  },
];
