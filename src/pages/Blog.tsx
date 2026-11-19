import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionHeading from '../components/SectionHeading';
import { ArrowUpRight } from '../components/Icons';
import { posts, excerptOf } from '../data/posts';

export default function Blog() {
  return (
    <>
      <PageMeta title="Journal · PingMyBio" description="Guides on link-in-bio storefronts, AI assistants for creators, and comparing bio link tools." />
      <section className="px-6 pb-28 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Journal" title="Guides for creators who sell" body="Practical notes on setting up your bio link, answering fans, and picking the right tools." />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="glass group flex flex-col rounded-3xl p-8 transition-transform hover:-translate-y-0.5"
              >
                <h2 className="font-display text-3xl leading-tight text-ink">{post.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{excerptOf(post)}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Read the guide <ArrowUpRight className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
