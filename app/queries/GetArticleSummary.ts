import { gql } from 'graphql-request';

export type ArticleModel = {
  _id: string;
  slug: { current: string };
  summary: string;
  title: string;
};

export type GetArticleSummaryResult = {
  Article: ArticleModel;
};

export const GetArticleSummary = gql`
  query GetArticleSummary($id: ID!) {
    Article(id: $id) {
      _id
      slug {
        current
      }
      summary
      title
    }
  }
`;
