import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedPosts } from '../lib/posts';
import { site } from '../config';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('`site` must be set in astro.config.ts to generate the RSS feed.');
  }

  const posts = await getSortedPosts();

  return rss({
    title: site.name,
    description: 'Writing on software engineering, systems, and craft.',
    site: context.site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<atom:link href="${new URL('rss.xml', context.site).href}" rel="self" type="application/rss+xml"/>`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
  });
}
