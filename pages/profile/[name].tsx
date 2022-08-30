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
const [currTab,setCurrTab] = useState<string>("")
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
      <div className="w-full flex items-center justify-evenly flex-wrap">
      { tabs.map((item)=>{
          return ( <TabItem value={item} setValue={setCurrTab}/>)
      })}
     
    </div>
      <div className="min-h-[80%] flex flex-col ">
       
        {/* <Repository
          token={viewerCtx?.value?.token as string}
          username={response?.login as string}
        /> */}
        <Followers
          token={viewerCtx?.value?.token as string}
          user={response}
        />
          <Following
          token={viewerCtx?.value?.token as string}
          user={response}
        />

      </div>
    </div>
  );
}

export default Profile


interface TabItemProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const TabItem: React.FC<TabItemProps> = ({value,setValue}) => {
return (
 <div className ='px-2 outline-2 outline-slate-500 dark:outline-slate-200 
 hover:outline-purple-500 hover:outline-4 rounded-4 cursor-pointer
 
 '>
  {value}
 </div>
);
}
 

