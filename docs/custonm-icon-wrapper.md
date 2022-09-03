React icons are cool and all but tey do have that pesky issue of hvving to wrap them in an <IconContext.provider> in order to be able to resize them or change their colors so i made this wrapper


```ts
import React from 'react'
import { IconContext, IconType } from "react-icons";

type MyProps = {
  // using `interface` is also ok
  Icon: IconType;
  size: string;
  color: string;
  iconstyle?:string;
  iconAction?: () => any;
};
type MyState = {
  iconstyle: string;
};
export class TheIcon extends React.Component<MyProps, MyState> {
   constructor(props:MyProps) {
    super(props)
    this.state = { iconstyle:this.props?.iconstyle?this.props?.iconstyle:"" };
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
        <IconContext.Provider value={{ size:this.props.size,color:this.props.color,
          className:this.state.iconstyle}}>
            <this.props.Icon onClick={()=>this.clickAction()}/>
        </IconContext.Provider>
    
      </div>
    );
  }
}


```

example usage 

```
import { FaTimes} from "react-icons/fa";
import { TheIcon } from './../Shared/TheIcon';

<TheIcon Icon={ FaTimes } size={"34"} color={"green"} />

```

[full project](https://github.com/tigawanna/gitdeck)
[live demo](https://gitdeck-two.vercel.app/)
