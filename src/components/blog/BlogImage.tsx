import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { BlogImage as BlogImageData } from '../../types/blog';

interface BlogImageProps {
  image: BlogImageData;
  /** Rendered width hint for the browser's srcset choice. */
  sizes: string;
  /** Above-the-fold images load eagerly. */
  priority?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Responsive Wix image. Width/height come from Wix so space is reserved
 * before it loads. Wix has no description for many images; those render with
 * empty alt text (reported to editors by the adapter) rather than invented text.
 */
const BlogImage: React.FC<BlogImageProps> = ({ image, sizes, priority = false, sx }) => (
  <Box
    component="img"
    src={image.src}
    srcSet={image.srcSet}
    sizes={sizes}
    width={image.width}
    height={image.height}
    alt={image.alt ?? ''}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    sx={{ display: 'block', width: '100%', height: 'auto', ...sx }}
  />
);

export default BlogImage;
