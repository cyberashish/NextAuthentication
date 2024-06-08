"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Loginpage = () => {
  const [user , setUser] = useState({
    email:"",
    password:"",
  })
  const [buttondisabled , setButtonDisabled] = useState(false);
  const [loading , setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try{
      setLoading(true);
    const response =   await axios.post("/api/users/login",user);
    console.log("Logged In",response.data);
    toast.success("User Logged successfully")
    router.push("/profile");
    }catch(error:any){
      console.log("Login Failed");
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user])

  const handleLogin = (e:any) => {
       e.preventDefault();
       if(!buttondisabled){
        console.log('true')
        onLogin();
        setLoading(false);
        setUser({...user,email:"",password:""});
       }
  }

  return (
    <div>
      <div className="container">
        <div className="flex justify-center text-xl mt-4 font-semibold text-red-500">
          <h1>{loading ? "Processing" : "Login Page"}</h1>
        </div>
        <br />
        <div className="flex flex-col gap-3 ">
          <form action="" onSubmit={handleLogin}>
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
              Login
            </button>:
            <button
              type="submit"
              className="py-3 px-4 block mt-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none mx-auto"
            >
              Login
            </button>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginpage
