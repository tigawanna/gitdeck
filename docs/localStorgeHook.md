# useLocalStorage the custom hook 
### strapped this together to help save and retrieve the `user-theme` and `token` from the localstorage


was working on [a react vite app ](https://github.com/tigawanna/gitpals) and had to port it over to Next Js [the ported next js app](https://github.com/tigawanna/gitdeck) and i very quickly discovered that localStorage worked a little differently n Nextjs and i need it because that's where i was saving my personal access token and theme preferences  which lead me down a rabbit hole which resulted in the following custom hook for that


```ts


import { useState,useEffect,useReducer } from 'react';
import { Viewer } from './../types/usertypes';

interface State{
token:string|null
theme:string|null
mainuser?:Viewer
error?:string
}


export const useLocalStorge=()=>{

const [loading, setLoading] = useState(true);
const [ state,dispatch] = useReducer(generalReducer,undefined);
useEffect(() => {
 const gen = window.localStorage.general; 
 if(gen){
  dispatch({ type: "INIT", payload: JSON.parse(gen) });
 }
 setLoading(false)
}, [])


useEffect(() => {
  const colorTheme = state?.theme === "dark" ? "light" : "dark";
  const root = window.document.documentElement;
    // console.log("colorTheme ==== ", colorTheme);
  root.classList.remove(colorTheme);
  // console.log("theme reset to ==== ",state?.theme)
  if(state?.theme){
    root.classList.add(state?.theme);
  }

}, [state?.theme]);



useEffect(() => {
if(state)
window.localStorage.setItem("general",JSON.stringify(state))
}, [state])

return {loading ,state ,dispatch}
}






function generalReducer(state:State, action:any) {
switch (action.type) {

  case "INIT":
    return action.payload;
  case "THEME":
    return {...state,theme:action.payload}
  case "TOKEN":
    return {...state,token:action.payload}  
  case "ERROR":
    return {...state,error:action.payload} 
   
  default:
    return state;
}
}


```
 and you consume it like 

```ts
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "../components/Layout";
import { useLocalStorge } from "./../utils/hooks/useLocalStorge";
import GlobalContext from "../utils/context/GlobalsContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const local = useLocalStorge();
  // console.log("local state ==== ",local?.state)

  // console.log("initial value in local storage ==== ", value);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{ value: local?.state, updateValue: local?.dispatch }}
      >
        <Layout local={local}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Layout>
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;


```
the cotext is optonnal but it looks like this

```ts
import React, { Dispatch } from "react";
import { Viewer } from './../types/usertypes';

export interface Value {
  token: string | null;
  theme:string
  error?: string;
  mainuser?:Viewer
}
interface Type {
  value: Value;
  updateValue:Dispatch<any>
}

const init_data: Type = {
  value:{token:null,theme:"light"},
  updateValue: (any) => {},
};

const GlobalContext = React.createContext(init_data);
export default GlobalContext;

```
[final project looks like ](https://gitdeck-two.vercel.app/)


