import { useQuery } from "react-query";
import { request, GraphQLClient } from "graphql-request";
import { useAuth } from "../context/AuthContext";

export const useGQLQuery = (key, query, variables, configs = {}, token, id) => {
  let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;

  const userAuth = window.localStorage.getItem("user_items");
  let userId = userAuth ? JSON.parse(userAuth).user.id : null;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      credentials: "include",
      Authorization: `Bearer ${token}`,
      "user-id": userId,
    },
  };

  const graphQlClient = new GraphQLClient(endPoint, headers);

  // const graphQlClient = new GraphQLClient(endPoint, {
  //   credentials: "include",
  //   headers: headers,
  // });

  const fetchData = async () => await graphQlClient.request(query, variables);
  //   const fetchData = async () => await request(endPoint, query, variables);

  return useQuery(key, fetchData, configs);
};
