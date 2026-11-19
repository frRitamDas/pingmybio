// Static build: copies the site into dist/ so the Vercel project's
// `npm run build` + `dist` output settings work without a bundler.
import { cp, mkdir, rm, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");

const IGNORE = new Set([
  ".git",
  "dist",
  "node_modules",
  "scripts",
  ".arena",
  ".cache",
  ".local",
  ".vercel",
  "package.json",
  "package-lock.json",
  "README.md",
  "vercel.json"
]);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const entries = await readdir(root, { withFileTypes: true });
for (const entry of entries) {
  if (IGNORE.has(entry.name) || entry.name.startsWith(".")) continue;
  await cp(join(root, entry.name), join(out, entry.name), { recursive: true });
}

console.log("Built static site to dist/");
