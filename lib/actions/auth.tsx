"use server"

import { userProps } from "@/app/auth/page"

const AuthUser = ({uid, name, email, photoURL} : userProps) => {

    console.log(uid);
    console.log(name);
    console.log(email);
    console.log(photoURL);
    
 
}

export default AuthUser