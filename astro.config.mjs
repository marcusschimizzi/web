import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
    site: 'https://schimizzi.io',
    output: 'static',
    integrations: [
        sitemap(),
        mdx(),
    ],
    vite: {
        ssr: {
            external: ['sharp', '@resvg/resvg-js'],
        },
    },
    markdown: {
        shikiConfig: {
            theme: 'github-dark-dimmed',
            wrap: true,
        },
    },
});
