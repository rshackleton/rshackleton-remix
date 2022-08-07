import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { ArticleModel, GetArticlesResult } from '~/queries/GetArticles';
import { GetArticles } from '~/queries/GetArticles';
import { graphqlClient } from '~/sanity/client';

export const loader: LoaderFunction = async () => {
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

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link prefetch="intent" to={`/articles/${article.slug.current}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
