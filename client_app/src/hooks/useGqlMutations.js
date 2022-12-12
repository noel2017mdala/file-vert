import { useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";
import { useAuth } from "../context/AuthContext";
import Cookie from "universal-cookie";
let cookies = new Cookie();

export const useGQLMutation = (query, configs = {}, token, id) => {
  let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;

  const userAuth = window.localStorage.getItem("user_items");

  let userId = userAuth ? JSON.parse(userAuth).user.id : null;

  console.log(cookies.get("r_user_token"));

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "user-id": userId,
      // "r-token": cookies.get("r_user_token"),
    },
  };

  const graphQlClient = new GraphQLClient(endPoint, headers);

  // const graphQlClient = new GraphQLClient(endPoint, {
  //   credentials: "include",
  //   headers: headers,
  // });

  const makeMutation = async (variables) =>
    await graphQlClient.request(query, variables);

  return useMutation(makeMutation, configs);
};
