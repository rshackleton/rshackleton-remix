import { gql } from 'graphql-request';

export type ArticleModel = {
  _id: string;
  banner: {
    _key: string;
    _type: string;
    asset: {
      _id: string;
      _type: string;
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      _key: string;
    };
  };
  date: Date;
  slug: { current: string };
  summary: string;
  title: string;
};

export type GetArticlesResult = {
  allArticle: ArticleModel[];
};

export const GetArticles = gql`
  query GetArticles {
    allArticle(sort: { date: DESC }) {
      _id
      banner {
        _key
        _type
        asset {
          _id
          _type
          _createdAt
          _updatedAt
          _rev
          _key
        }
      }
      date
      slug {
        current
      }
      summary
      title
    }
  }
`;
