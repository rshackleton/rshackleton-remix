import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader: LoaderFunction = () => {
  // @todo: Fetch article from CMS
  throw json('Article not found', {
    status: 404,
    statusText: `Article Not Found`,
  });
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: `Richard Shackleton - Article Not Found`,
    };
  }

  return {
    title: `Richard Shackleton - ${data.title}`,
  };
};

export type ArticlePageProps = {};

const ArticlePage: React.FC<ArticlePageProps> = () => {
  return (
    <div>
      <h1>Post Name</h1>
    </div>
  );
};

export default ArticlePage;
