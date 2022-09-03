import { useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";
import { DocumentNode } from "graphql";

export const useGQLmutation = (
  token: string,
  mutation: DocumentNode,
  config = {}
) => {
  const endpoint = "https://api.github.com/graphql";
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const graphQLClient = new GraphQLClient(endpoint, headers);
  const fetchData = async (vars: any) => {
     return await graphQLClient.request(mutation,vars);
   };
  
   return useMutation((vars:any) => {return fetchData(vars)},config);

};
