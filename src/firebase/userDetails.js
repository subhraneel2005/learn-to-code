"use client"

import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "@/firebase/config"


export function userDetails(){
    const [user] = useAuthState(auth)
    console.log(user);
  
    const userEmail = user?.email
  }