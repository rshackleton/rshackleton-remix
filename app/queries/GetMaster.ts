import { gql } from 'graphql-request';

export type NavigationModel = {
  _key: string;
  title: string;
  type: string;
  toRef: any;
  toUrl: string;
};

export type MasterModel = {
  navigation: NavigationModel[];
};

export type GetMasterResult = {
  Master: MasterModel;
};

export const GetMaster = gql`
  query GetMaster {
    Master(id: "master") {
      title
      navigation {
        _key
        title
        type
        toRef {
          ... on Article {
            _type
            slug {
              current
            }
            title
          }
          ... on Contentpage {
            _type
            slug {
              current
            }
            title
          }
          ... on Home {
            _type
            title
          }
        }
        toUrl
      }
    }
  }
`;
