import { motion } from 'framer-motion';
import BlurText from './BlurText';
import BackgroundImage from './BackgroundImage';
import { ArrowUpRight, ClockIcon, SparkIcon } from './Icons';
import { PRICING_URL, SIGNUP_URL } from '../constants';

// Shared blur-in used by every hero element
const blurIn = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

const stats = [
  { icon: ClockIcon, value: '$0', label: 'Free plan, with 300 AI replies a month' },
  { icon: SparkIcon, value: '5', label: 'Live offers on Free; unlimited on Starter and Pro' },
];

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <BackgroundImage
        src="/images/hero-bg.jpg"
        className="absolute left-1/2 top-0 z-0 h-full w-full -translate-x-1/2 object-cover object-top"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/30 to-black" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
          <motion.div {...blurIn} transition={{ ...blurIn.transition, delay: 0.4 }}>
            <div className="liquid-glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4">
              <span className="rounded-full bg-white px-2.5 py-0.5 font-body text-xs font-semibold text-black">Free</span>
              <span className="font-body text-sm text-white/90">300 AI replies a month, free to start</span>
            </div>
          </motion.div>

          <div className="mt-6 max-w-3xl">
            <BlurText
              text="Turn your bio into an AI-powered storefront."
              className="font-heading text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[5.5rem]"
            />
          </div>

          <motion.p
            {...blurIn}
            transition={{ ...blurIn.transition, delay: 0.8 }}
            className="mt-4 max-w-2xl font-body text-sm font-light leading-tight text-white md:text-base"
          >
            One link that answers fan questions, shares your offers and bookings, and gives brands a way to reach you.
          </motion.p>

          <motion.div
            {...blurIn}
            transition={{ ...blurIn.transition, delay: 1.1 }}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-6"
          >
            <a
              href={SIGNUP_URL}
              className="liquid-glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Create My Page
              <ArrowUpRight />
            </a>
            <a href={PRICING_URL} className="flex items-center gap-2 font-body text-sm font-medium text-white/90 hover:text-white">
              See pricing
            </a>
          </motion.div>
          <motion.p {...blurIn} transition={{ ...blurIn.transition, delay: 1.15 }} className="mt-3 font-body text-xs text-white/70">
            Free to start
          </motion.p>

          <motion.div
            {...blurIn}
            transition={{ ...blurIn.transition, delay: 1.3 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="liquid-glass w-[220px] rounded-[1.25rem] p-5 text-left">
                <Icon className="text-white/80" />
                <div className="mt-4 font-heading text-4xl italic leading-none tracking-[-1px]">{value}</div>
                <p className="mt-2 font-body text-sm text-white/80">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...blurIn}
          transition={{ ...blurIn.transition, delay: 1.4 }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div className="liquid-glass rounded-full px-5 py-2">
            <p className="font-body text-sm text-white/90">Works from the link in your Instagram and TikTok bio</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
