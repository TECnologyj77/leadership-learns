import React from 'react';
import { Box, Chip, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppCard from '../ui/AppCard';
import BlogImage from './BlogImage';
import logo from '../../assets/logo.svg';
import { formatPostDate } from '../../lib/format-date';
import type { BlogSummary } from '../../types/blog';

const CARD_IMAGE_SIZES = '(min-width: 1200px) 370px, (min-width: 600px) 50vw, 100vw';

const BlogPostCard: React.FC<{ post: BlogSummary; priority?: boolean }> = ({ post, priority }) => (
  <AppCard
    component="article"
    padded={false}
    sx={{
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.2s, border-color 0.2s',
      '&:hover, &:focus-within': { borderColor: 'brand.navy', boxShadow: 4 },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        bgcolor: 'brand.sand',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {post.coverImage ? (
        <BlogImage
          image={{ ...post.coverImage, alt: null }}
          sizes={CARD_IMAGE_SIZES}
          priority={priority}
          sx={{ position: 'absolute', inset: 0, height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Box component="img" src={logo} alt="" sx={{ width: '35%', maxWidth: 140, opacity: 0.6 }} />
      )}
    </Box>

    <Box sx={{ p: 3.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {post.categories.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {post.categories.map((category) => (
            <Chip key={category.id} label={category.label} size="small" color="primary" variant="outlined" />
          ))}
        </Box>
      )}

      <AppText variant="h4" component="h2" sx={{ mb: 1 }}>
        {/* Stretched link: the whole card is clickable, with one link named by the title. */}
        <Link
          component={RouterLink}
          to={post.path}
          color="inherit"
          underline="hover"
          sx={{ '&::after': { content: '""', position: 'absolute', inset: 0 } }}
        >
          {post.title}
        </Link>
      </AppText>

      <AppText variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        {post.minutesToRead && ` · ${post.minutesToRead} min read`}
      </AppText>

      {post.excerpt && (
        <AppText
          variant="body2"
          sx={{ mb: 3, color: 'text.body', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {post.excerpt}
        </AppText>
      )}

      <AppText
        aria-hidden="true"
        variant="button"
        color="primary"
        sx={{ mt: 'auto', display: 'inline-flex', alignItems: 'center', gap: 0.5, fontWeight: 700 }}
      >
        Read the full post
        <ArrowForwardIcon fontSize="small" />
      </AppText>
    </Box>
  </AppCard>
);

export default BlogPostCard;
