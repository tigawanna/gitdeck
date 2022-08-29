import React from 'react'
import Link from "next/link";

interface testProps {

}

const Test: React.FC<testProps> = ({}) => {
return (
 <div>
 <Link href="/">Home </Link>
<Link href="/profile/pozzo">pozzo</Link>
 </div>
);
}

export default Test
