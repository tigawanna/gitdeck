import { useInfiniteQuery } from "react-query";
import { GraphQLClient } from "graphql-request";
import { DocumentNode } from "graphql";

export const useInfiniteGQLQuery = (
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

  const fetchData = async (deps: any) => {
    //@ts-ignore
    variables.after = deps?.pageParam ? deps.pageParam : null;
    return await graphQLClient.request(query, variables);
  };

  // const fetchData = async () => await request(endpoint, query, variables);

  return useInfiniteQuery(key, fetchData, config);
};
