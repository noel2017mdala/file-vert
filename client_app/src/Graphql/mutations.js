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
      refreshToken
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
  mutation ($id: ID) {
    tokenRefresh(id: $id) {
      token
      response {
        status
        message
      }
    }
  }
`;

export const UPDATE_USER_ACTIVE = gql`
  mutation ($id: ID) {
    updateUserState(id: $id) {
      status
      message
      token
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation ($id: ID, $firstName: String, $lastName: String, $email: String) {
    updateUserProfile(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      status
      message
      token
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation (
    $id: ID
    $oldPassword: String
    $password: String
    $confirmPassword: String
  ) {
    updateUserPassword(
      id: $id
      oldPassword: $oldPassword
      password: $password
      confirmPassword: $confirmPassword
    ) {
      status
      message
      token
    }
  }
`;

export const USER_PAYMENT = gql`
  mutation ($id: ID, $amount: String, $productID: ID, $token: String) {
    processPayment(
      id: $id
      amount: $amount
      productID: $productID
      token: $token
    ) {
      status
      message
      token
    }
  }
`;

export const USER_PAYMENT_PAYPAL = gql`
  mutation ($userId: ID, $planId: ID) {
    paypalPayment(userId: $userId, planId: $planId) {
      status
      message
      token
    }
  }
`;

export const USER_LOGOUT = gql`
  mutation ($userId: ID) {
    userLogOut(userId: $userId) {
      status
      message
    }
  }
`;
