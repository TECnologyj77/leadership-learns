import React from 'react';
import type { BlogPost } from '../types/blog';
import RouteMetadata from './RouteMetadata';
import { createBlogPostMetadata } from './metadataCatalog';

interface BlogPostMetadataProps {
  post: BlogPost;
}

const BlogPostMetadata: React.FC<BlogPostMetadataProps> = ({ post }) => (
  <RouteMetadata metadata={createBlogPostMetadata(post)} />
);

export default BlogPostMetadata;
