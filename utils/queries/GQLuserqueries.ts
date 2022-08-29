import gql from "graphql-tag";

//get currently logged in user
export const GETVIEWER = gql`
  query getViewer {
    viewer {
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
  }
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
