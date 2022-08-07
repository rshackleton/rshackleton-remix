import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import PortableText from '~/components/PortableText';
import type {
  ContentPageModel,
  GetContentPageBySlugResult,
} from '~/queries/GetContentPageBySlug';
import { GetContentPageBySlug } from '~/queries/GetContentPageBySlug';
import { graphqlClient } from '~/sanity/client';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `$slug is required in url`);

  const result = await graphqlClient.request<GetContentPageBySlugResult>(
    GetContentPageBySlug,
    {
      slug: params.slug,
    },
  );

  const [contentPage] = result.allContentpage;

  if (!contentPage) {
    throw json('Page Not Found', { status: 404, statusText: 'Page Not Found' });
  }

  return json(contentPage);
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

export type ContentPageProps = {};

const ContentPage: React.FC<ContentPageProps> = () => {
  const data = useLoaderData<ContentPageModel>();

  return (
    <div>
      <h1>{data.title}</h1>
      <PortableText value={data.contentRaw} />
    </div>
  );
};

export default ContentPage;
