// @ts-check
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
  },

  build: {
    inlineStylesheets: 'always'
  },

  site: 'https://www.kahuconsultants.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug]
    })
  }
});