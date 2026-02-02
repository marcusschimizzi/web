import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog');
    const publishedPosts = posts.filter((post) => !post.data.draft);

    return rss({
        title: "Marcus Schimizzi's Blog",
        description: 'Thoughts on software engineering, web development, and more.',
        site: context.site!,
        items: publishedPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.id}/`,
        })),
        customData: '<language>en-us</language>',
    });
}
