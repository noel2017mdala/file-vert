import { gql } from "graphql-tag";

export const LOGIN = gql`
  mutation ($email: String, $password: String) {
    userLogin(email: $email, password: $password) {
      user {
        firstName
        lastName
        id
      }
      token
      #refreshToken
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

export const TOKEN_REFRESH = gql`
mutation($id: ID){
  tokenRefresh(id: $id){
    token
    response {
        status
        message
      }
  }
}
`;
