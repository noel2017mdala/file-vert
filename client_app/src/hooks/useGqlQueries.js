import { useQuery } from "react-query";
import { request, GraphQLClient } from "graphql-request";

// export const useGQLQuery = (key, query, variables, configs = {}) => {
//   let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;

//   //   const fetchData = async () => await graphQlClient.request(query, variables);

//   const fetchData = async () => request(endPoint, query, variables);
// };

export const GetUsers = (key, query, variables, configs = {}) => {
  let endPoint = process.env.REACT_APP_PRODUCTION_SERVER;

  //   const fetchData = async () => await graphQlClient.request(query, variables);

  const fetchData = async () => await request(endPoint, query, variables);

  return useQuery(key, fetchData, configs);
};
