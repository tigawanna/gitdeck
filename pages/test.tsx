import React , {useContext} from 'react'
import Link from "next/link";
import { TheIcon } from '../components/Shared/TheIcon';
import { GrHome } from "react-icons/gr";
import { useGQLQuery } from './../utils/queryhooks/gqlquery';
import { GETONEUSER } from '../utils/queries/GQLuserqueries';
import ViewerContext from './../utils/context/ViewerContext';

interface testProps {

}

const Test: React.FC<testProps> = ({}) => {
const viewerCtx = useContext(ViewerContext);
  const query = useGQLQuery(
    ["test repo"],
  viewerCtx?.value?.token as string,
    GETONEUSER,
    {
     login:"tigawanna"
    },
    {}
  );


console.log("one user query ===== ",query.data)

return (
  <div>
    <Link href="/">
      <div>
      <TheIcon Icon={GrHome} size={"34"} color={"green"} />
      </div>
    </Link>

    <Link href="/profile/pozzo">pozzo</Link>
    <TheIcon Icon={GrHome} size={"34"} color={"green"} />


  </div>
);
}

export default Test
