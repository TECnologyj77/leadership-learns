import React, { useEffect } from 'react';
import { useParams, Navigate, Link as RouterLink } from 'react-router-dom';
import { Box, Skeleton } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import BlogArticle from '../components/blog/BlogArticle';
import BlogUnavailable from '../components/blog/BlogUnavailable';
import NotFound from './NotFound';
import { fetchPost, type PostState } from '../lib/blog-api';
import { useBlogInitialData } from '../lib/blog-initial-data';
import { useBlogData } from '../lib/use-blog-data';
import { applyPageMeta, notFoundMeta, postPageMeta, unavailableMeta } from '../lib/seo';
import { postPath } from '../lib/blog-paths';

const BlogPost: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const initial = useBlogInitialData();
  const initialState: PostState | null =
    initial?.page === 'post' && initial.slug === slug
      ? initial.status === 'ok'
        ? { status: 'ok', post: initial.post }
        : { status: initial.status }
      : null;
  const { data, retry } = useBlogData(`post:${slug}`, initialState, (signal) => fetchPost(slug, signal));

  // Direct requests already got these tags from the server; this covers
  // navigation inside the app.
  useEffect(() => {
    if (data?.status === 'ok') applyPageMeta(postPageMeta(data.post));
    else if (data?.status === 'not_found') applyPageMeta(notFoundMeta(postPath(slug)));
    else if (data?.status === 'unavailable') applyPageMeta(unavailableMeta(postPath(slug)));
  }, [data, slug]);

  if (data?.status === 'not_found') return <NotFound />;
  // Wix now serves this post under a new slug.
  if (data?.status === 'ok' && data.post.slug !== slug) return <Navigate to={data.post.path} replace />;

  return (
    <>
      <AppSection variant="white">
        <AppContainer maxWidth="md">
          {data === null && (
            <Box aria-busy="true">
              <AppText role="status" variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Loading the post…
              </AppText>
              <Box aria-hidden="true">
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" width="40%" sx={{ mb: 4 }} />
                <Skeleton variant="rectangular" sx={{ aspectRatio: '16 / 9', height: 'auto', borderRadius: 3, mb: 4 }} />
                {[0, 1, 2, 3].map((line) => (
                  <Skeleton key={line} variant="text" />
                ))}
              </Box>
            </Box>
          )}
          {data?.status === 'unavailable' && (
            <BlogUnavailable message="This post couldn’t be loaded right now. Please try again in a moment." onRetry={retry} />
          )}
          {data?.status === 'ok' && <BlogArticle post={data.post} />}
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
            <AppButton analytics={{ id: 'blog_post_contact', location: 'final_cta', intent: 'contact' }} variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
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
