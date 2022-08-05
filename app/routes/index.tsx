import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader: LoaderFunction = () => {
  // @todo: Fetch page from CMS
  throw json('Page not found', {
    status: 404,
    statusText: `Page Not Found`,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: `Richard Shackleton - Home`,
  };
};

export default function Index() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
