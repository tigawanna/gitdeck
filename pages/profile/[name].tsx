import React from 'react'
import { useRouter } from "next/router";
import { useEffect, useContext } from 'react';
import { useGQLQuery } from './../../utils/queryhooks/gqlquery';
import { GETONEUSER } from '../../utils/queries/GQLuserqueries';
import GlobalContext from '../../utils/context/GlobalsContext';
import ViewerContext from './../../utils/context/ViewerContext';
import { ProfileInfo } from './../../components/people/ProfileInfo';
import { TheIcon } from './../../components/Shared/TheIcon';
import { FaSearch , FaTimes} from "react-icons/fa";
import { Repository } from './../../components/repo/Repository';
import { Viewer } from './../../utils/types/usertypes';
import { Loading } from './../../components/Shared/Loading';

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

console.log("user name === ",name)
  const query = useGQLQuery(
    ["one-user"],
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
    <div className="min-h-screen h-full flex flex-col justify-between">
      <div className="h-[20%]">
        <ProfileInfo
          token={viewerCtx?.value?.token as string}
          user={response}
        />
      </div>

      <div className="h-[80%]">
        <TheIcon Icon={FaSearch} size={"25"} color={""} />
        <Repository
          token={viewerCtx?.value?.token as string}
          username={response?.login as string}
        />
      </div>
    </div>
  );
}

export default Profile
