import React from "react";
import {MainAuthedUser } from "../../types/UserTypes";
import { useInfiniteGQLQuery } from "../../utils/graphql/gqlInfiniteQuery";
import { PersonCard } from "./personCard";
import { FOLLOWERS } from "./utils/queries";
import { FOLLOWERSPAGE, ROOTFOLLOWERS } from "./utils/types";


interface FollowersProps {
  url?: string;
  token: string;
  user:MainAuthedUser|undefined
  ogUser:MainAuthedUser|undefined
}

export const Followers: React.FC<FollowersProps> = ({token,user}) => {

  const query = useInfiniteGQLQuery(
  ["followers", user?.login as string],
  token,
  FOLLOWERS,
  {
    name: user?.login,
    limit: 25,
    after: null,
  },
  {
    getPreviousPageParam: (firstPage:FOLLOWERSPAGE) => {
      return firstPage?.user?.followers?.pageInfo?.startCursor ?? null;
    },
    getNextPageParam: (lastPage: FOLLOWERSPAGE) => {
      return lastPage?.user?.followers?.pageInfo?.endCursor ?? null;
    },
  }
);
  
  const data = query.data as ROOTFOLLOWERS;

if (query.isLoading) {
  return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

    const pages = data?.pages;
    //  console.log("followers === ",followers)
    const extras = pages[pages.length - 1].user?.followers;
    const hasMore = extras?.pageInfo?.hasNextPage;

  return (
    <div className="h-full w-full flex-col-center ">
      <div className="h-fit w-full flex-center  flex-wrap">
        {pages?.map((page) => {
          return page?.user?.followers?.edges?.map((item) => {
            return (
              <PersonCard
                key={item.node.id}
                dev={item?.node}
                token={token}
                user={user}
              />
            );
          });
        })}
      </div>
      {!query.isFetchingNextPage && hasMore ? (
        <button
          className="m-2 hover:text-purple-400 shadow-lg hover:shadow-purple"
          onClick={() => {
            query.fetchNextPage();
          }}
        >
          --- load more ---
        </button>
      ) : null}
      {query.isFetchingNextPage ? (
        <div className="w-full flex-center m-1 p-1">loading more...</div>
      ) : null}
    </div>
  );
};


