import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";
import { DocumentNode } from "graphql";
import { useState } from 'react';

export const useGQLQuery = (
  key: string[],
  token: string,
  query: DocumentNode,
  variables: {},
  config = {}
) => {
  // const [error, setError] = useState<string|null>(null)
// console.log("int values in query hook ",token)
  const endpoint = "https://api.github.com/graphql";
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async (deps: any) => {
    //@ts-ignore
    variables.after = deps?.pageParam ? deps.pageParam : null;
    return await graphQLClient.request(query, variables);
  };

  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};
