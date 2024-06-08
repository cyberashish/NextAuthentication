"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface dataInterface {
  email:string,
  username:string,
}

const Userpage = () => {
  const[userInfo , setUserInfo] = useState<dataInterface>();
  const router = useRouter();

  const userDetails = async () => {
   const response = await axios.get("/api/users/me");
   setUserInfo(response.data.data[0]);
  }
  const UserLogout = async () => {
      try{
        const response =  await axios.get("/api/users/logout");
        console.log(response.data);
        router.push("/login")
      }
      catch(error:any){
        console.log(error.message)
      }
  } 
  useEffect(()=>{
    userDetails();
  },[])
  useEffect(()=>{
     if(userInfo){
        console.log(userInfo.username)
     }
  },[userInfo])
  return (
    <div>
      <h1 className='text-xl font-semibold text-blue-600 text-center'>Tjis is a profile page</h1>
       <h2 className='text-lg mt-6 text-teal-600 text-center'>{`UserName :- ${userInfo?userInfo.username:"Default User"}`}</h2>
       <h2 className='text-lg mt-1 text-teal-600 text-center'>{`Email :- ${userInfo?userInfo.email:"Default Eamil"}`}</h2>
       <button type="button" onClick={()=>{
        UserLogout();
       }} className="py-3 px-4 block mx-auto items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
 Logout
</button>
    </div>
  )
}

export default Userpage
