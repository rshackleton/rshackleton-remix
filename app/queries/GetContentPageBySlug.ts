import { gql } from 'graphql-request';

export type ContentPageModel = {
  _id: string;
  contentRaw: any;
  slug: { current: string };
  title: string;
};

export type GetContentPageBySlugResult = {
  allContentpage: ContentPageModel[];
};

export const GetContentPageBySlug = gql`
  query GetContentPageBySlug($slug: String!) {
    allContentpage(where: { slug: { current: { eq: $slug } } }) {
      _id
      contentRaw
      slug {
        current
      }
      title
    }
  }
`;
