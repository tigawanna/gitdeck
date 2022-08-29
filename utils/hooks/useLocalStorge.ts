
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
