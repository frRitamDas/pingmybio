import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, SIGNUP_URL } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-8 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-3xl tracking-tight">
            PingMyBio<sup className="ml-0.5 align-super text-[0.45em]">®</sup>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            One link to answer questions, connect with fans, and grow your creator business.
          </p>
        </div>
        <FooterCol title="Product" links={[
          { label: 'Features', to: '/features' },
          { label: 'Pricing', to: '/pricing' },
          { label: 'FAQ', to: '/faq' },
          { label: 'Journal', to: '/blog' },
        ]} />
        <FooterCol title="Company" links={[
          { label: 'Reach Us', to: '/contact' },
          { label: 'Privacy', to: '/privacy' },
          { label: 'Terms', to: '/terms' },
        ]} />
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink">Get started</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a className="text-muted transition-colors hover:text-ink" href={SIGNUP_URL}>Create My Page</a>
            </li>
            <li>
              <a className="text-muted transition-colors hover:text-ink" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-black/10 px-8 py-6 text-xs text-muted md:flex-row md:justify-between">
        <span>© 2026 PingMyBio. All rights reserved.</span>
        <span>Free to start.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link className="text-muted transition-colors hover:text-ink" to={l.to}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
