import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const home = undefined;

  if (!home) {
    throw json('Page Not Found', { status: 404, statusText: 'Page Not Found' });
  }

  return json(home);
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

export default function Index() {
  const data = useLoaderData<any>();

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}
