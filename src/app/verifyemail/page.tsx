"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Verifyemailpage = () => {
  const [token ,setToken] = useState('');
  const [verified , setVerfied] = useState(false);
  const [error,setError] = useState(false);

  
   const verfiyUserEmail = async () => {
    try{
       if(!error){
        console.log('true dat')
        const response =   await axios.post("/api/users/verifyemail",{'token':token});
        setVerfied(true);
       }
    }catch(error:any){
      setError(true);
      console.log(error)
    }
   }

   useEffect(()=>{
     const urlToken = window.location.search.split("=")[1];
    // const {query} = router;
    console.log(urlToken);
    // const urlToken = query.token;
     setToken(urlToken);
   },[])

   useEffect(()=>{
      if(token.length>0){
        verfiyUserEmail();
      }
   },[token])

  return (
      <>
      <h1 className='text-3xl text-red-500 font-medium text-center'>Verify Email</h1>
       <h2 className='bg-teal-600 p-2 text-white w-fit mx-auto'>{token?`${token}`:"no token"}</h2>
       {verified && (
        <div>
          <h2>Verified</h2>
          <Link href='/login'>Login</Link>
        </div>
       )}
       {error && (
                <div>
                <h2>Error</h2>
              </div>
       )}
      </>
  )
}

export default Verifyemailpage
