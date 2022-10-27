import { useQuery } from "react-query";
import { request, GraphQLClient } from "graphql-request";

export const useGQLQuery = (key, query, variables, configs = {}) => {
  // const { userToken } = useAuth();
  let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      credentials: "include",
      // Authorization: `Bearer ${userToken}`,
    },
  };

  const graphQlClient = new GraphQLClient(endPoint, headers);

  const fetchData = async () => await graphQlClient.request(query, variables);
  //   const fetchData = async () => await request(endPoint, query, variables);

  return useQuery(key, fetchData, configs);
};
