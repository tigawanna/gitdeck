import React, { useState } from 'react'
import dayjs from 'dayjs';
import {
  BiGitRepoForked,
  BiHistory,

} from "react-icons/bi";
import {FiActivity} from 'react-icons/fi'
import { FaStar, FaLock } from "react-icons/fa";
import { SiVisualstudiocode, SiGithub } from "react-icons/si";
import relativeTime from 'dayjs/plugin/relativeTime'
import { SearchBox } from '../Shared/SearchBox';
import { TheIcon } from '../Shared/TheIcon';
import { REPOS } from './utils/query';
import { REPONODE, REPOPAGE, ROOTREPO } from './utils/type';
import { concatPages } from './utils/helper';
import { useInfiniteGQLQuery } from './../../utils/queryhooks/gqlinfinitequery';
import { Loading } from './../Shared/Loading';


dayjs.extend(relativeTime)
interface RepositoryProps {
username:string|undefined
token:string
}

export const Repository: React.FC<RepositoryProps> = ({username,token}) => {
const [keyword, setKeyword] = useState({word:''})

// console.log("repo props ===   ==== ",username,token)
  const query = useInfiniteGQLQuery(
    ["repositories", username as string],
    token,
    REPOS,
    {
      name: username as string,
      first: 20,
      after: null,
    },
    {
    getPreviousPageParam: (firstPage: REPOPAGE) => {
        return firstPage?.user?.repositories?.pageInfo?.startCursor ?? null;
      },
      getNextPageParam: (lastPage: REPOPAGE) => {
        // console.log(" end cursor  === ",lastPage.user.repositories.pageInfo.endCursor)
        return lastPage?.user?.repositories?.pageInfo?.endCursor ?? null;
      },
      select: (data:ROOTREPO) => {
         return concatPages(data,keyword.word)
      }
    }
  );

const action = () => {
  //console.log("test query === ", keyword);
  setKeyword({ word: "" });
  // results.items = []
};


const results:any = {}
const data = query.data as ROOTREPO;
const totalRepsLoaded = data?.pages[0]?.user?.repositories?.edges?.length
// console.log("no of loadeds items ==== ",totalRepsLoaded)
// console.log("in pepos === ", query.data);

if (query.isLoading ) {
return (
<div className="h-full w-full  flex-center ">
 <Loading size={40} />
  </div>
  );
}  
// const {repos,query} = useRepos(token,username as string,keyword.word)
const repos = data?.pages;
const extras = repos[repos.length - 1].user?.repositories;
const hasMore = totalRepsLoaded !== extras?.totalCount;

// console.log("repo filter results ==== ",results)

return (
  <div className="min-h-screen w-full  flex flex-col justify-start">
    <div
      className="h-[10%] p-1 w-full flex-center my-5 sticky top-[50px] z-40
     bg-white dark:bg-slate-800 "
    >
      <SearchBox
        keyword={keyword}
        setKeyword={setKeyword}
        action={action}
        title={"filter repo"}
        results={results}
        search_query={query}
      />
    </div>
    <div className="w-full flex  sticky top-[100px] md:top-[70px] z-50 ">
      <div className="w-[30%] md:w-[10%] flex-center p-[2px] font-bold bg-white 
      dark:bg-slate-700  rounded-sm">
        {totalRepsLoaded}/{extras.totalCount}
      </div>
    </div>
    <div className="h-[80%] w-full flex-center flex-wrap  mb-1">
      {repos?.map((repo) => {
        return repo?.user?.repositories?.edges.map((item) => {
          return (
            <RepoCard repo={item.node} key={item.node?.id} token={token} />
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
}






interface RepoCardProps {
repo:REPONODE
token:string
}

export const RepoCard: React.FC<RepoCardProps> = ({repo,token}) => {
// console.log(repo.html_url)
// const repo_link = authedurl(repo.html_url,token)
const vslink = `https://vscode.dev/${repo.url}`;
// console.log("repo node",repo)
return (
  <div
    className=" min-h-fit h-56 m-2 w-[95%] md:w-[40%] lg:w-[30%] p-5 flex-col 
     ustify-between items-center shadow-sm shadow-slate-300 dark:shadow-black  
 border-black border-2 rounded-md"
  >
    <div
      onClick={() => {}}
      className=" flex-col items-center  justify-between  cursor-pointer h-[90%] w-full"
    >
      <div className="text-[20px] font-semibold md:text-xl md:font-bold  break-all ">
        {repo?.name}
      </div>
      <div className="flex flex-wrap text-color">
        {repo?.languages.edges.map((item) => {
          return (
            <div
              key={item.node.id}
              style={{
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: item.node.color,
                borderRadius: "10%",
              }}
              className="p-[1px] m-[1px] text-[10px] font-semibold md:text-[10px]   break-all"
            >
              {item.node.name}
            </div>
          );
        })}
      </div>
      <div className="text-[14px] md:text-[11px] break-word  max-h-[45%] overflow-y-clip ">
        {repo?.description}
      </div>
      <div
        className="w-fit max-w-full text-[15px] text-sm  font-semibold text-yellow-50 
      flex felx-wrap bg-slate-700"
      >
        <TheIcon Icon={BiHistory} size={"15"} color={""} />
        <div className="bg-slate-700 px-[2px] mr-[3px] truncate w-fit">
          {repo?.refs?.edges[0]?.node?.name}
        </div>{" "}
        :
        <div className="px-[2px] truncate">
          {" "}
          {repo?.refs?.edges[0]?.node?.target?.history?.edges[0]?.node?.message}
        </div>
      </div>
    </div>

    <div className="w-full text-[15px] text-sm  flex justify-between ">
      <div className="text-[12px] font-bold flex-center">
        <FiActivity /> {dayjs(repo?.pushedAt).fromNow()}
      </div>
      <div className="flex-center">
        <BiGitRepoForked /> {repo?.forkCount}
      </div>
      {repo?.stargazers?.totalCount > 0 ? (
        <div className="flex-center">
          <TheIcon Icon={FaStar} size={""} color={"yellow"} />{" "}
          {repo?.stargazers?.totalCount}
        </div>
      ) : null}
      {repo?.visibility === "PRIVATE" ? (
        <div className="flex-center">
          <TheIcon Icon={FaLock} size={""} color={"red"} />
        </div>
      ) : null}

      <div className="flex-center">{repo?.diskUsage} kbs</div>
      <div className="flex-center">
        <a target="_blank" rel="noreferrer" href={vslink} className="mx-1">
          <TheIcon Icon={SiVisualstudiocode} size={"18"} color={"blue"} />
        </a>
        <a target="_blank" rel="noreferrer" href={repo.url} className="mx-1">
          <TheIcon Icon={SiGithub} size={"18"} color={""} />
        </a>
      </div>
    </div>
  </div>
);
}
