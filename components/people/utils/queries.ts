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

export const MINI_USER = gql`
         query getMiniUser($name: String!) {
           user(login: $name) {
             login
             id
             isFollowingViewer
             viewerIsFollowing
             bio
             avatarUrl
             isViewer
             url
           }
         }
       `;


export const FOLLO = gql`
  query getFollowers($name: String!, $limit:Int,$after: String) {
    user(login: $name) {
      followers(first: $limit, after: $after) {
             edges {
                 node {
                   login
                   avatarUrl
                   id
                 }
               }
               totalCount
               pageInfo {
                 startCursor
                 endCursor
                 hasNextPage
                 hasPreviousPage
               }
      }
    }
  }
`;




export const FOLLOWING = gql`
         query getFollowing($name: String!, $limit: Int, $after: String) {
           user(login: $name) {
             following(first: $limit, after: $after) {
               edges {
                 node {
                   login
                   avatarUrl
                   id
                 }
               }
               totalCount
               pageInfo {
                 startCursor
                 endCursor
                 hasNextPage
                 hasPreviousPage
               }
             }
           }
         }
       `;




const SIMPLE_USER_QUERY = gql`
  query LOGGEDIN_USER {
    viewer {
      login
      followers(first: 2) {
        edges {
          node {
            id
            name
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          hasPreviousPage
          endCursor
        }
      }
    }
  }
`;


export const FOLLOWERS= gql`
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
