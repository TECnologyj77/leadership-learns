import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { InvalidWixDataError, isGatedPost, toBlogPost, toBlogSummary, type TermLabels, type WixPostLike } from './normalize-post.ts';
import { ricosToBlocks } from './ricos-to-blocks.ts';

// Published posts captured from Wix via @wix/sdk (owner/contact IDs removed).
const fixture = (name: string) => JSON.parse(readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), 'utf8'));
const list: WixPostLike[] = fixture('wix-post-list.json');
const details: Record<string, WixPostLike> = fixture('wix-post-details.json');
const terms: { categories: Array<{ _id: string; label: string }>; tags: Array<{ _id: string; label: string }> } =
  fixture('wix-terms.json');
const labels: TermLabels = {
  categories: new Map(terms.categories.map((term) => [term._id, term.label])),
  tags: new Map(terms.tags.map((term) => [term._id, term.label])),
};

const AUSTIN_EYES = 'more-people-should-see-the-world-through-austin-s-eyes';
const SILENCE_TO_STAGE = 'from-silence-to-stage-the-inspiring-journey-of-14-year-old-austin-morales';

test('all five published posts normalize with local /post paths', () => {
  const summaries = list.map((post) => toBlogSummary(post, labels));
  assert.deepEqual(
    summaries.map((summary) => summary.path),
    [
      `/post/${AUSTIN_EYES}`,
      `/post/${SILENCE_TO_STAGE}`,
      '/post/boost-business-success-leadership-game-and-training-consultation',
      '/post/unlocking-leadership-potential-interactive-training-and-coaching-services',
      '/post/mastering-disc-method-for-effective-leadership-development',
    ],
  );
  for (const summary of summaries) {
    assert.ok(summary.coverImage?.src.startsWith('https://static.wixstatic.com/media/'));
    assert.match(summary.publishedAt, /^\d{4}-\d{2}-\d{2}T/);
  }
});

test('"From Silence to Stage" keeps its hero image, headings, category, tags and SEO description', () => {
  const { post, issues } = toBlogPost(details[SILENCE_TO_STAGE], labels);
  assert.equal(post.heroImage?.width, 1980);
  assert.equal(post.heroImage?.height, 1981);
  assert.ok(post.heroImage?.src.includes('99fc41_5d805ece534340619d013900f758fa7e~mv2.jpg'));
  assert.deepEqual(post.categories.map((c) => c.label), ['Autism awareness']);
  assert.equal(post.tags.length, 11);
  assert.equal(post.seoDescription, 'The challenges of autism and becoming a public speaker. He wants to be in a TedX talk');
  const headings = post.blocks.filter((block) => block.type === 'heading');
  assert.equal(headings.length, 6);
  assert.ok(headings.every((block) => block.type === 'heading' && block.level === 2));
  assert.equal(post.blocks.filter((block) => block.type === 'paragraph').length, 6);
  // The only finding is the hero photo's missing description (an editor warning).
  assert.deepEqual(issues, [{ kind: 'missing-alt-text', wixType: 'HERO_IMAGE' }]);
});

test('"Austin\'s eyes" renders its gallery and Facebook button without a hero image', () => {
  const { post, issues } = toBlogPost(details[AUSTIN_EYES], labels);
  assert.equal(post.heroImage, null);
  const gallery = post.blocks.find((block) => block.type === 'gallery');
  assert.ok(gallery && gallery.type === 'gallery');
  assert.equal(gallery.images.length, 3);
  assert.deepEqual(
    gallery.images.map((image) => [image.width, image.height]),
    [[1536, 2048], [1536, 2049], [1536, 2049]],
  );
  const button = post.blocks.find((block) => block.type === 'button');
  assert.ok(button && button.type === 'button');
  assert.equal(button.label, 'Click Me');
  assert.ok(button.link.href.startsWith('https://www.facebook.com/SanDiegoRegionalCtr/videos/744700954604289/'));
  assert.equal(button.link.newTab, true);
  assert.equal(button.link.nofollow, true);
  // Wix has no image descriptions for these photos; that is reported, not invented.
  assert.equal(issues.filter((issue) => issue.kind === 'missing-alt-text').length, 3);
  assert.ok(gallery.images.every((image) => image.alt === null));
});

test('single-image posts keep the image and turn in-text newlines into line breaks', () => {
  const { post } = toBlogPost(details['boost-business-success-leadership-game-and-training-consultation'], labels);
  const image = post.blocks.find((block) => block.type === 'image');
  assert.ok(image && image.type === 'image' && image.image.width === 1152 && image.image.height === 896);
  const lastParagraph = post.blocks.at(-1);
  assert.ok(lastParagraph?.type === 'paragraph');
  assert.ok(lastParagraph.content.filter((part) => part.type === 'lineBreak').length >= 4);
});

