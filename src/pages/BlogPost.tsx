import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Chip, Divider } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import { blogPosts } from '../lib/blog-data';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <AppSection variant="white">
        <AppContainer maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Chip 
              label={post.category} 
              color={post.category === 'Corporate' ? 'primary' : 'secondary'} 
              sx={{ mb: 2 }} 
            />
            <AppText variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              {post.title}
            </AppText>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <AppText variant="subtitle2" color="text.secondary">
                By {post.author}
              </AppText>
              <AppText variant="subtitle2" color="text.secondary">
                •
              </AppText>
              <AppText variant="subtitle2" color="text.secondary">
                {post.publishedAt}
              </AppText>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Box sx={{ minHeight: 400 }}>
            <AppText variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {post.content}
            </AppText>
            {/* Additional content blocks would go here */}
            <AppText variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </AppText>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default BlogPost;
