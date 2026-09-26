import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { blogFunctionsDev } from './netlify/dev/vite-blog-functions'

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  // Server-only settings (WIX_*) from .env.local for the dev-server blog
  // routes. They are not VITE_-prefixed, so they never reach browser code.
  for (const [name, value] of Object.entries(loadEnv(mode, process.cwd(), 'WIX_'))) {
    process.env[name] ??= value
  }

  return {
    plugins: [react(), blogFunctionsDev()],
    // `vite build --ssr` (second step of `npm run build`) bundles the app's
    // server renderer and the built index.html for netlify/functions/blog-pages.mts.
    build: isSsrBuild
      ? {
          outDir: 'netlify/ssr',
          emptyOutDir: true,
          copyPublicDir: false,
          rollupOptions: {
            input: {
              'render-app': 'src/server/render-app.tsx',
              'index-template': 'src/server/index-template.ts',
            },
            output: { entryFileNames: '[name].js' },
          },
        }
      : undefined,
  }
})