test('srcset never upscales past the original width', () => {
  const { post } = toBlogPost(details['boost-business-success-leadership-game-and-training-consultation'], labels);
  const image = post.blocks.find((block) => block.type === 'image');
  assert.ok(image?.type === 'image');
  assert.ok(image.image.srcSet.endsWith('1152w'));
  assert.ok(!image.image.srcSet.includes('1600w'));
});

test('unsafe links and foreign media are rejected and reported', () => {
  const { blocks, issues } = ricosToBlocks({
    nodes: [
      { type: 'BUTTON', buttonData: { text: 'Go', link: { url: 'javascript:alert(1)' } } },
      { type: 'IMAGE', imageData: { image: { src: { url: 'https://evil.example/x.jpg' }, width: 10, height: 10 } } },
      {
        type: 'PARAGRAPH',
        nodes: [
          { type: 'TEXT', textData: { text: 'bad link', decorations: [{ type: 'LINK', linkData: { link: { url: 'data:text/html,hi' } } }] } },
        ],
      },
    ],
  });
  assert.deepEqual(blocks.map((block) => block.type), ['unsupported', 'unsupported', 'paragraph']);
  const paragraph = blocks[2];
  assert.ok(paragraph.type === 'paragraph' && paragraph.content[0].type === 'text' && !paragraph.content[0].marks.link);
  assert.deepEqual(issues.map((issue) => issue.kind).sort(), ['invalid-image', 'invalid-link', 'invalid-link', 'unsupported-block']);
});

test('unknown content blocks become visible unsupported blocks, never silently dropped', () => {
  const { blocks, issues } = ricosToBlocks({ nodes: [{ type: 'VIDEO' }, { type: 'TABLE' }, { type: 'PARAGRAPH', nodes: [] }] });
  assert.deepEqual(blocks, [
    { type: 'unsupported', wixType: 'VIDEO' },
    { type: 'unsupported', wixType: 'TABLE' },
  ]);
  assert.deepEqual(issues, [
    { kind: 'unsupported-block', wixType: 'VIDEO' },
    { kind: 'unsupported-block', wixType: 'TABLE' },
  ]);
});

test('lists, quotes, marks and dividers map to site blocks', () => {
  const para = (text: string, decorations: unknown[] = []) => ({
    type: 'PARAGRAPH',
    nodes: [{ type: 'TEXT', textData: { text, decorations } }],
  });
  const { blocks, issues } = ricosToBlocks({
    nodes: [
      { type: 'BULLETED_LIST', nodes: [{ type: 'LIST_ITEM', nodes: [para('one')] }, { type: 'LIST_ITEM', nodes: [para('two')] }] },
      { type: 'BLOCKQUOTE', nodes: [para('quoted', [{ type: 'ITALIC', italicData: true }, { type: 'BOLD', fontWeightValue: 700 }])] },
      { type: 'DIVIDER' },
      para('linked', [{ type: 'LINK', linkData: { link: { url: 'https://example.com', target: 'SELF' } } }]),
    ],
  });
  assert.deepEqual(issues, []);
  assert.equal(blocks[0].type === 'list' && blocks[0].items.length, 2);
  assert.deepEqual(
    blocks[1].type === 'quote' && blocks[1].content[0].type === 'paragraph' && blocks[1].content[0].content[0],
    { type: 'text', text: 'quoted', marks: { italic: true, bold: true } },
  );
  assert.equal(blocks[2].type, 'divider');
  assert.deepEqual(blocks[3].type === 'paragraph' && blocks[3].content[0].type === 'text' && blocks[3].content[0].marks.link, {
    href: 'https://example.com/',
    newTab: false,
    nofollow: false,
  });
});

test('malformed posts throw instead of rendering partial content', () => {
  assert.throws(() => toBlogSummary({ ...list[0], slug: '../../etc' }, labels), InvalidWixDataError);
  assert.throws(() => toBlogSummary({ ...list[0], title: '   ' }, labels), InvalidWixDataError);
  assert.throws(() => toBlogSummary({ ...list[0], firstPublishedDate: 'not a date' }, labels), InvalidWixDataError);
  assert.throws(() => toBlogPost({ ...details[AUSTIN_EYES], richContent: undefined }, labels), InvalidWixDataError);
});

test('pricing-plan posts are recognised as gated', () => {
  assert.equal(isGatedPost(list[0]), false);
  assert.equal(isGatedPost({ ...list[0], pricingPlanIds: ['plan'] }), true);
});
