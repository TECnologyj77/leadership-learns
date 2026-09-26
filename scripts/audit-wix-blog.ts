// Audits every published Wix post against what the site can render.
//   npm run blog:audit
// Needs WIX_HEADLESS_CLIENT_ID (read from .env.local if present). Exits 1
// when any post has content the site can't show (unsupported blocks, invalid
// images or links), so it can gate a release. Missing image descriptions are
// warnings for editors: the site never invents alt text.
import { fetchPostBySlug, fetchPublishedPosts, fetchTermLabels } from '../netlify/lib/wix-blog-source.ts';
import { isGatedPost, toBlogPost } from '../netlify/lib/normalize-post.ts';
import type { ContentIssue } from '../netlify/lib/ricos-to-blocks.ts';

const summarize = (issues: ContentIssue[]) => {
  const counts = new Map<string, number>();
  for (const issue of issues) counts.set(`${issue.kind} (${issue.wixType})`, (counts.get(`${issue.kind} (${issue.wixType})`) ?? 0) + 1);
  return [...counts].map(([key, count]) => `${key} x${count}`).join(', ');
};

const [posts, labels] = await Promise.all([fetchPublishedPosts(), fetchTermLabels()]);
let blocking = 0;
console.log(`${posts.length} published post(s)\n`);

for (const listed of posts) {
  const slug = String(listed.slug);
  if (isGatedPost(listed)) {
    console.log(`- ${slug}: pricing-plan (member) post, not published on this site`);
    continue;
  }
  const raw = await fetchPostBySlug(slug);
  if (!raw) {
    console.log(`- ${slug}: listed but not found by slug`);
    blocking++;
    continue;
  }
  const { post, issues } = toBlogPost(raw, labels);
  const blockTypes = [...new Set(post.blocks.map((block) => block.type))].join(', ');
  const errors = issues.filter((issue) => issue.kind !== 'missing-alt-text');
  const warnings = issues.filter((issue) => issue.kind === 'missing-alt-text');
  blocking += errors.length;
  console.log(`- ${post.path}`);
  console.log(`    blocks: ${blockTypes}; hero image: ${post.heroImage ? 'yes' : 'no'}; cover image: ${post.coverImage ? 'yes' : 'no'}`);
  if (errors.length) console.log(`    NEEDS ATTENTION: ${summarize(errors)}`);
  if (warnings.length) console.log(`    editor warning: ${summarize(warnings)}`);
}

console.log(blocking ? `\n${blocking} blocking issue(s) found.` : '\nEvery published post can be fully rendered.');
process.exitCode = blocking ? 1 : 0;
