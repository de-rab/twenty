import { gql } from '@apollo/client';

export const GET_FAVORITES = gql`
  query GetFavorites {
    findFavorites {
      id
      position
      person {
        id
        firstName
        lastName
        avatarUrl
      }
      company {
        id
        name
        domainName
        accountOwner {
          id
          displayName
          avatarUrl
        }
      }
    }
  }
`;
