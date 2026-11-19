import PageMeta from '../components/PageMeta';
import Article from '../components/Article';
import type { Block } from '../components/Article';
import privacy from '../data/privacy.json';
import terms from '../data/terms.json';

const docs: Record<'privacy' | 'terms', { title: string; blocks: Block[] }> = {
  privacy: privacy as { title: string; blocks: Block[] },
  terms: terms as { title: string; blocks: Block[] },
};

export default function Legal({ doc }: { doc: 'privacy' | 'terms' }) {
  const d = docs[doc];
  const body = d.blocks.filter((b) => !(b.type === 'h' && b.level === 1));
  return (
    <>
      <PageMeta title={`${doc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} · PingMyBio`} />
      <article className="px-6 pb-28 pt-16 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            {doc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <div className="mt-12">
            <Article blocks={body} />
          </div>
        </div>
      </article>
    </>
  );
}
