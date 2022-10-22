import { useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";

export const useGQLMutation = (query, configs = {}) => {
  let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${userToken}`,
    },
  };

  const graphQlClient = new GraphQLClient(endPoint, headers);

  const makeMutation = async (variables) =>
    await graphQlClient.request(query, variables);

  return useMutation(makeMutation, configs);
};
