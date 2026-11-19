import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <PageMeta title="Page not found · PingMyBio" />
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">404</p>
      <h1 className="mt-4 font-display text-6xl tracking-tight md:text-7xl">This page wandered off.</h1>
      <p className="mt-5 max-w-md text-base text-muted">The link may be out of date. Head back to the home page to keep exploring.</p>
      <Link to="/" className="mt-10 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.03]">
        Back to home
      </Link>
    </section>
  );
}
