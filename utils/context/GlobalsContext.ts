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

