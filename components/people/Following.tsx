import React from "react";
import { PersonCard } from "./personCard";
import { FOLLOWING } from "./utils/queries";
import { FOLLOWINGPAGE, ROOTFOLLOWING } from "./utils/types";
import { useInfiniteGQLQuery } from "./../../utils/queryhooks/gqlinfinitequery";
import { OneUser } from "../../utils/types/usertypes";
import { Loading } from './../Shared/Loading';

interface FollowingProps {
  token: string;
  user: OneUser | undefined;
}

export const Following: React.FC<FollowingProps> = ({ token, user }) => {
  const query = useInfiniteGQLQuery(
    ["following", user?.login as string],
    token,
    FOLLOWING,
    {
      login: user?.login,
      first: 25,
      after: null,
    },
    {
      getPreviousPageParam: (firstPage: FOLLOWINGPAGE) => {
        return firstPage?.user?.following?.pageInfo?.startCursor ?? null;
      },
      getNextPageParam: (lastPage: FOLLOWINGPAGE) => {
        return lastPage?.user?.following?.pageInfo?.endCursor ?? null;
      },
    }
  );

  const data = query.data as ROOTFOLLOWING;

  if (query.isLoading) {
    return (
      <div className="w-full flex-center p-5 m-5">
      <Loading size={40} />
      </div>
    )
    ;
  }

  const pages = data?.pages;
  // console.log("followers === ", data);
  const extras = pages[pages.length - 1].user?.following;
  const hasMore = extras?.pageInfo?.hasNextPage;

  return (
    <div className="min-h-screen w-full flex flex-col justify-start h-full mb-5">
      <div className="h-fit w-full flex-center  flex-wrap">
        {pages?.map((page) => {
          return page?.user?.following?.edges?.map((item, index) => {
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
        
      <div className="w-full flex-center">
        <Loading size={20} />
      </div>

      ) : null}
    </div>
  );
};
