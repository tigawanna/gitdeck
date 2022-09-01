import type { NextPage } from "next";
import { useContext , useState } from "react";
import { ProfileInfo } from "../components/people/ProfileInfo";
import ViewerContext from "./../utils/context/ViewerContext";
import { Repository } from "../components/repo/Repository";
import { FaSearch , FaTimes} from "react-icons/fa";
import { TheIcon } from '../components/Shared/TheIcon'

import { TabItem } from './../components/Shared/TabItem';
import { Following } from './../components/people/Following';
import { Followers } from "../components/people/Followers";
const Home: NextPage = (props: any) => {
const viewerCtx = useContext(ViewerContext);

  // console.log("global ctx   ===  ",viewerCtx)
const [currTab,setCurrTab] = useState<string>("repo")
const response = viewerCtx?.value?.viewer

const followingcount = response?.following?.totalCount
const followercount = response?.followers?.totalCount
const repocount = response?.repositories?.totalCount

const tabs =[['repo',repocount],['followers',followercount],['following',followingcount]]
  return (
    <div className="min-h-screen h-full flex flex-col justify-start">
      <div className="h-[20%]">
        <ProfileInfo
          token={viewerCtx?.value?.token as string}
          user={viewerCtx?.value?.viewer}
        />
      </div>

      <div className="min-h-[80%] flex flex-col justify-start">
        <div className="w-full flex items-center justify-evenly flex-wrap sticky top-[90px] z-40">
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
          <Followers
            token={viewerCtx?.value?.token as string}
            user={response}
          />
        ) : null}
        {currTab === "following" ? (
          <Following
            token={viewerCtx?.value?.token as string}
            user={response}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
