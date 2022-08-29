import React from 'react'
import { GrHome } from "react-icons/gr";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useState } from 'react';
import { Viewer } from './../../utils/types/usertypes';
import Link from "next/link";
import { Consent } from './../modal/Consent';
import { TheIcon } from './../Shared/TheIcon';
import Image from "next/image";
import ALT from '../../public/alt.png'
import { useContext } from 'react';
import GlobalContext from '../../utils/context/GlobalsContext';

interface ToolbarProps {
  user: Viewer | undefined;

}

export const Toolbar: React.FC<ToolbarProps> = ({user}) => {
const [open, setOpen] = useState(false)
const [keyword, setKeyword] = useState({word:''})

const globalCtx = useContext(GlobalContext);
const colorTheme = globalCtx?.value?.theme

const logout=()=>{ 
  globalCtx.updateValue({type:"TOKEN",payload:null})
  globalCtx.updateValue({type:"ERROR",payload:null})
}
const action=()=>{console.log("test query === ",keyword)}

const nextTheme =  colorTheme === 'dark'?'light':'dark'
const mode = colorTheme === "light" ? BsSunFill : BsFillMoonFill;

const toggle = () =>{
globalCtx.updateValue({ type: "THEME", payload: nextTheme });
}
//console.log('user results === ',results)
return (
  <div className="w-[100%] bg-slate-200 dark:bg-slate-700 h-[60px] max-h-[50px] flex-center">
    {open ? (
      <Consent setOpen={setOpen} message={"Sign Out?"} action={logout} />
    ) : null}

    <div className="flex items-center justify-between w-full text-lg font-bold ">
      <div className="w-fit p-1  flex-center bg-white">
        <Link href="/">
          <TheIcon Icon={GrHome} size={"25"} color={""} />
        </Link>
      </div>

      <div className="w-fit p-1  flex-center">
        <TheIcon Icon={mode} size={"25"} color={""} iconAction={toggle} />
      </div>

 

      <div
        onClick={() => setOpen(true)}
        className="h-[40px] w-10 hover:bg-slate-700 m-1"
      >
        <Image
          className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
          src={user?.avatarUrl as string || ALT}
          alt=""
          height={"20px"}
          width={"20px"}
          layout="responsive"
        />
      </div>
    </div>
  </div>
);
}
