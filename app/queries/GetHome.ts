import { gql } from 'graphql-request';

export type HomeModel = {
  _id: string;
  title: string;
};

export type GetHomeResult = {
  Home: HomeModel[];
};

export const GetHome = gql`
  query GetHome {
    Home(id: "home") {
      _id
      title
    }
  }
`;
