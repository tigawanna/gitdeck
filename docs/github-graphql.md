# working with Github's Graphql api

After working with the [github rest api](https://dev.to/tigawanna/github-rest-api-with-react-4c3g) and experiencing some of it's limitations it's time to pick things up a bit and dive into their Graphql api

as Usual first things first we set up a tesing enviroment and github provides their own [explorer](https://docs.github.com/en/graphql/overview/explorer) which will setup the authentication headers for you under the hood , but if you prefer to use [another gql explorer](https://graphiql-online.com/graphiql) , just set it up like below
Replace ghp_LBgN6pCeWsHcxeoJpR4ZTwUj with your [personal access token](https://dev.to/n3wt0n/how-to-create-a-personal-access-token-pg7)  

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xx79s61bgmw727m6esg0.png)

I have another article i made about [react-query tips an tricks](https://dev.to/tigawanna/react-query-tips-and-tricks-with-github-graphql-and-rest-api-47e0) which might help explain that part . because i want to focus on the actual GraphQl queries in this one i'll mostly highlight the queries  i used in the project and not go into dteails about the react part

[final project live preview](http://gitdeck-two.vercel.app/)

let go

before we start we'll define a graphql Fragment that defines a User, this will come in handy because we'll be usig it when querying the **viewer** ,**user**, **follower** , and **following** for uniformty so that if we need to add or remove a field we just do it once in the fragment and aall the items defined by it change along with it.


```ts
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
    
  repositories(first:1){
   totalCount
    nodes{
      id
    }
    }
  }
`;
```
>If you remember the REST api was lacking a few fields in the equivalnet query  `    isFollowingViewer ,
viewerIsFollowing ,
isViewer`
which will help us avoid having to run other sub queries to check the follow status on every folllower/following item


### **viewer**
this query returns the currently logged in User , am using the personal access token to autheticate users since it's the simplest to implement.

```ts
//get currently logged in user
export const GETVIEWER = gql`
  query getViewer {
    viewer {
      ...OneUser
    }
  }
  ${OneUserFrag}
`;
```

you'll notice that We're only fetcing one **follower** , **following** , **repository**
```js
      following(first: 1) {
        totalCount
        nodes {
          id
        }
      }
``` 
and that's because we're only interested in the totalCount field at this pointin order to diply it like this with all the  counts


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tf78lgn31bgd5hojywoq.png)

### paginated fields

This is also because those three field require pagination and take the `first` ,`last` , `after` and `before` paramters 



last and first is number of nodes and from which portion you want them from start of end and before and after are cursors , the api doe's generate cursprs for us and can be accessed inside the page info field that's availabe in every paginated field 

```js
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
```
in this example to fetch te next values , we'll pass in the endCursor into the after field on the next query

also note the GraphQl types 
```js
$login: String!, $first: Int, $after: String
```
where `String!` is required and cannot be null , but `String` can be null , which is why the in initial query you can apss in after as null

This is also an example of graphql variables , where 

```js
  query getUserFollowers($login: String!, $first: Int, $after: String) {}
```
wiltake in the variables `login` ,`first` and `after` 
and pass them into the query 
```js
user(login: $login) {
followers(first: $first, after: $after) {
```
 and with queries with no varaiables you'll just write

 ```ts
   query getViewer {
    viewer {}
    }
```
 i've found it easier to avoid stuffing multiple paginated fields intoone query and just braek them of into smaller queries to be run by their own component which  instead of a giant query to be reandered in one component

 for example , once the viewer has been fetched the smaller components nested in the main component will have their own queries 
 one for `repositories` another for `followers` and `followeing`
 they will be optionally rendered in a tab like way where by default it'll load  the `repository` tab and the others will be shown if the user explicitly clicks on them which is when they'll  run their sub query


### User

similar to the viewer query but this willtake in a login (username) as aparameter and return the OneUserFragMent , usefull when you want to navigate to another User obtained either from the follower list or Search results

```js
export const GETONEUSER = gql`
  query getUser($login: String!) {
    user(login: $login) {
      ...OneUser
      }
   }
   ${OneUserFrag}
```


### Search

we'll also want the ability to search for random github user's bytheir username or password

```js
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
```
the syntax below is better explained [here](https://stackoverflow.com/questions/61526823/what-is-on-doing-in-this-graphql) but i short it lets us access items of a specifice fragment since this querycan retrn fragments of different types `User` , `Repsitory` , `Code`, `Issue`....
```ts
 ... on User {
```

which allows you to write highly customizable queries like this 

```ts
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
     ... on Repository{
      name
      url
      }
      ... on  Issue{
        id
        body
      }
  }
  }
 }
}
```

### follower

the follower query is basically this query

```ts
//get currently logged in user
export const GETVIEWER = gql`
  query getViewer {
    viewer {
      ...OneUser
    }
  }
  ${OneUserFrag}
`;
```
```js
export const GETONEUSER = gql`
  query getUser($login: String!) {
    user(login: $login) {
      ...OneUser
      }
   }
   ${OneUserFrag}
```  
but with the OneUser fragment being requested inside the the follower field 

```ts
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
```
### the following field is also very similar

```ts
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
```

### Repostory

this field has a lot on it and it'll be all about what you want to display in your app
 in my case i wanted to display something like this 


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tdl7khgyotzyzfff8hr4.png)

I used ben awad's  profile because his repositories actully have stars ,forks and multiple languages which is the brief info i want to see at a glance before i decide to click on it and see more

to achieve this i used this query 
```ts
export const REPOS = gql`
         query getRepos($name: String!, $first: Int, $after: String) {
           user(login: $name) {
             login
             repositories(
               after: $after
               first: $first
               orderBy: { field: PUSHED_AT, direction: DESC }
             ) {
               edges {
                 node {
                   id,
                   name,
                   description,
                   pushedAt,
                   diskUsage,
                   url,
                   visibility,
                   forkCount,
                   stargazers(first: $first) {
                   totalCount
                   },
                   refs(
                     refPrefix: "refs/heads/"
                     orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
                     first: 2
                   ) {
                     edges {
                       node {
                         name
                         id
                         target {
                           ... on Commit {
                             history(first: 1) {
                               edges {
                                 node {
                                   committedDate
                                   author {
                                     name
                                   }
                                   message
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }

                   languages(first: $first) {
                     edges {
                       node {
                         id
                         color
                         name
                       }
                     }
                   }
                 }
                 cursor
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

```

 which is one moderately chonky query but returns everythng i need in one query,

```ts
     refs(
                     refPrefix: "refs/heads/"
                     orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
                     first: 2
                   ) {
                     edges {
                       node {
                         name
                         id
                         target {
                           ... on Commit {
                             history(first: 1) {
                               edges {
                                 node {
                                   committedDate
                                   author {
                                     name
                                   }
                                   message
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }
```                

in this bit am requesting for the 2 most recent commits and te branch on which it was made , the fact that this is possible in one query blows my mind which is another reason i really like graphql

but to top it all off am planing to implement a bigger query which i abandonned after realising it would be a pagination nightmare and would be better off being split up into smaller queries and each query being assigned it's child component which an be optionally rendered on user request but here it is anyway

```ts
const FULLREPO = gql`
# github graphql query to get more details  
  query getRepoDetails(
    $repoowner: String!,
    $reponame: String!,
    $first: Int,
    $after: String,
  ) {
    repository(owner: $repoowner, name: $reponame) {
    nameWithOwner,

      # get the repo collaborators

      collaborators(first: $first, after: $after) {
        edges {
          node {
            avatarUrl,
            email,
            name,
            bio,
            company
          },
        },
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        },
        totalCount
      }
      # end of collaborators

      # gets the repo vunerabilities

      vulnerabilityAlerts(first: $first, after: $after) {
        edges {
          node {
            createdAt,
            securityAdvisory {
              classification,
              description,
              vulnerabilities(first: $first, after: $after) {
                edges {
                  node {
                    severity,
                    package {
                      name,
                      ecosystem
                    }
                  }
                },
                pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor
                },
                totalCount
              }
            }
          }
        }
      },
      #   end of vunerabilities block

      #refs: get branches and all the recent commits to it

      refs(
        refPrefix: "refs/heads/"
        orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
        first: $first
        after: $after
      ) {
        edges {
          node {
            name
            id
            target {
              ... on Commit {
                history(first: $first, after: $after) {
                  edges {
                    node {
                      committedDate,
                      author {
                        name,
                        email
                      },
                      message,
                      url,
                      pushedDate,
                      authoredDate,
                      committedDate
                    }
                  }
                }
              }
            }
          }
        },
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor,
        },
        totalCount
        nodes {
          associatedPullRequests(first: $first, after: $after) {
            pageInfo {
              endCursor,
              hasNextPage,
              hasPreviousPage,
              startCursor,
            },
            totalCount
          }
        }
      }

      # end of refs block
      # languages
      languages(first: $first, after: $after) {
        edges {
          node {
            id,
            color,
            name
          }
        },
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        },
        totalCount
      }

      # end of languages block
      forkCount
      #fork block
      forks(first: $first, after: $after) {
        edges {
          node {
            createdAt,
            nameWithOwner,
            description,
            url,
            owner {
              login,
              url
            },
            parent {
              url,
              owner {
                login,
                url
              }
            }
          }
        }
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor,
        },
        totalCount
      }
      # end of fork block

      # star block
      stargazers(first: $first, after: $after) {
        edges {
          node {
            login,
            url
          }
        }
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        }
        totalCount
      }
      #end of star block
    }
  }
`;

```

 
the query works fine , but only if you don't paginate becase then you'll have to add more `after` variable for every paginated field and also handle the react-query / your gql client of choice 

btw 


