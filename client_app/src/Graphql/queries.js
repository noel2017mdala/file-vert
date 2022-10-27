import { gql } from "graphql-tag";

export const GET_USERS = gql`
  query {
    getUsers {
      firstName
      lastName
    }
  }
`;

export const GET_USER = gql`
  query ($id: ID) {
    getUser(id: $id) {
      firstName
    }
  }
`;
