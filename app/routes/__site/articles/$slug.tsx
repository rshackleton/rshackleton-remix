import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import imageUrlBuilder from '@sanity/image-url';
import invariant from 'tiny-invariant';
import PortableText from '~/components/PortableText';
import type {
  ArticleModel,
  GetArticleBySlugResult,
} from '~/queries/GetArticleBySlug';
import { GetArticleBySlug } from '~/queries/GetArticleBySlug';
import { client, graphqlClient } from '~/sanity/client';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `$slug is required in url`);

  const result = await graphqlClient.request<GetArticleBySlugResult>(
    GetArticleBySlug,
    {
      slug: params.slug,
    },
  );

  const [article] = result.allArticle;

  if (!article) {
    throw json('Page Not Found', { status: 404, statusText: 'Page Not Found' });
  }

  return json(article);
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: `Richard Shackleton - Page Not Found`,
    };
  }

  return {
    title: `Richard Shackleton - ${data.title}`,
  };
};

export type ArticlePageProps = {};

const ArticlePage: React.FC<ArticlePageProps> = () => {
  const data = useLoaderData<ArticleModel>();

  const formatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const builder = imageUrlBuilder(client);

  return (
    <div>
      <h1>{data.title}</h1>
      <div>
        <time dateTime={data.date}>
          {formatter.format(new Date(data.date))}
        </time>
      </div>
      <div>
        <img alt="" src={builder.image(data.banner).width(1600).url()} />
      </div>
      <PortableText value={data.contentRaw} />
    </div>
  );
};

export default ArticlePage;
