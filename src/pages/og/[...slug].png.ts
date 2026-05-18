import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

let fontCache: { regular: ArrayBuffer; medium: ArrayBuffer; italicSerif: ArrayBuffer } | null = null;

async function loadFonts(): Promise<{ regular: ArrayBuffer; medium: ArrayBuffer; italicSerif: ArrayBuffer }> {
    if (fontCache) return fontCache;

    async function fetchFont(api: string): Promise<ArrayBuffer> {
        const css = await fetch(api, {
            headers: {
                // BB10 user-agent returns woff/truetype format (satori doesn't support woff2)
                'User-Agent':
                    'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
            },
        }).then((r) => r.text());

        const match = css.match(
            /src: url\((.+?)\) format\('(opentype|truetype|woff)'\)/,
        );
        if (!match?.[1]) {
            throw new Error(`Failed to load font: ${api}`);
        }

        return fetch(match[1]).then((r) => r.arrayBuffer());
    }

    const [regular, medium, italicSerif] = await Promise.all([
        fetchFont('https://fonts.googleapis.com/css2?family=Geist:wght@400'),
        fetchFont('https://fonts.googleapis.com/css2?family=Geist:wght@500'),
        fetchFont('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1'),
    ]);
    fontCache = { regular, medium, italicSerif };
    return fontCache;
}

function buildOGMarkup(title: string): Record<string, unknown> {
    const fontSize = title.length > 50 ? 56 : title.length > 35 ? 70 : 84;

    return {
        type: 'div',
        props: {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#050505',
                padding: '70px 80px',
                position: 'relative',
            },
            children: [
                // Top eyebrow row
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            color: '#8a8580',
                            fontSize: 18,
                            fontFamily: 'Geist',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                        },
                        children: [
                            {
                                type: 'div',
                                props: { style: { width: 10, height: 10, background: '#e6b54a' } },
                            },
                            {
                                type: 'div',
                                props: {
                                    style: { display: 'flex', color: '#f4f1ea', fontWeight: 500 },
                                    children: 'Marcus Schimizzi',
                                },
                            },
                            {
                                type: 'div',
                                props: { style: { width: 28, height: 1, background: '#4a4742' } },
                            },
                            {
                                type: 'div',
                                props: { style: { display: 'flex' }, children: 'schimizzi.io' },
                            },
                        ],
                    },
                },
                // Title
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            fontSize,
                            fontFamily: 'Geist',
                            fontWeight: 500,
                            color: '#f4f1ea',
                            letterSpacing: '-2px',
                            lineHeight: 1.0,
                            maxWidth: '1000px',
                        },
                        children: title,
                    },
                },
                // Bottom bar
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #2a2826',
                            paddingTop: 20,
                            fontSize: 18,
                            fontFamily: 'Geist',
                            color: '#8a8580',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                        },
                        children: [
                            {
                                type: 'div',
                                props: { style: { display: 'flex' }, children: 'Software engineer · Chicago' },
                            },
                            {
                                type: 'div',
                                props: {
                                    style: { display: 'flex', color: '#e6b54a', fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 24, textTransform: 'none' },
                                    children: 'reliable things.',
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pages: Array<{ slug: string; title: string }> = [
        { slug: 'index', title: 'Marcus Schimizzi' },
        { slug: 'about', title: 'About' },
        { slug: 'projects', title: 'Projects' },
        { slug: 'experience', title: 'Experience' },
        { slug: 'blog', title: 'Writing' },
        { slug: 'contact', title: 'Contact' },
    ];

    const blogPosts = await getCollection('blog');
    for (const post of blogPosts) {
        if (!post.data.draft) {
            pages.push({ slug: `blog/${post.id}`, title: post.data.title });
        }
    }

    const projects = await getCollection('projects');
    for (const project of projects) {
        pages.push({ slug: `projects/${project.id}`, title: project.data.title });
    }

    return pages.map((page) => ({
        params: { slug: page.slug },
        props: { title: page.title },
    }));
};

export const GET: APIRoute = async ({ props }) => {
    const { title } = props as { title: string };
    const fonts = await loadFonts();

    const svg = await satori(buildOGMarkup(title), {
        width: 1200,
        height: 630,
        fonts: [
            { name: 'Geist', data: fonts.regular, weight: 400, style: 'normal' as const },
            { name: 'Geist', data: fonts.medium, weight: 500, style: 'normal' as const },
            { name: 'Instrument Serif', data: fonts.italicSerif, weight: 400, style: 'italic' as const },
        ],
    });

    const resvg = new Resvg(svg, {
        fitTo: { mode: 'width' as const, value: 1200 },
    });
    const pngData = resvg.render().asPng();

    return new Response(new Uint8Array(pngData), {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
};
