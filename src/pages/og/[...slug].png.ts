import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Cache fonts across all page renders during a single build
let fontCache: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null;

async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
    if (fontCache) return fontCache;

    async function fetchFont(weight: number): Promise<ArrayBuffer> {
        const api = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`;
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
            throw new Error(`Failed to load Inter font weight ${weight}`);
        }

        return fetch(match[1]).then((r) => r.arrayBuffer());
    }

    const [regular, bold] = await Promise.all([fetchFont(400), fetchFont(700)]);
    fontCache = { regular, bold };
    return fontCache;
}

function buildOGMarkup(title: string): Record<string, unknown> {
    const fontSize = title.length > 50 ? 52 : title.length > 35 ? 64 : 76;

    return {
        type: 'div',
        props: {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #1f5abd 0%, #8910a8 50%, #5435b3 100%)',
                padding: '60px 80px',
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            fontSize,
                            fontWeight: 700,
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: 1.2,
                            maxWidth: '1000px',
                        },
                        children: title,
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            fontSize: 28,
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginTop: '32px',
                        },
                        children: 'schimizzi.io',
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
        { slug: 'blog', title: 'Blog' },
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
            { name: 'Inter', data: fonts.regular, weight: 400, style: 'normal' as const },
            { name: 'Inter', data: fonts.bold, weight: 700, style: 'normal' as const },
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
