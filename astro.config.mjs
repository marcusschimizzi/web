import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
    site: 'https://schimizzi.io',
    output: 'static',
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
        mdx(),
    ],
    vite: {
        ssr: {
            external: ['sharp'],
        },
    },
});
