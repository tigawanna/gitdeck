import React,{useState,useContext} from "react";
import { IconContext } from "react-icons";
import { FaSearch , FaTimes} from "react-icons/fa";
import { ResultsList } from "./ResultsList";
import { UseQueryResult } from "react-query";
import { SearchEdge, SearchResult } from './../../utils/types/searchtype';

interface SearchBoxProps {
  keyword: { word: string };
  setKeyword: React.Dispatch<React.SetStateAction<{ word: string }>>;
  action: () => any;
  title: string;
  results: SearchEdge[];
  search_query: UseQueryResult<any, unknown>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  keyword,
  setKeyword,
  action,
  title,
  results,
  search_query,

}) => {
  //  const size = useScreenSize(window.innerWidth, window.innerHeight);
  //  //console.log("sie of screen = === ",size)
  const handleChange = async (e: any) => {
    const { value } = e.target;
    setKeyword({
      ...keyword,
      [e.target.id]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    action();
  };
  return (
    <div className="w-full  h-fit p-[2px] flex flex-col items-center justify-center md:justify-end ">
      <form onSubmit={handleSubmit} className="w-full flex items-center  justify-center md:justify-end">
        <div className="flex-center w-[80%] md:w-[50%]  rounded-md ">
          <input
            className="w-[100%]  p-[5px] md:p-1 mx-1 dark:bg-slate-700  
            mr-2 transition duration-500"
            id="word"
            placeholder={title}
            onChange={handleChange}
            value={keyword.word}
            autoComplete={"off"}
          />
          <button type="submit">
            <IconContext.Provider
              value={{
                size: "20px",
                className: "mx-1",
              }}
            >
              {results?.length > 0 || keyword.word !== "" ? (
                <FaTimes />
              ) : (
                <FaSearch />
              )}
            </IconContext.Provider>
          </button>
        </div>
      </form>

      {
      // keyword.word !== "" &&
      // keyword.word.length > 3 &&
      // !search_query?.error &&
      // !search_query?.isFetched &&
      search_query.isFetching &&
      title !== "filter repo"
      ? (
        <div
          style={{ position: "fixed", top: "100px" }}
          className=" w-[70%]  flex-center h-[10%] fixed
          top-[15%] bg-slate-200 dark:bg-slate-900 text-lg rounded transition duration-500"
        >
          searching....
        </div>
      ) : null}


      {search_query?.isFetched &&
      results?.length === 0 &&
      keyword.word !== "" &&
      title !== "filter repo"
      
      ? (
        <div
          style={{ position: "fixed", top: "100px" }}
          className=" w-[90%] md:w-[50%]   flex-center h-[10%] 
          fixed top-[15%] bg-slate-200 dark:bg-slate-900 text-lg 
          rounded transition duration-500 " 
        >
          no matches, try different key words
        </div>
      ) : null}
      {/* {results && keyword.word !== "" && title !== "filter repo" ? (
        <div
          style={{ position: "fixed", top: "100px"}}
          className=" w-[95%]  flex items-center justify-center z-50 
          md:justify-end h-[70%]  dark:text-white dark:border-white dark:shaow-white"
        >
          <ResultsList results={results} setKeyword={setKeyword} />
        </div>
      ) : null} */}
    </div>
  );
};
