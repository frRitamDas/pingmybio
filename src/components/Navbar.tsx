import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS, SIGNUP_URL } from '../data/site';
import { Close, Menu } from './Icons';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6" aria-label="Main">
        <Link to="/" className="font-display text-3xl tracking-tight text-ink" aria-label="PingMyBio home">
          PingMyBio<sup className="ml-0.5 align-super text-[0.45em]">®</sup>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={SIGNUP_URL}
            className="hidden rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] md:inline-block"
          >
            Create My Page
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-background px-8 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `text-base ${isActive ? 'text-ink' : 'text-muted'}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href={SIGNUP_URL}
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
          >
            Create My Page
          </a>
        </div>
      )}
    </header>
  );
}
