import { motion } from 'framer-motion';
import { ArrowUpRight } from './Icons';
import { SIGNUP_URL } from '../constants';

const links = [
  { label: 'Features', href: '#capabilities' },
  { label: 'Pricing', href: '/pricing.html' },
  { label: 'Blog', href: '/blog.html' },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ filter: 'blur(10px)', opacity: 0, y: -10 }}
      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex items-center justify-between px-8 lg:px-16"
    >
      <a
        href="/"
        aria-label="PingMyBio home"
        className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full font-heading text-2xl italic"
      >
        p
      </a>

      <nav className="liquid-glass hidden items-center gap-1 rounded-full px-1.5 py-1.5 md:flex" aria-label="Main">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-full px-3 py-2 font-body text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
        <a
          href={SIGNUP_URL}
          className="ml-1 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-body text-sm font-medium text-black transition-transform hover:scale-[1.02]"
        >
          Create My Page
          <ArrowUpRight />
        </a>
      </nav>

      <a
        href={SIGNUP_URL}
        className="rounded-full bg-white px-4 py-2 font-body text-sm font-medium text-black md:hidden"
      >
        Create My Page
      </a>
      <div className="hidden h-12 w-12 md:block" aria-hidden="true" />
    </motion.header>
  );
}
