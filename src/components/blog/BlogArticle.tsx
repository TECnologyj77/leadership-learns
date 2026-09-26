import React from 'react';
import { Box, Chip, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';
import BlogImage from './BlogImage';
import BlogRichContent, { ARTICLE_IMAGE_SIZES } from './BlogRichContent';
import { formatPostDate } from '../../lib/format-date';
import type { BlogPost } from '../../types/blog';

const BlogArticle: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Box component="article">
    <AppButton
      variant="text"
      color="primary"
      component={RouterLink}
      to="/blog"
      startIcon={<ArrowBackIcon />}
      sx={{ mb: 3, ml: -1.5 }}
    >
      All posts
    </AppButton>

    {post.categories.length > 0 && (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {post.categories.map((category) => (
          <Chip key={category.id} label={category.label} size="small" color="primary" variant="outlined" />
        ))}
      </Box>
    )}

    <AppText variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
      {post.title}
    </AppText>

    <AppText variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      {post.minutesToRead && ` · ${post.minutesToRead} min read`}
    </AppText>

    {post.heroImage && (
      <BlogImage image={post.heroImage} sizes={ARTICLE_IMAGE_SIZES} priority sx={{ borderRadius: 3, mb: 5 }} />
    )}

    <Box data-post-body>
      <BlogRichContent blocks={post.blocks} />
    </Box>

    {post.tags.length > 0 && (
      <>
        <Divider sx={{ my: 5 }} />
        <AppText variant="subtitle2" component="h2" sx={{ mb: 1.5 }}>
          Tags
        </AppText>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {post.tags.map((tag) => (
            <li key={tag.id}>
              <Chip label={tag.label} size="small" />
            </li>
          ))}
        </Box>
      </>
    )}
  </Box>
);

export default BlogArticle;
