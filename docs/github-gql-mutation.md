# Graphql mutations 
## using the github graphql api with react-query

we'll use follow and unfollow user mutations
it takes in parmeter 
```ts
input:FollowUserInput|UnfollowUserInput
```
which has the fields 

```ts
{userId:String! ,clientMutationId:String}
```
so we'll be passing in the userId which we'll get from the user as id , we can ignore clientMutationId since it's not required

## the mutations

```ts
import gql from "graphql-tag";

export const FOLLOWUSER = gql`
  mutation followUser($input: FollowUserInput!) {
    followUser(input: $input) {
      clientMutationId
    }
  }
`;

export const UNFOLLOWUSER = gql`
mutation unfollowUser($input:UnfollowUserInput!){
  unfollowUser(input:$input){
    clientMutationId
  }
}
`;
```

## custom usegQLmutatin

```ts
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

```

## usage in the project

```ts
const followMutation = useGQLmutation(token,FOLLOWUSER)
const unfollowMutation = useGQLmutation(token,UNFOLLOWUSER)
const [yes, setYes] = useState<any>(dev?.viewerIsFollowing);

const followThem = (their_id: string) => {
    setYes(true);
    // followUser(their_name, token);
    followMutation.mutate({input:{userId:their_id}})
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    // unfollowUser(their_name, token);
    unfollowMutation.mutate({input:{userId:their_id}})
  };

```

[full project](https://github.com/tigawanna/gitdeck)
[live preview](https://gitdeck-two.vercel.app/)
