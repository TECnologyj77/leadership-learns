import { StrictMode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App.tsx';
import { BlogInitialDataContext } from './lib/blog-initial-data';
import type { BlogInitialData } from './types/blog';

/**
 * Everything inside the router, shared by the browser entry (main.tsx) and
 * the server renderer (server/render-app.tsx) so both render the same tree.
 */
const Root = ({ blogData }: { blogData: BlogInitialData | null }) => (
  <StrictMode>
    <BlogInitialDataContext.Provider value={blogData}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BlogInitialDataContext.Provider>
  </StrictMode>
);

export default Root;
