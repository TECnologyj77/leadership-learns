import React from 'react';
import { Grid, Box, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppCard from '../components/ui/AppCard';
import AppButton from '../components/ui/AppButton';
import { blogPosts } from '../lib/blog-data';

const Blog: React.FC = () => {
  return (
    <>
      <AppSection variant="light">
        <AppContainer>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <AppText variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              The Clear Mind Blog
            </AppText>
            <AppText variant="h5" color="text.secondary">
              Insights on leadership, systems, and neurodiversity.
            </AppText>
          </Box>

          <Grid container spacing={4}>
            {blogPosts.map((post) => (
              <Grid size={{ xs: 12, md: 4 }} key={post.id}>
                <AppCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={post.category} 
                      size="small" 
                      color={post.category === 'Corporate' ? 'primary' : 'secondary'}
                    />
                  </Box>
                  <AppText variant="h5" gutterBottom sx={{ fontWeight: 700, flexGrow: 1 }}>
                    {post.title}
                  </AppText>
                  <AppText variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {post.excerpt}
                  </AppText>
                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AppText variant="caption" color="text.secondary">
                      {post.publishedAt}
                    </AppText>
                    <AppButton 
                      component={RouterLink} 
                      to={`/blog/${post.slug}`}
                      variant="text" 
                      color="primary"
                    >
                      Read More
                    </AppButton>
                  </Box>
                </AppCard>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom>
            Have a question of your own?
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Get in touch and tell Tammy what you or your team are working on.
          </AppText>
          <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
            Get In Touch
          </AppButton>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Blog;
