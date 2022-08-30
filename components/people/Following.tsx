import React from "react";
import { PersonCard } from "./personCard";
import { FOLLOWING } from "./utils/queries";
import { FOLLOWINGPAGE, ROOTFOLLOWING } from "./utils/types";
import { useInfiniteGQLQuery } from "./../../utils/queryhooks/gqlinfinitequery";
import { OneUser } from "../../utils/types/usertypes";

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
      first: 2,
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
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

  const pages = data?.pages;
  console.log("followers === ", data);
  const extras = pages[pages.length - 1].user?.following;
  const hasMore = extras?.pageInfo?.hasNextPage;

  return (
    <div className="h-full w-full flex-col-center ">
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
        <div className="w-full flex-center m-1 p-1">loading more...</div>
      ) : null}
    </div>
  );
};
