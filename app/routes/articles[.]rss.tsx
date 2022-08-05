import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const rssString = `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:blogChannel="https://rshackleton.co.uk/articles" version="2.0">  
  <channel>
    <title>RShackleton Articles</title>
    <link>https://rshackleton.co.uk/articles</link>
    <description>Articles about web development</description>
    <item>
      <title>Example 1</title>
      <link>https://rshackleton.co.uk</link>
      <description>Example 1</description>
    </item>
    <item>
      <title>Example 2</title>
      <link>https://rshackleton.co.uk</link>
      <description>Example 2</description>
    </item>
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
