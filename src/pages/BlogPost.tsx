import React from 'react';
import { useParams, Navigate, Link as RouterLink } from 'react-router-dom';
import { Box, Chip, Divider } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
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
          <Box sx={{ mb: 4 }}>
            <Chip 
              label={post.category} 
              color={post.category === 'Corporate' ? 'primary' : 'secondary'} 
              sx={{ mb: 2 }} 
            />
            <AppText variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              {post.title}
            </AppText>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <AppText variant="subtitle2" component="p" color="text.secondary">
                By {post.author}
              </AppText>
              <AppText variant="subtitle2" component="span" color="text.secondary" aria-hidden="true">
                •
              </AppText>
              <AppText variant="subtitle2" component="p" color="text.secondary">
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

      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" component="h2" gutterBottom>
            Have a question of your own?
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Get in touch and tell Tammy what you or your team are working on.
          </AppText>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
              Contact Tammy
            </AppButton>
            <AppButton variant="outlined" color="inherit" size="large" component={RouterLink} to="/blog">
              Read the Blog
            </AppButton>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default BlogPost;
