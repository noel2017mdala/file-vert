import { gql } from "graphql-tag";

export const GET_USERS = gql`
  query {
    getUsers {
      firstName
      lastName
    }
  }
`;
