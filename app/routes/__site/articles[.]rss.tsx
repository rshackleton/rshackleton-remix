import type { LoaderFunction } from '@remix-run/node';
import { StoryblokService } from '~/storyblok/service';

import type { ArticleStoryblok } from '~/storyblok/storyblok';

export const loader: LoaderFunction = async ({ request }) => {
  const service = new StoryblokService(request);

  const itemData = await service.getStories<ArticleStoryblok>({
    is_startpage: 0,
    starts_with: 'articles/',
  });

  const rssItems = itemData.map(
    (item) => `<item>
  <title>${item.content.title}</title>
  <link>https://rshackleton.co.uk/${item.full_slug}</link>
  <description>${item.content.summary}</description>
</item>`,
  );

  const rssString = `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:blogChannel="https://rshackleton.co.uk/articles" version="2.0">  
  <channel>
    <title>RShackleton Articles</title>
    <link>https://rshackleton.co.uk/articles</link>
    <description>Articles about web development</description>
    ${rssItems}
  </channel>  
</rss>`;

  return new Response(rssString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(rssString)),
    },
  });
};
