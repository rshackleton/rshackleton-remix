import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import imageUrlBuilder from '@sanity/image-url';
import type { ArticleModel, GetArticlesResult } from '~/queries/GetArticles';
import { GetArticles } from '~/queries/GetArticles';
import { client, graphqlClient } from '~/sanity/client';

export const loader: LoaderFunction = async () => {
  // @todo: Fetch medium posts from rss feed and merge with sanity articles.
  // @link https://medium.com/feed/@rshackleton

  const result = await graphqlClient.request<GetArticlesResult>(GetArticles);

  const articles = result.allArticle;

  return json(articles);
};

export const meta: MetaFunction = () => {
  return {
    title: `Richard Shackleton - Articles`,
  };
};

export default function ArticlesIndex() {
  const articles = useLoaderData<ArticleModel[]>();

  const formatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const builder = imageUrlBuilder(client);

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link prefetch="intent" to={`/articles/${article.slug.current}`}>
              <img
                alt=""
                src={builder.image(article.banner).width(400).url()}
              />
              <h2>{article.title}</h2>
              <time dateTime={article.date}>
                <small>{formatter.format(new Date(article.date))}</small>
              </time>
              <p>{article.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
