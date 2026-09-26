import React from 'react';
import { Alert, Box, Button, Divider, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AppText from '../ui/AppText';
import BlogImage from './BlogImage';
import BlogGallery from './BlogGallery';
import type { BlogBlock, BlogInline, BlogLink } from '../../types/blog';

// Article body column width, for image srcset selection.
export const ARTICLE_IMAGE_SIZES = '(min-width: 900px) 836px, 100vw';

const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;

const linkProps = (link: BlogLink) => ({
  href: link.href,
  ...(link.newTab ? { target: '_blank' } : {}),
  rel: [link.newTab && 'noopener noreferrer', link.nofollow && 'nofollow'].filter(Boolean).join(' ') || undefined,
});

const NewTabNote: React.FC<{ link: BlogLink }> = ({ link }) =>
  link.newTab ? <Box component="span" sx={visuallyHidden}> (opens in a new tab)</Box> : null;

const InlineText: React.FC<{ content: BlogInline[] }> = ({ content }) => (
  <>
    {content.map((part, index) => {
      if (part.type === 'lineBreak') return <br key={index} />;
      let node: React.ReactNode = part.text;
      if (part.marks.bold) node = <strong>{node}</strong>;
      if (part.marks.italic) node = <em>{node}</em>;
      if (part.marks.underline) node = <u>{node}</u>;
      if (part.marks.link) {
        node = (
          <Link {...linkProps(part.marks.link)} underline="always">
            {node}
            <NewTabNote link={part.marks.link} />
          </Link>
        );
      }
      return <React.Fragment key={index}>{node}</React.Fragment>;
    })}
  </>
);

const headingVariant = { 2: 'h4', 3: 'h5', 4: 'h6' } as const;

const Block: React.FC<{ block: BlogBlock }> = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <AppText variant="body1" component="p" sx={{ mb: 3, lineHeight: 1.75 }}>
          <InlineText content={block.content} />
        </AppText>
      );
    case 'heading':
      return (
        <AppText variant={headingVariant[block.level]} component={`h${block.level}`} sx={{ mt: 5, mb: 2, fontWeight: 700 }}>
          <InlineText content={block.content} />
        </AppText>
      );
    case 'image': {
      const image = <BlogImage image={block.image} sizes={ARTICLE_IMAGE_SIZES} sx={{ borderRadius: 2 }} />;
      return (
        <Box component="figure" sx={{ my: 4, mx: 0 }}>
          {block.link ? <Link {...linkProps(block.link)}>{image}<NewTabNote link={block.link} /></Link> : image}
          {block.caption && (
            <AppText component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              {block.caption}
            </AppText>
          )}
        </Box>
      );
    }
    case 'gallery':
      return <BlogGallery images={block.images} />;
    case 'button':
      return (
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            {...linkProps(block.link)}
            endIcon={block.link.newTab ? <OpenInNewIcon aria-hidden="true" /> : undefined}
          >
            {block.label}
            <NewTabNote link={block.link} />
          </Button>
        </Box>
      );
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <Box component={ListTag} sx={{ mb: 3, pl: 4, '& > li > p:last-child': { mb: 1 } }}>
          {block.items.map((item, index) => (
            <li key={index}>
              <BlogRichContent blocks={item} />
            </li>
          ))}
        </Box>
      );
    }
    case 'quote':
      return (
        <Box component="blockquote" sx={{ my: 4, mx: 0, pl: 3, borderLeft: 4, borderColor: 'secondary.main', color: 'text.secondary' }}>
          <BlogRichContent blocks={block.content} />
        </Box>
      );
    case 'divider':
      return <Divider sx={{ my: 5 }} />;
    case 'unsupported':
      // Reported by the adapter too; this keeps the gap visible instead of silently missing.
      return (
        <Alert severity="info" variant="outlined" data-wix-type={block.wixType} sx={{ my: 3 }}>
          Part of this post can’t be shown on this page yet.
        </Alert>
      );
  }
};

/** Renders a post's site-owned content blocks. All text is escaped by React. */
const BlogRichContent: React.FC<{ blocks: BlogBlock[] }> = ({ blocks }) => (
  <>
    {blocks.map((block, index) => (
      <Block key={index} block={block} />
    ))}
  </>
);

export default BlogRichContent;
