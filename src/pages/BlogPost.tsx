import { Link, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import Article from '../components/Article';
import CtaBanner from '../components/CtaBanner';
import NotFound from './NotFound';
import { getPost, excerptOf } from '../data/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  // The first H1 is already shown as the page title, so skip it in the body.
  const body = post.blocks.filter((b) => !(b.type === 'h' && b.level === 1));

  return (
    <>
      <PageMeta title={`${post.title} · PingMyBio`} description={excerptOf(post)} />
      <article className="px-6 pb-24 pt-16 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-sm text-muted hover:text-ink">← Journal</Link>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">{post.title}</h1>
          <div className="mt-12">
            <Article blocks={body} />
          </div>
        </div>
      </article>
      <CtaBanner title="Turn your bio link into a storefront." body="Free to start. Set up your page and share one link." />
    </>
  );
}
