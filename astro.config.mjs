import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://compleoadvisors.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      // The 404 page should not be indexed.
      filter: (page) => !page.includes('/404'),
      // Reasonable defaults; tune later if needed.
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      // Boost homepage and audience pages.
      serialize(item) {
        if (item.url === 'https://compleoadvisors.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        if (
          item.url.endsWith('/for-biotech') ||
          item.url.endsWith('/for-advocacy') ||
          item.url.endsWith('/for-pharma-marketing-services')
        ) {
          item.priority = 0.9;
        }
        if (item.url.endsWith('/insights')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
  ],
});
