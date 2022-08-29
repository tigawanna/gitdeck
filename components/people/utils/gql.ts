import { useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";
import { DocumentNode } from "graphql";

export const useGitGQLQuery = (
  key: string[],
  token: string,
  query: DocumentNode,
  variables: {},
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

  const fetchData = async () => await graphQLClient.request(query, variables);

  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, {keepPreviousData:true});
};
