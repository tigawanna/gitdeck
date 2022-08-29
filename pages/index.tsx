import type { NextPage } from "next";
import { useContext } from "react";
import { ProfileInfo } from "../components/people/ProfileInfo";
import ViewerContext from "./../utils/context/ViewerContext";
import { Repository } from "../components/repo/Repository";
import { FaSearch , FaTimes} from "react-icons/fa";
import { TheIcon } from '../components/Shared/TheIcon'
const Home: NextPage = (props: any) => {
  const viewerCtx = useContext(ViewerContext);

  // console.log("global ctx   ===  ",viewerCtx)

  return (
    <div className="min-h-screen h-full flex flex-col justify-between">
      <div className="h-[20%]">
        <ProfileInfo
          token={viewerCtx?.value?.token as string}
          user={viewerCtx?.value?.viewer}
        />
      </div>

      <div className="h-[80%]">
            <TheIcon Icon={FaSearch} size={"25"} color={""} />
        <Repository
          token={viewerCtx?.value?.token as string}
          username={viewerCtx?.value?.viewer?.login as string}
        />
      </div>
    </div>
  );
};

export default Home;
