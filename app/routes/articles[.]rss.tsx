import type { LoaderFunction } from '@remix-run/node';
import type { GetArticlesResult } from '~/queries/GetArticles';
import { GetArticles } from '~/queries/GetArticles';
import { graphqlClient } from '~/sanity/client';

export const loader: LoaderFunction = async () => {
  const result = await graphqlClient.request<GetArticlesResult>(GetArticles);

  const articles = result.allArticle;

  const rssItems = articles.map(
    (article) => `<item>
  <title>${article.title}</title>
  <link>https://rshackleton.co.uk/articles/${article.slug.current}</link>
  <description>${article.summary}</description>
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
