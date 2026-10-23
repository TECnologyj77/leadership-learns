import React from 'react';
import { Grid, Box, Skeleton } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppCard from '../components/ui/AppCard';
import SectionHeading from '../components/ui/SectionHeading';
import Accent from '../components/brand/Accent';
import ClosingCtaBand from '../components/marketing/ClosingCtaBand';
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
      <AppSection tone="cream" sx={{ pt: { xs: 6, md: 10 } }}>
        <AppContainer>
          <SectionHeading level="h1" title="The Clear Mind Blog" subtitle="Insights on leadership, systems, and neurodiversity." />

          {data === null && (
            <Box aria-busy="true">
              <Grid container spacing={4} aria-hidden="true">
                {[0, 1, 2].map((index) => (
                  <Grid size={gridItemSize} key={index}>
                    <AppCard padded={false}>
                      <Skeleton variant="rectangular" sx={{ aspectRatio: '16 / 9', height: 'auto' }} />
                      <Box sx={{ p: 3 }}>
                        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                        <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="70%" />
                      </Box>
                    </AppCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {data?.status === 'unavailable' && (
            <BlogUnavailable message="Blog posts couldn’t be loaded right now. Please try again in a moment." onRetry={retry} />
          )}

          {data?.status === 'ok' && data.posts.length === 0 && (
            <AppText variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
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

      <ClosingCtaBand
        title={<>Have a question <Accent>of your own?</Accent></>}
        subtitle="Get in touch and tell Tammy what you or your team are working on."
        ctaId="blog_final"
      />
    </>
  );
};

export default Blog;
