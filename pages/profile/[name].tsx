import React from 'react'
import { useRouter } from "next/router";
import {  useState,useContext } from 'react';
import { useGQLQuery } from './../../utils/queryhooks/gqlquery';
import { GETONEUSER } from '../../utils/queries/GQLuserqueries';
import ViewerContext from './../../utils/context/ViewerContext';
import { ProfileInfo } from './../../components/people/ProfileInfo';

import { Viewer} from './../../utils/types/usertypes';
import { Loading } from './../../components/Shared/Loading';
import { Followers  } from '../../components/people/Followers';
import { Following  } from '../../components/people/Following';
import { Repository } from './../../components/repo/Repository';

interface ProfileProps {

}
interface RqResponse {
  message: string;
  documentation_url: string;
  status: number;
  headers: {};
}

const Profile: React.FC<ProfileProps> = ({}) => {
const router = useRouter();
const viewerCtx = useContext(ViewerContext);
const { name } = router.query
const [currTab,setCurrTab] = useState<string>("repo")
const tabs =['repo','followers','following']

  const query = useGQLQuery(
    ["one-user",name as string],
   viewerCtx?.value?.token as string,
    GETONEUSER,
    {
    login: name,
    },
    {
    enabled:viewerCtx?.value?.token && name ?true:false
    }
  );


// console.log("query in profile === ",query.data?.user)  

  //@ts-ignore
  const error = query?.error?.response as RqResponse;


  if (query.isError && error?.status !== 401 && error?.status !== 402) {
    return (
      <div className="flex-center min-h-screen w-full">
        <div className="w-[90%] md:w-[60%] text-red-700">{error?.message}</div>
      </div>
    );
  }

  if (query.isLoading) {
    return ( <Loading size={100}/>);
  }

const response = query.data?.user as Viewer
 console.log("user name === ",name , response?.login)


return (
    <div className="min-h-screen h-full flex flex-col justify-start">
      <div className="h-[20%]">
        <ProfileInfo
          token={viewerCtx?.value?.token as string}
          user={response}
        />
      </div>
      <div className="w-full flex items-center justify-evenly flex-wrap sticky top-6 z-40">
      { tabs.map((item,index)=>{
          return ( <TabItem value={item} currTab={currTab} setValue={setCurrTab} key={index}/>)
      })}
     
    </div>
      <div className="min-h-[80%] flex flex-col ">
       
       {currTab ==='repo'?<Repository
          token={viewerCtx?.value?.token as string}
          username={response?.login as string}
        />:null }
        
       {currTab==='followers'?<Followers
          token={viewerCtx?.value?.token as string}
          user={response}
        />:null}
       {currTab==='following'?<Following
          token={viewerCtx?.value?.token as string}
          user={response}
        />:null}

      </div>
    </div>
  );
}

export default Profile


interface TabItemProps {
  value: string;
  currTab:string
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const TabItem: React.FC<TabItemProps> = ({value,setValue,currTab}) => {
 
return (

<div 
style={{color: value === currTab?'#ba0aff':'',
borderBottomColor: value === currTab?'#ba0aff':'',
borderBottomWidth:'1px'
}}
  onClick={() =>setValue(value)}
 className ='py-1  cursor-pointer md:ext-2xl font-bold text-mono w-[95%] 
 flex-center md:flex-1 m-[1px] '>
  {value}
 </div>
);
}
 

