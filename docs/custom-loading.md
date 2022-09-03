tailwind css has an `animate` class which you can use to accomplish some fun things 

### minimal custom react loading screen

```ts
import React from 'react'

interface LoadingProps {
size:number
}

export const Loading: React.FC<LoadingProps> = ({size}) => {

return (
  <div className="w-[50%]  flex-center h-10">
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="animate-spin">
      <div className="h-full w-full border-4 border-t-purple-500
        border-b-purple-700 rounded-[50%]">
      </div>
    </div>
  </div>
);
}


```

and call it like 

```ts
<Loading size={35}/>

```
viola 

[full project code](https://github.com/tigawanna/gitdeck)
[live preview](https://gitdeck-two.vercel.app/)
