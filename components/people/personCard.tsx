import { useState, useEffect } from "react";
import { OneUser } from "./utils/types";
import Link from 'next/link'

import Image from "next/image";

interface PersonCardProps {
  dev: OneUser;
  token: string;

}

export const PersonCard: React.FC<PersonCardProps> = ({ dev, token}) => {

// console.log("mini user gql query ", miniuser);
const [yes, setYes] = useState<any>(dev?.viewerIsFollowing);

const followThem = (their_name: string, token: string) => {
    setYes(true);
    // followUser(their_name, token);
  };
  const unfollowThem = (their_name: string, token: string) => {
    setYes(false);
    // unfollowUser(their_name, token);
  };
console.log("dev.login",dev.login)
  return (
    <div
      className="h-32 w-[95%] md:w-[31%] lg:w-[25%] mx-[2px]"
    >
       <Link href={'/profile/'+ dev?.login}>
      <div className="w-full h-full flex flex-col 
      justify-between  shadow shadow-black hover:shadow-md m-2 p-2">
      <div className=" flex items-center justify-between min-w-[60%] cursor-pointer w-full">
        <div className="h-full w-16 mx-2">
         <Image
          className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
          src={dev?.avatarUrl as string}
          alt=""
          height={"20px"}
          width={"20px"}
          layout="responsive"
        />
        </div>
        <div className="flex flex-col  w-[80%] ">
          <div className="text-[12px] font-bold md:text-[16px]  break-all w-100%]">
            @{dev?.login}
          </div>
          <div
            className="text-[12px]  max-h-[50px] font-normal 
              md:text-[12px] break-all w-[100%] text-ellipsis overflow-hidden">
            {dev?.bio}
          </div>
        </div>
      </div>

      {yes ? (
        <button
          onClick={() => unfollowThem(dev.login, token)}
          className="bg-slate-600 hover:bg-slate-800 text-white
           hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit"
        >
          {"Unfollow"}
        </button>
      ) : (
        <button
          onClick={() => followThem(dev.login, token)}
          className="bg-slate-600 hover:bg-slate-800 text-white
           hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit "
        >
          {"Follow"}
        </button>
      )}
      </div>
      </Link>
    </div>
  );
};
