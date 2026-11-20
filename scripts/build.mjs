// Static-site build: copies the deployable site into dist/
import { rmSync, mkdirSync, copyFileSync, readdirSync, statSync, cpSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const FILES = ['index.html','pricing.html','blog.html',
  'blog_how-to-set-up-ai-storefront.html','blog_linktree-alternative.html',
  'blog_stan-store-alternative.html','blog_tiktok-link-in-bio.html',
  'app_profile.html','privacy.html','terms.html','404.html',
  'robots.txt','sitemap.xml','README.md'];

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
for (const f of FILES) {
  try { copyFileSync(join(ROOT, f), join(DIST, f)); } catch (e) { console.warn('skip', f); }
}
cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });
console.log('dist/ built:', readdirSync(DIST).join(', '));
