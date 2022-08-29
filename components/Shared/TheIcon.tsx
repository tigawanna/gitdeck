import React from 'react'
import { IconContext, IconType } from "react-icons";

type MyProps = {
  // using `interface` is also ok
  Icon: IconType;
  size: string;
  color: string;
  iconAction?: () => any;
};
type MyState = {
  count: number; // like this
};
export class TheIcon extends React.Component<MyProps, MyState> {
   constructor(props:MyProps) {
    super(props)
    this.clickAction = this.clickAction.bind(this); 
    }
    clickAction(){
      if(this.props.iconAction){
      console.log("click action")
      return this.props.iconAction()
      }
      return console.log("")
      }
     render() {
    return (

      <div>
        <IconContext.Provider value={{ size:this.props.size,color:this.props.color}}>
            <this.props.Icon onClick={()=>this.clickAction()}/>
        </IconContext.Provider>
    
      </div>
    );
  }
}
