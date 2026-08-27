import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createRobotsText, createSitemapXml } from './src/seo/staticFiles'
import { resolveSiteUrl } from './src/seo/siteUrl'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl(env.VITE_SITE_URL)

  return {
    plugins: [
      react(),
      {
        name: 'write-seo-static-files',
        async closeBundle() {
          const outputDirectory = resolve(process.cwd(), 'dist')

          await mkdir(outputDirectory, { recursive: true })
          await Promise.all([
            writeFile(resolve(outputDirectory, 'robots.txt'), createRobotsText(siteUrl), 'utf8'),
            writeFile(resolve(outputDirectory, 'sitemap.xml'), createSitemapXml(siteUrl), 'utf8'),
          ])
        },
      },
    ],
  }
})
