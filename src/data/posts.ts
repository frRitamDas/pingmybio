import blogJson from './blog.json';
import type { Block } from '../components/Article';

export interface Post {
  slug: string;
  title: string;
  blocks: Block[];
}

// Long-form content extracted from the original guides.
export const posts = blogJson as Post[];

export function getPost(slug: string | undefined) {
  return posts.find((p) => p.slug === slug);
}

/** The first paragraph of a post, used as its summary. */
export function excerptOf(post: Post) {
  const p = post.blocks.find((b) => b.type === 'p');
  return p && p.type === 'p' ? p.text : '';
}
