import React from 'react'
import { useRouter } from "next/router";
import { useEffect } from 'react';

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = ({}) => {
const router = useRouter();
const { name } = router.query

useEffect(()=>{
    console.log("dynaic route === ",name)
})
return (
 <div>
 this is profile {name}
 </div>
);
}

export default Profile
