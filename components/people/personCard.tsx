import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { followUser, unfollowUser } from "../../utils/githubapi";
import { MainAuthedUser } from "../../types/UserTypes";
import { useGitGQLQuery } from "./utils/gql";
import { FOLLOWNODE, MINIUSER } from "./utils/types";
import { MINI_USER } from "./utils/queries";

interface PersonCardProps {
  dev: FOLLOWNODE;
  token: string;
  user: MainAuthedUser | undefined;
}

export const PersonCard: React.FC<PersonCardProps> = ({ dev, token, user }) => {
  const query = useGitGQLQuery(["mini-user", dev.login], token, MINI_USER, {
    name: dev?.login,
  });

  const miniuser = query?.data?.user as MINIUSER;

  // console.log("mini user gql query ", miniuser);
  const [yes, setYes] = useState<any>(miniuser?.viewerIsFollowing);
  useEffect(() => {
    setYes(miniuser?.viewerIsFollowing);
  }, [miniuser?.viewerIsFollowing]);
  const navigate = useNavigate();

  const showUserProfile = () => {
    localStorage.setItem("dev",JSON.stringify(dev))
    const devy =localStorage.setItem("devy", JSON.stringify(dev));
    console.log("saving devy ...... = ",devy)
    navigate(`/personprofile`, { state: { dev } });
  };

  const followThem = (their_name: string, token: string) => {
    setYes(true);
    followUser(their_name, token);
  };
  const unfollowThem = (their_name: string, token: string) => {
    setYes(false);
    unfollowUser(their_name, token);
  };
  if (query.isLoading) {
    return <div className="h-full w-full  flex-center "></div>;
  }
  return (
    <div
      className="h-32 w-[95%] md:w-[31%] lg:w-[25%] p-2 flex 
      justify-evenly items-center shadow shadow-black hover:shadow-md m-2 "
    >
      <div
        onClick={() => showUserProfile()}
        className=" flex items-center justify-between min-w-[60%] cursor-pointer w-full"
      >
        <img
          className="max-h-14  max-w-24  m-[2px] mr-2 rounded-[20%]"
          src={dev?.avatarUrl}
          loading="lazy"
          alt=""
        />
        <div className="flex flex-col  w-[80%] ">
          <div className="text-[12px] font-bold md:text-[16px]  break-all w-100%]">
            @{dev?.login}
          </div>
          <div
            className="text-[12px]  max-h-[90px] font-normal 
              md:text-[12px] break-all w-[100%] text-ellipsis overflow-hidden"
          >
            {miniuser?.bio}
          </div>
        </div>
      </div>

      {yes ? (
        <button
          onClick={() => unfollowThem(dev.login, token)}
          className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit"
        >
          {"Unfollow"}
        </button>
      ) : (
        <button
          onClick={() => followThem(dev.login, token)}
          className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit "
        >
          {"Follow"}
        </button>
      )}
    </div>
  );
};
