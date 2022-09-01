import React from 'react'
import { SearchEdge, SearchNode } from './../../utils/types/searchtype';
import Image from "next/image";
import Link from 'next/link'


interface ResultsListProps {
  results:SearchEdge[];
  setKeyword: React.Dispatch<
    React.SetStateAction<{
      word: string;
    }>
  >;
}

export const ResultsList: React.FC<ResultsListProps> = ({results,setKeyword}) => {
return (
  <div className="w-[100%] md:w-[60%] h-full flex flex-col items-center  overflow-y-scroll scroll-bar ">
    {results &&
      results.map((result, index) => {
        return <ResultsCard result={result.node} setKeyword={setKeyword} key={index}/>;
      })}
  </div>
);
}


interface ResultsCardProps {
  result: SearchNode;
  setKeyword: React.Dispatch<
    React.SetStateAction<{
      word: string;
    }>
  >;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({result,setKeyword}) => {


 const navigateToProfile = () => {
   setKeyword({word:""}) 
  //  navigate(`/personprofile`, { state: { dev:result } });
 };    
return (
  <Link href={"/profile/" + result?.login}>
    <div
      onClick={() => navigateToProfile()}
    className="w-[100%] h-26 m-[2px] p-1 bg-slate-100 dark:bg-slate-800  rounded-lg 
    shadow-slate-600 dark:shadow-white 
      hover:bg-slate-200 dark:hover:bg-slate-900 shadow-sm cursor-pointer inline-flex"
    >
      <Image
        className="h-[50px] w-[50px] rounded-[50%] m-1"
        src={result?.avatarUrl as string}
        alt=""
        height={"50px"}
        width={"50px"}
      />
      <div className="w-[100%] h-12  flex-center text-base font-mono font-normal">
        {result?.login}
      </div>
    </div>
  </Link>
);
}
