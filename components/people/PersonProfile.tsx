import React from 'react'
import { useLocation } from 'react-router-dom';
import { Repository } from '../repo/Repository';
import { MainAuthedUser } from './../../types/UserTypes';
import { UserCard } from './../Cards/UserCard';
import { useQuery } from 'react-query';
import { getUserByName } from '../../utils/githubapi';

interface PersonProfileProps {
    token:string
    ogUser:MainAuthedUser|undefined
}

interface RersonRouteProps{
    user:MainAuthedUser|undefined
    token:string
}

export const PersonProfile: React.FC<PersonProfileProps> = ({ogUser,token}) => {
const location = useLocation();
//@ts-ignore
const dev = location.state?.dev as PersonRouteProps   
const username = dev?.login  as string
const me = ogUser?.login as string
//console.log("incoming dev creds ",dev)

const query = useQuery(["userbyname", token,username,me], () =>
 getUserByName(me,username,token,)
);

if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

  if (query.error) {
    //@ts-ignore
    return <div className="h-full w-full  flex-center ">{query.error?.message}</div>;
  }
const user = query?.data

//console.log("query in person profile === ",user)

return (
    <div className='h-full w-full  flex-col '>
    <div className='w-full '>
    <UserCard user={user} token={token} ogUser={ogUser}/>
    </div>
    <div className='w-full h-full'>
    <Repository token={token} username ={user?.login}/>
    </div>
    
    </div>
);
}
