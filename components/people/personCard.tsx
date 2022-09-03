import { useState } from "react";
import { OneUser } from "./utils/types";
import Link from 'next/link'
import Image from "next/image";
import { useGQLmutation } from './../../utils/queryhooks/gqlmutation';
import { FOLLOWUSER , UNFOLLOWUSER} from './../../utils/mutations/UserMutations';

interface PersonCardProps {
  dev: OneUser;
  token: string;

}

export const PersonCard: React.FC<PersonCardProps> = ({ dev, token}) => {

// console.log("mini user gql query ", miniuser);
const [yes, setYes] = useState<any>(dev?.viewerIsFollowing);
const followMutation = useGQLmutation(token,FOLLOWUSER)
const unfollowMutation = useGQLmutation(token,UNFOLLOWUSER)


// console.log("follow data ===",followMutation.data)
// console.log("unfollowdata ===",unfollowMutation.data)
// console.log("follow user ===",followMutation?.error?.response)
// console.log("unfollow user ===", unfollowMutation?.error?.response);


const followThem = (their_id: string) => {
    setYes(true);
    // followUser(their_name, token);
    followMutation.mutate({input:{userId:their_id}})
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    // unfollowUser(their_name, token);
    unfollowMutation.mutate({input:{userId:their_id}})
  };
// console.log("dev.login",dev.login)
  return (
    <div
      className="h-44 w-[99%] md:w-[31%] lg:w-[25%] m-2 md:m-2"
    >

      <div className="w-full h-full flex flex-col 
      justify-between
       hover:shadow-md m-1 p-2 border-[1px] border-black dark:border-white rounded-sm">
    <Link href={'/profile/'+ dev?.login}>
      <div className=" flex items-center justify-between min-w-[60%] cursor-pointer w-full">
        <div className="h-full w-16 mx-2">
         <Image
          className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
          src={dev?.avatarUrl as string}
          alt=""
          height={"10px"}
          width={"10px"}
          layout="responsive"
        />
        </div>
        <div className="flex flex-col  w-[80%] ">
          <div className="text-[12px] font-bold md:text-[16px]  break-all w-100%]">
            @{dev?.login}
          </div>
          <div
            className="text-[12px]  max-h-[100px] font-normal 
              md:text-[13px] break-word w-[95%] text-ellipsis overflow-hidden">
            {dev?.bio}
          </div>
        </div>
      </div>

      </Link>
     <div className="w-full  flex-center">
      {!dev?.isViewer?
       <div className="w-full  flex-center">
       {yes ? (
        <button
          onClick={() => unfollowThem(dev.id)}
          className="bg-slate-600 hover:bg-slate-800 text-white w-[90%]
           hover:text-red-200 text-[13px] rounded-md p-[4px] m-[3px] h-fit"
        >
          {"Unfollow"}
        </button>
      ) : (
        <button
          onClick={() => followThem(dev.id)}
          className="bg-slate-600 hover:bg-slate-800 text-white
           hover:text-red-200 text-[13px] rounded-md p-[4px] m-[3px] h-fit w-[90%]"
        >
          {dev?.isFollowingViewer?"Follow back":"Follow"}
        </button>
      )}
       </div>
      :null
      }
      </div>

      </div>

    </div>
  );
};
