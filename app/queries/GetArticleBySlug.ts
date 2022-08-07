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
  contentRaw: any;
  date: Date;
  slug: { current: string };
  title: string;
};

export type GetArticleBySlugResult = {
  allArticle: ArticleModel[];
};

export const GetArticleBySlug = gql`
  query GetArticleBySlug($slug: String!) {
    allArticle(where: { slug: { current: { eq: $slug } } }) {
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
      contentRaw
      date
      slug {
        current
      }
      title
    }
  }
`;
