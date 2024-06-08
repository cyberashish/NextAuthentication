"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState} from 'react'
import toast from 'react-hot-toast';

const Signuppage = () => {
  const [user , setUser] = useState({
    email:"",
    password:"",
    username:""
  })
  const [buttondisabled , setButtonDisabled] = useState(false);
  const [loading , setLoading] = useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try{
      setLoading(true);
    const response =   await axios.post("/api/users/signup",user);
    setLoading(false);
    setUser({...user,email:"",username:"",password:""});
    router.push("/login");
    }catch(error:any){
      console.log("Singp Failed");
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user])

  const handleSingup = (e:any) => {
       e.preventDefault();
       if(!buttondisabled){
        console.log('true')
        onSignup();
       }
  }

  return (
    <div>
      <div className="container">
        <div className="flex justify-center text-xl mt-4 font-semibold text-red-500">
          <h1>{loading ? "Processing" : "Singup Page"}</h1>
        </div>
        <br />
        <div className="flex flex-col gap-3 ">
          <form action="" onSubmit={handleSingup}>
            <div className="form-control flex flex-col gap-1 max-w-lg mx-auto">
              <label htmlFor="username" className="text-gray-500">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                placeholder="Username"
                className="py-2.5 w-full px-4 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 border-2 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
            </div>
            <div className="form-control flex flex-col gap-1 max-w-lg mx-auto">
              <label htmlFor="username" className="text-gray-500">
                Email
              </label>
              <input
                type="email"
                id="username"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                placeholder="Email"
                className="py-2.5 w-full px-4 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 border-2 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
            </div>
            <div className="form-control flex flex-col gap-1 max-w-lg mx-auto">
              <label htmlFor="username" className="text-gray-500">
                Password
              </label>
              <input
                type="password"
                id="username"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                placeholder="Password"
                className="py-2.5 w-full px-4 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 border-2 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
            </div>
            {buttondisabled?
            <button
              type="submit"
              className="py-3 px-4 block mt-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none mx-auto" disabled
            >
              Button
            </button>:
            <button
              type="submit"
              className="py-3 px-4 block mt-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none mx-auto"
            >
              Button
            </button>}
          </form>
          <Link href='/login'><p className='text-yellow-600 font-medium text-lg text-center mt-2'>Visit Login Page</p></Link>
        </div>
      </div>
    </div>
  );
}

export default Signuppage
