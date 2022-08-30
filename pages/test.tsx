import React from 'react'
import Link from "next/link";
import { TheIcon } from '../components/Shared/TheIcon';
import { GrHome } from "react-icons/gr";

interface testProps {

}

const Test: React.FC<testProps> = ({}) => {
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
