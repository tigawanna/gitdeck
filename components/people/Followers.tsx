import React from "react";
import { PersonCard } from "./personCard";
import { FOLLOWERS } from "./utils/queries";
import { FOLLOWERSPAGE, ROOTFOLLOWERS } from "./utils/types";
import { useInfiniteGQLQuery } from './../../utils/queryhooks/gqlinfinitequery';
import { OneUser } from "../../utils/types/usertypes";
import { Loading } from './../Shared/Loading';


interface FollowersProps {
  token: string;
  user:OneUser|undefined
}

export const Followers: React.FC<FollowersProps> = ({token,user}) => {

  const query = useInfiniteGQLQuery(
  ["followers", user?.login as string],
  token,
  FOLLOWERS,
  {
    login: user?.login,
    first: 25,
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
  return (
  <div className="w-full flex-center p-2">
  <Loading size={30} />
  </div>
  )
    
  }

    const pages = data?.pages;
    //  console.log("followers === ",data)
    const extras = pages[pages.length - 1].user?.followers;
    const hasMore = extras?.pageInfo?.hasNextPage;

  return (
    <div className="min-h-screen w-full flex-col justify-start mb-5">
      <div className="h-fit w-full flex-center  flex-wrap">
        {pages?.map((page) => {
          return page?.user?.followers?.edges?.map((item,index) => {
            return (
              <PersonCard
                key={item.node.id + index}
                dev={item?.node}
                token={token}
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
      <div className="w-full flex-center ">
        <Loading size={20} />
      </div>
      ) : null}
    </div>
  );
};


