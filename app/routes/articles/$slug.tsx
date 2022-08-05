import type { MetaFunction } from '@remix-run/node';

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
