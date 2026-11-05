import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../../lib/blog';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: 'Kivo blog',
		description: 'News and release notes from the Kivo project.',
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/blog/${post.id}/`,
		})),
	});
}
