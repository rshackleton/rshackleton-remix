import { Link } from '@remix-run/react';
import * as React from 'react';
import type {
  ArticleModel,
  GetArticleSummaryResult,
} from '~/queries/GetArticleSummary';
import { GetArticleSummary } from '~/queries/GetArticleSummary';
import { graphqlClient } from '~/sanity/client';

export type ArticleSummaryProps = {
  id: string;
};

const ArticleSummary: React.FC<ArticleSummaryProps> = (props) => {
  const [data, setData] = React.useState<ArticleModel>();

  React.useEffect(() => {
    graphqlClient
      .request<GetArticleSummaryResult>(GetArticleSummary, { id: props.id })
      .then((data) => {
        setData(data.Article);
      });
  }, [props.id]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <Link prefetch="intent" to={`/articles/${data.slug.current}`}>
        <h2>{data.title}</h2>
        <p>{data.summary}</p>
      </Link>
    </div>
  );
};

export default ArticleSummary;
