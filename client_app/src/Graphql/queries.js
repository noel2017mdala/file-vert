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
      firstName,
      userActive
    }
  }
`;

export const GET_FORMATS = gql`
  query ($id: ID, $format: String) {
    getFormats(id: $id, format: $format) {
      format
      response {
        status
      }
    }
  }
`;

export const FETCH_DATA = gql`
  query {
    fetchData
  }
`;
