import LoopVideo from './LoopVideo';
import { SIGNUP_URL } from '../data/site';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';
const POSTER = '/images/hero-bg.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background video layer (z-0). Positioned from 300px to the bottom edge. */}
      <LoopVideo
        src={VIDEO_URL}
        poster={POSTER}
        className="pointer-events-none absolute left-0 right-0 z-0 h-auto w-full object-cover"
        style={{ top: '300px', bottom: 0 }}
      />

      {/* Gradient overlay on the video */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent to-background" />

      {/* Hero content (z-10) */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        <h1 className="animate-fade-rise max-w-7xl font-display text-5xl font-normal text-ink sm:text-7xl md:text-8xl" style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}>
          Turn your bio into an{' '}
          <em className="not-italic text-muted">AI-powered storefront.</em>
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Answer fan questions, share your offers and bookings, and let brands reach you. One link, always on.
          Built for creators who sell from Instagram and TikTok.
        </p>

        <a
          href={SIGNUP_URL}
          className="animate-fade-rise-delay-2 mt-12 inline-block rounded-full bg-ink px-14 py-5 text-base font-medium text-white transition-transform hover:scale-[1.03]"
        >
          Create My Page
        </a>
        <p className="animate-fade-rise-delay-2 mt-4 text-sm text-muted">Free to start</p>
      </div>
    </section>
  );
}
