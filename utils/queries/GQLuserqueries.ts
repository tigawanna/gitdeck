import gql from "graphql-tag";

/// user fragments
export const OneUserFrag = gql`
  fragment OneUser on User {
    id
    name
    login
    email
    bio
    avatarUrl
    company
    twitterUsername
    createdAt
    isFollowingViewer
    viewerIsFollowing
    isViewer
    location
    url
    followers(first: 1) {
      totalCount
      nodes {
        id
      }
    }
    following(first: 1) {
      totalCount
      nodes {
        id
      }
    }
  }
`;



//get currently logged in user
export const GETVIEWER = gql`
  query getViewer {
    viewer {
      ...OneUser
      followers(first: 1) {
        totalCount
        nodes {
          id
        }
      }
      following(first: 1) {
        totalCount
        nodes {
          id
        }
      }
    }
  }
  ${OneUserFrag}
`;




export const USERSEARCH = gql `

query userSearch($query:String!,$first:Int,$type:SearchType!){
  search(query:$query,first:$first,type:$type){
    repositoryCount
    discussionCount
    userCount
    codeCount
    issueCount
    wikiCount
  
  edges{
    node{
  ... on User {
    login
    name
    email
    avatarUrl
    url
    }
  }
  }
 }
}

`


export const getUserWithFollowers = gql`
  query getUserFollowers($login: String!, $first: Int, $after: String) {
    user(login: $login) {
     followers(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
        edges {
          node {
      ...OneUser
          }
        }
      }
    }
  }
   ${OneUserFrag}
`;




export const GETONEUSER = gql`
  query getUser($login: String!) {
    user(login: $login) {
      ...OneUser
      }
   }
   ${OneUserFrag}
    `




export const getUserWithFollowing = gql`
  query getUserFollowing($login: String!, $first: Int, $after: String) {
    user(login: $login) {
    following(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
        edges {
          node {
       ...OneUser
          }
        }
      }
    }
  }
  ${OneUserFrag}
`;
