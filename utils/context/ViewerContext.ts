import React from "react";
import { Viewer } from "./../types/usertypes";

interface Value {
  viewer?: Viewer;
   token:string|null
}


interface Type {
  value:Value;
  updateValue: any;
}

const init_data: Type = {
  value:{viewer:undefined,token:null},
  updateValue: (value:Value) => {},
};

const ViewerContext = React.createContext(init_data);
export default ViewerContext;
