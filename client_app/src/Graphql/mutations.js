import { gql } from "graphql-tag";

export const LOGIN = gql`
  mutation ($email: String, $password: String) {
    userLogin(email: $email, password: $password) {
      user {
        firstName
        lastName
      }
      token
      response {
        status
        message
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation ($input: UserInput) {
    createUser(input: $input) {
      status
      message
    }
  }
`;
