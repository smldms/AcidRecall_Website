import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
// Copy HTTP security headers into the published directory
await mkdir(dist, { recursive: true });
await copyFile(
  path.join(root, '_headers'),
  path.join(dist, '_headers')
);
for (const name of ['index.html', 'styles.css', 'motion.css', 'script.js', 'robots.txt']) await copyFile(path.join(root, name), path.join(dist, name));
await cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
// Netlify provides the production URL at build time. Local archives keep relative metadata.
const siteUrl = process.env.URL;
if (siteUrl && /^https:\/\//.test(siteUrl)) {
  const base = new URL('/', siteUrl).href;
  let html = await readFile(path.join(dist, 'index.html'), 'utf8');
  html = html.replace('content="assets/studio-full.webp"', `content="${new URL('assets/studio-full.webp', base).href}"`);
  html = html.replace('</head>', `  <link rel="canonical" href="${base}">\n  <meta property="og:url" content="${base}">\n</head>`);
  await writeFile(path.join(dist, 'index.html'), html);
}
console.log('Ready: dist/ — static site, no runtime dependencies.');
