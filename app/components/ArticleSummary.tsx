import type * as React from 'react';

export type ArticleSummaryProps = {
  id: string;
};

const ArticleSummary: React.FC<ArticleSummaryProps> = (props) => {
  return null;

  // return (
  //   <div>
  //     <Link prefetch="intent" to={`/articles/${data.slug.current}`}>
  //       <h2>{data.title}</h2>
  //       <p>{data.summary}</p>
  //     </Link>
  //   </div>
  // );
};

export default ArticleSummary;
