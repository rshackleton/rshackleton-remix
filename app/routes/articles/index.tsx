import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader: LoaderFunction = () => {
  // @todo: Fetch articles from CMS
  throw json('Page not found', {
    status: 404,
    statusText: `Page Not Found`,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: `Richard Shackleton - Articles`,
  };
};

export default function ArticlesIndex() {
  return (
    <div>
      <h1>Articles</h1>
    </div>
  );
}
