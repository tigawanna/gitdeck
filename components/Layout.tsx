import React, { ReactNode } from "react";
import  Login  from "../pages/login/Login";
import { useContext } from "react";
import { useGQLQuery } from "../utils/queryhooks/gqlquery";
import { GETVIEWER, USERSEARCH } from "./../utils/queries/GQLuserqueries";
import { Toolbar } from "./Toolbar/Toolbar";
import { Viewer } from "./../utils/types/usertypes";
import GlobalContext from "../utils/context/GlobalsContext";
import { useState } from "react";
import { SearchBox } from "./Shared/SearchBox";
import { SearchResult } from "./../utils/types/searchtype";
import ViewerContext from "../utils/context/ViewerContext";
import { Loading } from "./Shared/Loading";
import { ResultsList } from './Shared/ResultsList';

interface Local {
  loading: boolean;
  state: any;
  dispatch: React.Dispatch<any>;
  mainuser?: Viewer;
}

interface LayoutProps {
  children?: ReactNode;
  local: Local;
}

interface RqResponse {
  message: string;
  documentation_url: string;
  status: number;
  headers: {};
}

export const Layout: React.FC<LayoutProps> = ({ children, local }) => {
  const globalCtx = useContext(GlobalContext);
  const [validating, setValidating] = useState(true);
  const token = globalCtx?.value?.token as string;
  const [keyword, setKeyword] = useState({ word: "" });


  const query = useGQLQuery(
    ["main-user", token],
    token,
    GETVIEWER,
    {},
    {
      enabled: token ? true : false,
      onSuccess: (data: any) => {
       setValidating(false);
      },
      onError: (error: any) => {

        if (
          error?.response?.status === 401 ||
          error?.response?.status === 402
        ) {
          globalCtx.updateValue({ type: "TOKEN", payload: null });
          globalCtx.updateValue({
            type: "ERROR",
            payload: error?.response?.message,
          });
        }
        setValidating(false);
      },
    }
  );

  const [val, setValue] = useState({ viewer: query?.data?.viewer, token });
  const action = () => {
    setKeyword({ word: "" });
  };

  const search_query = useGQLQuery(
    ["search-user", keyword.word, token],
    globalCtx?.value?.token as string,
    USERSEARCH,
    { query: keyword.word, first: 10, type: "USER" },
    {
      enabled: keyword?.word?.length > 3 && token ? true : false,
      onSuccess: (data: any) => {

        setValidating(false);
      },
      onError: (error: any) => {

        setValidating(false);
      },
    }
  );


  //@ts-ignore
  const error = query?.error?.response as RqResponse;
  const search_results = search_query.data?.search as SearchResult;

  if (query.isError && error?.status !== 401 && error?.status !== 402) {
    return (
      <div className="flex-center min-h-screen w-full">
        <div className="w-[90%] md:w-[60%] text-red-700">{error?.message}</div>
      </div>
    );
  }

  const shouldLogin = () => {
    if ((query.isError && !validating) || !token) {
        return true;
    }
    return false;
  };

  if (query.isLoading || local.loading) {
    return ( 
      <div className='w-full min-h-screen flex-center'>
    <Loading size={100}/>
    </div>
    );
  }

  if (shouldLogin()) {
    return <Login />;
  }

  const viewer = query?.data?.viewer as Viewer;

  return (
    <div className="w-full min-h-screen h-full flex flex-col justify-between dark-styles ">
      <ViewerContext.Provider
        value={{ value: { viewer, token }, updateValue: setValue }}>
        <div className="fixed top-0 w-full z-30 h-[10%]">
          <Toolbar user={viewer} />
          <div className="w-full dark-styles ">
            <SearchBox
              keyword={keyword}
              setKeyword={setKeyword}
              action={action}
              title={"email or username"}
              results={search_results?.edges}
              search_query={search_query}
            />
          </div>
    </div>

    <div className="w-full  fixed top-[95px] flex justify-end z-50">
        {search_results?.edges && keyword.word !== ""?
        <ResultsList results={search_results?.edges} setKeyword={setKeyword} />
        :null}
    </div>

        <div className=" h-[90%]  mt-24">{children}</div>
      </ViewerContext.Provider>
    </div>
  );
};
