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
      lastName
      email
      phoneNumber
      userActive
      plan {
        name
      }
    }
  }
`;

export const GET_FORMATS = gql`
  query ($id: ID, $format: String) {
    getFormats(id: $id, format: $format) {
      format
      response {
        status
        message
      }
    }
  }
`;

export const FETCH_DATA = gql`
  query ($id: ID, $format: String) {
    fetchData(id: $id, format: $format) {
      format
      response {
        status
      }
    }
  }
`;

export const GET_USER_PLANS = gql`
  query {
    getAllPlans {
      name
      features
      price
      id
    }
  }
`;

export const GET_USER_PLAN = gql`
  query ($id: ID) {
    getUserPlan(id: $id) {
      name
      features
      price
      id
    }
  }
`;
export const GET_EXP_USER_PLAN = gql`
  query {
    getExpUserPlan {
      status
    }
  }
`;
