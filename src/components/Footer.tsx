export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-8 py-8 font-body text-sm text-white/60 md:px-16">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p>© 2026 PingMyBio</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <a className="hover:text-white" href="/pricing.html">Pricing</a>
          <a className="hover:text-white" href="/blog.html">Blog</a>
          <a className="hover:text-white" href="/privacy.html">Privacy</a>
          <a className="hover:text-white" href="/terms.html">Terms</a>
          <a className="hover:text-white" href="/light.html">Light version</a>
          <a className="hover:text-white" href="/app/profile?signin=1">Sign in</a>
        </nav>
      </div>
    </footer>
  );
}
