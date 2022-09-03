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


