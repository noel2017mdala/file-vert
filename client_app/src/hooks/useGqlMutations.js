import { useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";
import { useAuth } from "../context/AuthContext";

export const useGQLMutation = (query, configs = {}, token, id) => {
  let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;

  const userAuth = window.localStorage.getItem("user_items");
  let userId = JSON.parse(userAuth).user.id;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "user-id": userId,
    },
  };

  const graphQlClient = new GraphQLClient(endPoint, headers);

  const makeMutation = async (variables) =>
    await graphQlClient.request(query, variables);

  return useMutation(makeMutation, configs);
};
