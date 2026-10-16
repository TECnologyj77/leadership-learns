import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { renderStaticPage, staticPaths } from '../netlify/ssr/prerender-pages.js';

const output = join(process.cwd(), 'dist');

for (const path of staticPaths) {
  const target = path === '/' ? join(output, 'index.html') : join(output, path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderStaticPage(path), 'utf8');
  console.log(`Prerendered ${path}`);
}

await writeFile(join(output, '404.html'), renderStaticPage('/not-found'), 'utf8');
