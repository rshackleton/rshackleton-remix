import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader: LoaderFunction = () => {
  // @todo: Fetch page from CMS
  throw json('Page not found', {
    status: 404,
    statusText: `Page Not Found`,
  });
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
  return (
    <div>
      <h1>Post Name</h1>
    </div>
  );
};

export default ContentPage;
