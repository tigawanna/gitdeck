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
import { TabItem } from '../../components/Shared/TabItem';

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
    return ( 
    <div className='w-full min-h-screen flex-center'>
    <Loading size={100}/>
    </div>
    );
  }

const response = query.data?.user as Viewer
// console.log(response)
//  console.log("user name === ",name , response?.login)
const followingcount = response.following.totalCount
const followercount = response.followers.totalCount
const repocount = response.repositories.totalCount

const tabs =[['repo',repocount],['followers',followercount],['following',followingcount]]

return (
  <div className="min-h-screen h-full flex flex-col justify-start">
    <div className="h-[20%]">
      <ProfileInfo token={viewerCtx?.value?.token as string} user={response} />
    </div>

    <div className="min-h-[80%] flex flex-col justify-start">
      <div className="w-full flex items-center justify-evenly flex-wrap sticky 
      top-[100px] z-50 dark:bg-slate-700 bg-white ">
        {tabs.map((item, index) => {
          return (
            <TabItem
              value={item[0] as string}
              count={item[1] as number}
              currTab={currTab}
              setValue={setCurrTab}
              key={index}
            />
          );
        })}
      </div>

      {currTab === "repo" ? (
        <Repository
          token={viewerCtx?.value?.token as string}
          username={response?.login as string}
        />
      ) : null}

      {currTab === "followers" ? (
        <Followers token={viewerCtx?.value?.token as string} user={response} />
      ) : null}
      {currTab === "following" ? (
        <Following token={viewerCtx?.value?.token as string} user={response} />
      ) : null}
    </div>
  </div>
);
}

export default Profile



 

