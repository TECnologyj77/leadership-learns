// Writes dist/sitemap.xml after the Vite build. Runs on every `npm run
// build` (see package.json), so `netlify.toml`'s build command picks it up
// automatically without a separate step.
//
// SITE_URL and the route/post lists are intentionally small, standalone
// copies (this script runs under plain Node, not through Vite/TypeScript) —
// keep them in sync with src/lib/site-config.ts and src/lib/blog-data.ts
// when routes or posts change.
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// Confirmed production domain — the site is not public yet, though. Keep in
// sync with src/lib/site-config.ts if it ever changes.
const SITE_URL = 'https://leadershiplearners.com'

const staticPaths = ['/', '/corporate', '/individual', '/about', '/blog', '/contact']

// Keep in sync with src/lib/blog-data.ts.
const blogPosts = [
  { slug: 'silent-killer-corporate-productivity', publishedAt: '2024-03-15' },
  { slug: 'adhd-at-work', publishedAt: '2024-03-20' },
  { slug: 'power-low-friction-systems', publishedAt: '2024-03-25' },
]

const urlEntries = [
  ...staticPaths.map((path) => ({ loc: `${SITE_URL}${path}` })),
  ...blogPosts.map((post) => ({ loc: `${SITE_URL}/blog/${post.slug}`, lastmod: post.publishedAt })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries
  .map(({ loc, lastmod }) => `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`)
  .join('\n')}
</urlset>
`

const publishDirectory = join(process.cwd(), 'dist')
const sitemapPath = join(publishDirectory, 'sitemap.xml')

await mkdir(publishDirectory, { recursive: true })
await writeFile(sitemapPath, xml, 'utf8')
console.log(`Wrote sitemap with ${urlEntries.length} URLs to ${sitemapPath}`)
