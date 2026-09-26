import React from 'react';
import { Box } from '@mui/material';
import BlogImage from './BlogImage';
import type { BlogImage as BlogImageData } from '../../types/blog';

const GALLERY_IMAGE_SIZES = '(min-width: 900px) 270px, (min-width: 600px) 50vw, 100vw';

/**
 * Wix gallery as a responsive grid. Images keep their full frame (no
 * cropping) so every photo is shown completely, as in the original post.
 */
const BlogGallery: React.FC<{ images: BlogImageData[] }> = ({ images }) => (
  <Box
    component="ul"
    sx={{
      listStyle: 'none',
      p: 0,
      my: 4,
      display: 'grid',
      gap: 2,
      alignItems: 'start',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${Math.min(images.length, 3)}, 1fr)` },
    }}
  >
    {images.map((image) => (
      <li key={image.src}>
        <BlogImage image={image} sizes={GALLERY_IMAGE_SIZES} sx={{ borderRadius: 2 }} />
      </li>
    ))}
  </Box>
);

export default BlogGallery;
