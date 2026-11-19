import { motion } from 'framer-motion';
import BlurText from './BlurText';
import BackgroundImage from './BackgroundImage';
import { ArrowUpRight, CalendarIcon, InboxIcon, MessageIcon, SparkIcon } from './Icons';
import { SIGNUP_URL } from '../constants';

const features = [
  {
    icon: SparkIcon,
    title: 'AI Assistant',
    tags: ['Your knowledge', 'Offers', 'Instant replies'],
    body: 'Answers visitor questions using your knowledge and offers.',
  },
  {
    icon: CalendarIcon,
    title: 'Offers & Bookings',
    tags: ['Services', 'Bookings', 'Buy now'],
    body: 'Helps visitors explore services, book sessions, or buy offers.',
  },
  {
    icon: MessageIcon,
    title: 'Messages & Collaborations',
    tags: ['Fan messages', 'Brand collabs'],
    body: 'Gives followers a way to reach you and brands a dedicated collaboration path where available.',
  },
  {
    icon: InboxIcon,
    title: 'Knowledge, Inbox & Analytics',
    tags: ['FAQs', 'Conversations', 'Click analytics'],
    body: 'Manage information, incoming conversations, and performance from one workspace.',
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundImage src="/images/capabilities-bg.jpg" className="absolute inset-0 z-0 h-full w-full object-cover" />
      <div className="absolute inset-0 z-[1] bg-black/60" />

      <div className="relative z-10 flex min-h-screen flex-col px-8 pb-10 pt-24 md:px-16 lg:px-20">
        <header className="mb-auto">
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6 font-body text-sm text-white/80"
          >
            // Features
          </motion.p>
          <BlurText
            text="Everything your link needs to do the work"
            className="max-w-4xl font-heading text-6xl italic leading-[0.95] tracking-[-3px] md:text-7xl lg:text-[6rem]"
          />
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, tags, body }, i) => (
            <motion.article
              key={title}
              initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.1 }}
              className="liquid-glass flex min-h-[340px] flex-col rounded-[1.25rem] p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.75rem]">
                  <Icon className="text-white" />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass whitespace-nowrap rounded-full px-3 py-1 font-body text-[11px] text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1" />
              <h3 className="font-heading text-3xl italic leading-none tracking-[-1px] md:text-4xl">{title}</h3>
              <p className="mt-3 max-w-[32ch] font-body text-sm font-light leading-snug text-white/90">{body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={SIGNUP_URL}
            className="liquid-glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            Create My Page
            <ArrowUpRight />
          </a>
          <span className="font-body text-xs text-white/70">Free to start. Upgrade when your replies grow.</span>
        </div>
      </div>
    </section>
  );
}
