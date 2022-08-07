import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { GetHomeResult, HomeModel } from '~/queries/GetHome';
import { GetHome } from '~/queries/GetHome';
import { graphqlClient } from '~/sanity/client';

export const loader: LoaderFunction = async () => {
  const result = await graphqlClient.request<GetHomeResult>(GetHome);

  console.log(result);

  const home = result.Home;

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
  const data = useLoaderData<HomeModel>();

  return (
    <div>
      <h1>{data.title}</h1>
      <ul>
        <li>
          <Link prefetch="intent" to="/articles">
            Articles
          </Link>
        </li>
        <li>
          <Link prefetch="intent" to="/about">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
}
