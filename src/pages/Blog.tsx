import React from 'react';
import { Grid, Box, Paper, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import BlogPostCard from '../components/blog/BlogPostCard';
import BlogUnavailable from '../components/blog/BlogUnavailable';
import { fetchPostList, type PostListState } from '../lib/blog-api';
import { useBlogInitialData } from '../lib/blog-initial-data';
import { useBlogData } from '../lib/use-blog-data';

const gridItemSize = { xs: 12, sm: 6, md: 4 };

const Blog: React.FC = () => {
  const initial = useBlogInitialData();
  const initialState: PostListState | null =
    initial?.page === 'list' ? (initial.status === 'ok' ? { status: 'ok', posts: initial.posts } : { status: 'unavailable' }) : null;
  const { data, retry } = useBlogData('list', initialState, fetchPostList);

  return (
    <>
      <AppSection variant="light">
        <AppContainer>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <AppText variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              The Clear Mind Blog
            </AppText>
            <AppText variant="h5" component="p" color="text.secondary">
              Insights on leadership, systems, and neurodiversity.
            </AppText>
          </Box>

          {data === null && (
            <Box aria-busy="true">
              <Grid container spacing={4} aria-hidden="true">
                {[0, 1, 2].map((index) => (
                  <Grid size={gridItemSize} key={index}>
                    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                      <Skeleton variant="rectangular" sx={{ aspectRatio: '16 / 9', height: 'auto' }} />
                      <Box sx={{ p: 3 }}>
                        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                        <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="70%" />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {data?.status === 'unavailable' && (
            <BlogUnavailable message="Blog posts couldn’t be loaded right now. Please try again in a moment." onRetry={retry} />
          )}

          {data?.status === 'ok' && data.posts.length === 0 && (
            <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              No posts have been published yet. Check back soon.
            </AppText>
          )}

          {data?.status === 'ok' && data.posts.length > 0 && (
            <Grid container spacing={4}>
              {data.posts.map((post, index) => (
                <Grid size={gridItemSize} key={post.id}>
                  <BlogPostCard post={post} priority={index < 3} />
                </Grid>
              ))}
            </Grid>
          )}
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
          <AppButton analytics={{ id: 'blog_final_contact', location: 'final_cta', intent: 'contact' }} variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
            Contact Tammy
          </AppButton>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Blog;
