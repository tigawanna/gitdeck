import React from 'react'

interface LoadingProps {
size:number
}

export const Loading: React.FC<LoadingProps> = ({size}) => {

return (
  <div className="w-full min-h-screen flex-center">
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="animate-spin"
    >
      <div
        className="h-full w-full border-4 
                   border-t-purple-500 border-b-purple-700 rounded-[50%]"
      ></div>
    </div>
  </div>
);
}
