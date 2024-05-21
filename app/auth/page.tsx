"use client"
import AuthUser from "@/lib/actions/auth";
import { auth } from "@/lib/firebase";
import { login } from "@/lib/redux/slices/userslice";
import { useDispatch } from "@/lib/redux/store";
import firebase from "firebase/compat/app";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'


export interface userProps{
  uid: string;
  email: string;
  name: string;
  photoURL: string;
}

function AuthPage() {

  const router = useRouter()

  const dispatch = useDispatch()


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signIn = () => auth.signInWithPopup(provider);
const signOut = () => auth.signOut();

useEffect(() => {
  let registerUser = async() =>{
    await firebase.auth().onAuthStateChanged(async (user) => {
     
      if(user == null){
       
        
      }else{

        dispatch(login(({
          uid: user?.uid,
          email: user?.email,
          name: user?.displayName,
          photoURL: user?.photoURL,
        })))

        router.push('/')
      }


    
    });

  

  }

  registerUser()

  return() =>{
    
  }
}, [signIn, dispatch, router ]);

  return (
    <div className='bg-dark-1 min-h-screen w-full flex items-center justify-center'>


    <div className="bg-dark-2 p-5 rounded min-w-[30vw] min-h-[30vh]">

      <div className="flex items-center gap-3">
        <Image
        src={require("./../../public/logo.png")}
        alt='logo'
        width={30}
        height={30}
        className='w-10 h-10 object-contain'
        />

        <h5 className='text-white font-bold text-xl'>YOOM</h5>
      </div>

      <p className='my-5 text-lg text-[#C5D0E6]'>to continue to YOOM</p>

      <div className="flex gap-4">

        <button onClick={signIn} className='flex rounded items-center gap-3 border-0 bg-gray-400 w-full p-2'>
          <Image
          src={require("./../../public/google.png")}
          alt='google icon'
          width={10}
          height={10}
          className='w-10 h-10 object-contain'
          />

          <p className='font-bold text-lg'>SignIn with Google</p>
        </button>

      </div>

    </div>

    </div>
  )
}

export default AuthPage