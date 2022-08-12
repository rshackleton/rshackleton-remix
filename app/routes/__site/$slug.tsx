import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `$slug is required in url`);

  const contentPage = undefined;

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
  const data = useLoaderData<any>();

  return (
    <div>
      <h1>{data.title}</h1>
      {/* <PortableText value={data.contentRaw} /> */}
    </div>
  );
};

export default ContentPage;
